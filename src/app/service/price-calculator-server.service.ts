import {effect, Injectable, signal, WritableSignal} from '@angular/core';
import {CUSTOM_SERVERS, ServerConfig, serverGroups} from '../model/server-api/server-config';
import {HttpClient} from '@angular/common/http';
import {ServerItem, ServerItemsResponse} from '../model/server-api/server-item';
import {catchError, forkJoin, map, Observable, of, tap} from 'rxjs';
import {
  ServerIngredient,
  ServerOutput,
  ServerRecipe,
  ServerRecipesResponse,
  ServerSkill,
  ServerTable
} from '../model/server-api/server-recipe';
import {items} from '../../assets/data/items';
import {recipesArray} from '../../assets/data/recipes';
import {environment} from '../../environments/environment';
import {CraftingDataService} from './crafting-data.service';
import {IRecipe} from '../model/recipe';
import {Ingredient} from '../model/ingredient';
import {Output} from '../model/output';
import {skills, skillsArray} from '../../assets/data/skills';
import {tablesArray} from '../../assets/data/crafting-tables';
import WebStorageService from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class PriceCalculatorServerService {
  private readonly selectedServer: WritableSignal<ServerConfig>;

  private readonly baseUrlPath = environment.serverBasePath;
  private readonly itemsPath = environment.serverItemsPath;
  private readonly recipesPath = environment.serverRecipesPath;

  tempNewItems: WritableSignal<ServerItem[]> = signal([]);
  tempNewRecipes: WritableSignal<ServerRecipe[]> = signal([]);
  tempNewTables: WritableSignal<ServerTable[]> = signal([]);
  tempNewSkills: WritableSignal<ServerSkill[]> = signal([]);

  constructor(private http: HttpClient, private craftingDataService: CraftingDataService, private storageService: WebStorageService) {
    this.selectedServer = signal(storageService.getSelectedServer());
    CUSTOM_SERVERS.servers.set(storageService.getCustomServers());

    effect(() => {
      const server = this.selectedServer();
      this.storageService.saveSelectedServer(server);
    });

    effect(() => {
      const customServers = CUSTOM_SERVERS.servers();
      this.storageService.saveCustomServers(customServers);
    });
  }

  getSelectedServer(): ServerConfig {
    return this.selectedServer();
  }

  setSelectedServer(server: ServerConfig): void {
    this.selectedServer.set(server);
  }

  attemptConnection(server: ServerConfig) {
    this.resetParsedData();

    const itemsRequest = this.getAllItems(server.useInsecureHttp(), server.hostname()).pipe(
      tap(response => this.tempNewItems.set(this.parseNewItems(response))),
      map(() => true),
      catchError((error) => {
        console.error('Error connecting to server:', error);
        return of(false);
      })
    );

    const recipesRequest = this.getAllRecipes(server.useInsecureHttp(), server.hostname()).pipe(
      tap(response => this.tempNewRecipes.set(this.parseNewRecipes(response))),
      map(() => true),
      catchError((error) => {
        console.error('Error connecting to server:', error);
        return of(false);
      })
    );

    return forkJoin([itemsRequest, recipesRequest]).pipe(
      tap(([itemsSuccess, recipesSuccess]) => server.connectionEstablished.set(itemsSuccess && recipesSuccess)),
      map(([itemsSuccess, recipesSuccess]) => itemsSuccess && recipesSuccess)
    );
  }

  getSelectedServerSignal(): WritableSignal<ServerConfig> {
    return this.selectedServer;
  }

  getAllItems(useInsecureHttp: boolean, hostname?: string): Observable<ServerItemsResponse> {
    const protocol = useInsecureHttp ? 'http://' : 'https://';
    const host = hostname ? hostname : this.getSelectedServer().hostname();
    const url = protocol + host + this.baseUrlPath + this.itemsPath;
    return this.http.get<ServerItemsResponse>(url);
  }

  getAllRecipes(useInsecureHttp: boolean, hostname?: string): Observable<ServerRecipesResponse> {
    const protocol = useInsecureHttp ? 'http://' : 'https://';
    const host = hostname ? hostname : this.getSelectedServer().hostname();
    const url = protocol + host + this.baseUrlPath + this.recipesPath;
    return this.http.get<ServerRecipesResponse>(url);
  }

  parseNewItems(response: ServerItemsResponse): ServerItem[] {
    const newItems: ServerItem[] = [];

    Object.values(response.AllItems).forEach((item) => {
      const id = item.PropertyInfos.Name.String;
      if (!items.has(id) && !this.isExcludedItem(item)) {
        console.debug(`New item found: ${id}`);
        newItems.push(item);
      }
    });

    return newItems;
  }

  private isExcludedItem(item: ServerItem): boolean {
    return item.PropertyInfos.Category.String === 'Hidden' || skills.has(item.PropertyInfos.Name.String) ||
      item.Tags.includes('Profession');
  }

  parseNewRecipes(response: ServerRecipesResponse): ServerRecipe[] {
    response.Recipes.forEach(recipe => this.processRecipe(recipe));

    return response.Recipes.filter(recipe => {
        const foundRecipe = recipesArray.find(r => r.nameID === recipe.NameID);
        if (!foundRecipe) {
          recipe.IsNew = true;
          return true;
        }
        return this.isUpdatedRecipe(recipe, foundRecipe);
      }
    );
  }

  getServerById(serverId: string): ServerConfig | undefined {
    let server: ServerConfig | undefined;
    for (let group of serverGroups) {
      server = group.servers().find(server => server.id === serverId);
      if (server) {
        break;
      }
    }
    return server;
  }

  private isUpdatedRecipe(newRecipe: ServerRecipe, existingRecipe: IRecipe): boolean {
    let result = false;

    if (newRecipe.BaseLaborCost !== existingRecipe.labor) {
      newRecipe.UpdatedLaborCost = true;
      result = true;
    }

    if (newRecipe.SkillNameID !== existingRecipe.skill?.nameID) {
      newRecipe.UpdatedSkill = true;
      result = true;
    }

    if (newRecipe.SkillLevel !== existingRecipe.level) {
      newRecipe.UpdatedSkillLevel = true;
      result = true;
    }

    if (newRecipe.CraftingTableNameID !== existingRecipe.craftingTable?.nameID) {
      newRecipe.UpdatedCraftingTable = true;
      result = true;
    }

    if (!this.ingredientsMatch(newRecipe.Ingredients, existingRecipe.ingredients)) {
      newRecipe.UpdatedIngredients = true;
      result = true;
    }

    if (!this.outputsMatch(newRecipe.Outputs, existingRecipe.outputs)) {
      newRecipe.UpdatedOutputs = true;
      result = true;
    }

    return result;
  }

  private ingredientsMatch(serverIngredients: ServerIngredient[] | undefined, existingIngredients: Ingredient[]): boolean {
    if (!serverIngredients) {
      return false;
    }

    let result = true;

    for (let serverIngredient of serverIngredients) {
      const match = existingIngredients.find(existingIngredient => serverIngredient.NameID === existingIngredient.item.nameID);
      if (!match) {
        serverIngredient.NewItem = true;
        result = false;
        continue;
      }

      if (match.quantity !== serverIngredient.Ammount) {
        serverIngredient.UpdatedAmount = true;
        result = false;
      }

      if (!match.reducible !== serverIngredient.IsStatic) {
        serverIngredient.UpdatedStatic = true;
        result = false;
      }
    }

    return result;
  }

  private outputsMatch(serverOutputs: ServerOutput[] | undefined, existingOutputs: Output[]): boolean {
    if (!serverOutputs) {
      return false;
    }

    let result = true;

    for (let serverOutput of serverOutputs) {
      const match = existingOutputs.find(existingOutput => serverOutput.NameID === existingOutput.item.nameID);
      if (!match) {
        console.debug(`Output not found: ${serverOutput.NameID}`);
        serverOutput.NewItem = true;
        result = false;
        continue;
      }

      if (serverOutput.IsStatic === undefined) {
        //Special case where static is wrong for Crushed outputs of Ashlar recipes
        if (serverOutputs.some(output => output.Name.startsWith('Ashlar')) && serverOutput.Name.startsWith('Crushed')) {
          serverOutput.IsStatic = false;
        } else {
          serverOutput.IsStatic = true;
        }
      }

      if (match.quantity !== serverOutput.Ammount) {
        console.debug(`Output quantity mismatch: ${serverOutput.NameID} ${match.quantity} ${serverOutput.Ammount}`);
        serverOutput.UpdatedAmount = true;
        result = false;
      }

      if (!match.reducible !== serverOutput.IsStatic) {
        console.debug(`Output reducible mismatch: ${serverOutput.NameID} ${match.reducible} ${serverOutput.IsStatic}`);
        serverOutput.UpdatedStatic = true;
        result = false;
      }
    }

    return result;
  }

  /**
   * Saves the given server configuration along with the parsed new items and recipes to the calculator context.
   * @param serverConfig the server configuration to save
   */
  saveConnection(serverConfig: ServerConfig) {
    this.setSelectedServer(serverConfig);
    this.craftingDataService.processServerSkills(this.tempNewSkills());
    this.craftingDataService.processServerTables(this.tempNewTables());
    this.craftingDataService.processServerItems(this.tempNewItems());
    this.craftingDataService.processServerRecipes(this.tempNewRecipes());

    this.saveCustomDataToStorage();
  }

  private convertNameToObjectNameID(name: string): string {
    return name.replaceAll(' ', '') + 'Object';
  }

  private convertNameToSkillNameID(name: string): string {
    return name.replaceAll(' ', '') + 'Skill';
  }

  resetParsedData() {
    this.tempNewSkills.set([]);
    this.tempNewTables.set([]);
    this.tempNewItems.set([]);
    this.tempNewRecipes.set([]);
  }

  saveCustomDataToStorage() {
    this.storageService.saveCustomSkills(this.tempNewSkills());
    this.storageService.saveCustomTables(this.tempNewTables());
    this.storageService.saveCustomItems(this.tempNewItems());
    this.storageService.saveCustomRecipes(this.tempNewRecipes());
  }

  private processRecipe(recipe: ServerRecipe): void {
    recipe.NameID = recipe.Key.replaceAll(' ', '');
    recipe.CraftingTableNameID = this.convertNameToObjectNameID(recipe.CraftingTable);

    const tableExists = tablesArray.some(t => t.nameID === recipe.CraftingTableNameID) ||
      this.tempNewTables().some(t => t.NameID === recipe.CraftingTableNameID);
    if (!tableExists) {
      const newTable: ServerTable = {
        NameID: recipe.CraftingTableNameID!,
        Name: recipe.CraftingTable,
        CanUseModules: recipe.CraftingTableCanUseModules
      };
      this.tempNewTables.update(tables => [...tables, newTable]);
    }

    if (recipe.SkillNeeds.length > 0) {
      const skill = recipe.SkillNeeds[0];
      recipe.SkillNameID = this.convertNameToSkillNameID(skill.Skill);
      skill.NameID = recipe.SkillNameID;
      recipe.SkillLevel = skill.Level;
      const skillExists = skillsArray.some(s => s.nameID === recipe.SkillNameID) ||
        this.tempNewSkills().some(s => s.NameID === recipe.SkillNameID);
      if (!skillExists) {
        this.tempNewSkills.update(skills => [...skills, skill]);
      }
    } else {
      recipe.SkillNameID = 'SelfImprovementSkill';
      recipe.SkillLevel = 0;
    }

    if (recipe.NumberOfVariants > 0) {
      recipe.Key = recipe.Variants[0].Name;
      recipe.NameID = recipe.Variants[0].Key;
      recipe.Ingredients = recipe.Variants[0].Ingredients;
      recipe.Ingredients.forEach(ingredient => {
        if (ingredient.Tag) {
          ingredient.NameID = ingredient.Tag.replaceAll(' ', '');
        } else {
          ingredient.NameID = this.convertNameToItemNameID(ingredient.Name);
        }
      });

      recipe.Outputs = recipe.Variants[0].Products;
      recipe.Outputs.forEach(output => output.NameID = this.convertNameToItemNameID(output.Name));
    }
  }

  private convertNameToItemNameID(name: string): string {
    // This is a bit of a hack, the server names are not the IDs. Since our items/tables/skills potentially have localized
    // names, we need to remove spaces and append Item to the end (e.g., Steel Bar vs. SteelBarItem)
    let result = name.replaceAll(' ', '');

    //Exception for upgrades BasicUpgrade4 -> BasicUpgradeLvl4
    let upgradeIndex = result.search(/Upgrade(\d)/);
    if (upgradeIndex !== -1) {
      result = result.substring(0, upgradeIndex + 7) + 'Lvl' + result.substring(upgradeIndex + 7);
    }

    //Exception for books, they are not named like other items
    if (!name.endsWith('Skill Book') && !name.endsWith('Skill Scroll')) {
      result += 'Item';
    }

    return result;
  }
}
