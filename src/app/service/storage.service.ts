import {Inject, Injectable, signal} from '@angular/core';
import {CalculatorConfig} from '../model/storage-model/calculator-config';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {StoredSkill} from '../model/storage-model/stored-skill';
import {Skill} from '../model/skill';
import {StoredTable} from '../model/storage-model/stored-table';
import {CraftingTable} from '../model/crafting-table';
import {Recipe} from '../model/recipe';
import {StoredRecipe} from '../model/storage-model/stored-recipe';
import {Item} from '../model/item';
import {StoredItem} from '../model/storage-model/stored-item';
import {
  ServerIngredient,
  ServerOutput,
  ServerRecipe,
  ServerSkill,
  ServerTable
} from '../model/server-api/server-recipe';
import {ServerItem} from '../model/server-api/server-item';
import {CUSTOM_SERVERS, PREDEFINED_SERVERS, ServerConfig} from '../model/server-api/server-config';
import {StoredServerConfig} from '../model/storage-model/stored-server-config';

@Injectable({
  providedIn: 'root'
})
class WebStorageService {

  constructor(@Inject(LOCAL_STORAGE) private storageService: StorageService) {
  }

  getCalcConfig(): CalculatorConfig {
    let expensiveEndgame = this.storageService.get('expensiveEndgameCost');
    let multiplier = this.storageService.get('resourceCostMultiplier');
    let laborCost = this.storageService.get('laborCost');
    let profit = this.storageService.get('profitPercent');

    return {
      expensiveEndgameCost: expensiveEndgame === 'true',
      resourceCostMultiplier: multiplier != null ? Number.parseFloat(multiplier) : 1,
      laborCost: laborCost != null ? Number.parseFloat(laborCost) : 0,
      profitPercent: profit != null ? Number.parseFloat(profit) : 0,
      locale: this.storageService.get('locale'),
      skills: this.storageService.get('skills'),
      tables: this.storageService.get('tables'),
      ingredients: this.storageService.get('ingredients'),
      outputs: this.storageService.get('recipes'),
      byproducts: this.storageService.get('byproducts'),
      customSkills: this.storageService.get('customSkills'),
      customTables: this.storageService.get('customTables'),
      customItems: this.storageService.get('customItems'),
      customRecipes: this.storageService.get('customRecipes')
    };
  }

  saveCalcConfig(calcConfig: CalculatorConfig) {
    this.storageService.set('expensiveEndgameCost', '' + calcConfig.expensiveEndgameCost);
    this.storageService.set('resourceCostMultiplier', calcConfig.resourceCostMultiplier);
    this.storageService.set('laborCost', calcConfig.laborCost.toLocaleString(
      'en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2}));
    this.storageService.set('profitPercent', calcConfig.profitPercent.toLocaleString(
      'en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2}));
    this.storageService.set('locale', calcConfig.locale);

    this.storageService.set('skills', calcConfig.skills);
    this.storageService.set('tables', calcConfig.tables);
    this.storageService.set('ingredients', calcConfig.ingredients);
    this.storageService.set('recipes', calcConfig.outputs);
    this.storageService.set('byproducts', calcConfig.byproducts);

    this.storageService.set('customSkills', calcConfig.customSkills);
    this.storageService.set('customTables', calcConfig.customTables);
    this.storageService.set('customItems', calcConfig.customItems);
    this.storageService.set('customRecipes', calcConfig.customRecipes);
  }

  getCraftResourceModifier(): number {
    const multiplier = this.storageService.get('resourceCostMultiplier');
    return multiplier != null ? Number.parseFloat(multiplier) : 1;
  }

  saveCraftResourceModifier(modifier: number) {
    this.storageService.set('resourceCostMultiplier', '' + modifier);
  }

  getExpensiveEndgameRecipes(): boolean {
    return this.storageService.get('expensiveEndgameCost') === 'true';
  }

  saveExpensiveEndgameRecipes(expensiveEndgame: boolean) {
    this.storageService.set('expensiveEndgameCost', '' + expensiveEndgame);
  }

  getSelectedSkills(): StoredSkill[] {
    return this.storageService.get('skills') ?? [];
  }

  saveSelectedSkills(skills: Skill[]) {
    this.storageService.set('skills', skills.map(skill => new StoredSkill(skill)));
  }

  getSelectedTables(): StoredTable[] {
    return this.storageService.get('tables') ?? [];
  }

  saveSelectedTables(tables: CraftingTable[]) {
    this.storageService.set('tables', tables.map(table => new StoredTable(table)));
  }

  getSelectedRecipes(): StoredRecipe[] {
    return this.storageService.get('recipes') ?? [];
  }

  saveSelectedRecipes(recipes: Recipe[]) {
    this.storageService.set('recipes', recipes.map(recipe => new StoredRecipe(recipe)));
  }

  getSelectedItems(): StoredItem[] {
    return this.storageService.get('ingredients') ?? [];
  }

  saveSelectedItems(items: Item[]) {
    this.storageService.set('ingredients', items.map(item => new StoredItem(item)));
  }

  getSelectedByproducts(): StoredItem[] {
    return this.storageService.get('byproducts') ?? [];
  }

  saveSelectedByproducts(items: Item[]) {
    this.storageService.set('byproducts', items.map(item => new StoredItem(item)));
  }

  getPricePerThousandCals(): number {
    const laborCost = this.storageService.get('laborCost');
    return laborCost != null ? Number.parseFloat(laborCost) : 0;
  }

  savePricePerThousandCals(amount: number) {
    this.storageService.set('laborCost', '' + amount);
  }

  getProfitPercent(): number {
    const profitPercent = this.storageService.get('profitPercent');
    return profitPercent != null ? Number.parseFloat(profitPercent) : 0;
  }

  saveProfitPercent(amount: number) {
    this.storageService.set('profitPercent', '' + amount);
  }

  getCustomSkills(): ServerSkill[] {
    return this.storageService.get('customSkills') ?? [];
  }

  saveCustomSkills(serverSkills: ServerSkill[]) {
    this.storageService.set('customSkills', serverSkills.map(skill => {
      return {
        Skill: skill.Skill,
        NameID: skill.NameID,
        Level: skill.Level,
      } as ServerSkill;
    }));
  }

  getCustomTables(): ServerTable[] {
    return this.storageService.get('customTables') ?? [];
  }

  saveCustomTables(serverTables: ServerTable[]) {
    this.storageService.set('customTables', serverTables);
  }

  getCustomItems(): ServerItem[] {
    return this.storageService.get('customItems') ?? [];
  }

  saveCustomItems(serverItems: ServerItem[]) {
    this.storageService.set('customItems', serverItems.map(item => {
      return {
        PropertyInfos: {
          Name: item.PropertyInfos.Name,
          DisplayName: item.PropertyInfos.DisplayName,
          Category: item.PropertyInfos.Category
        },
        Tags: item.Tags
      } as ServerItem;
    }));
  }

  getCustomRecipes(): ServerRecipe[] {
    return this.storageService.get('customRecipes') ?? [];
  }

  saveCustomRecipes(serverRecipes: ServerRecipe[]) {
    this.storageService.set('customRecipes', serverRecipes.map(recipe => {
      return {
        Key: recipe.Key,
        NameID: recipe.NameID,
        BaseLaborCost: recipe.BaseLaborCost,
        SkillLevel: recipe.SkillLevel,
        CraftingTable: recipe.CraftingTable,
        CraftingTableNameID: recipe.CraftingTableNameID,
        SkillNameID: recipe.SkillNameID,
        Ingredients: recipe.Ingredients!.map(ingredient => {
          return {
            NameID: ingredient.NameID,
            Ammount: ingredient.Ammount,
            IsStatic: ingredient.IsStatic
          } as ServerIngredient;
        }),
        Outputs: recipe.Outputs!.map(output => {
          return {
            NameID: output.NameID,
            Ammount: output.Ammount,
            IsStatic: output.IsStatic
          } as ServerOutput;
        })
      } as ServerRecipe;
    }));
  }

  saveSelectedServer(server: ServerConfig) {
    this.storageService.set('selectedServer', new StoredServerConfig(server));
  }

  saveCustomServers(customServers: ServerConfig[]) {
    this.storageService.set('customServers', customServers.map(server => new StoredServerConfig(server)));
  }

  getSelectedServer(): ServerConfig {
    const storedServer = this.storageService.get('selectedServer') as StoredServerConfig;
    if (storedServer) {
      return this.convertStoredServerConfigToServerConfig(storedServer);
    }
    return PREDEFINED_SERVERS.servers()[0];
  }

  getCustomServers(): ServerConfig[] {
    const storedServers = this.storageService.get('customServers') as StoredServerConfig[];
    if (storedServers) {
      return storedServers.map(storedServer => this.convertStoredServerConfigToServerConfig(storedServer));
    }
    return CUSTOM_SERVERS.servers();
  }

  private convertStoredServerConfigToServerConfig(storedServer: StoredServerConfig): ServerConfig {
    return {
      id: storedServer.id,
      name: signal(storedServer.name),
      hostname: signal(storedServer.hostname),
      isCustom: storedServer.isCustom,
      useInsecureHttp: signal(storedServer.useInsecureHttp),
      connectionEstablished: signal(storedServer.connectionEstablished)
    }
  }
}

export default WebStorageService
