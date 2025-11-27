import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {items} from '../../assets/data/items';
import {IItem, Item} from '../model/item';
import {ServerItem} from '../model/server-api/server-item';
import {
  ServerIngredient,
  ServerOutput,
  ServerRecipe,
  ServerSkill,
  ServerTable
} from '../model/server-api/server-recipe';
import {IRecipe, Recipe} from '../model/recipe';
import {recipes} from '../../assets/data/recipes';
import {ISkill, Skill} from '../model/skill';
import {skills} from '../../assets/data/skills';
import {CraftingTable, ICraftingTable} from '../model/crafting-table';
import {tables} from '../../assets/data/crafting-tables';
import {Ingredient} from '../model/ingredient';
import {Output} from '../model/output';
import WebStorageService from './storage.service';
import {StoredSkill} from '../model/storage-model/stored-skill';
import {StoredTable} from '../model/storage-model/stored-table';
import {upgradeModules} from '../../assets/data/upgrade-modules';
import {StoredRecipe} from '../model/storage-model/stored-recipe';
import {StoredItem} from '../model/storage-model/stored-item';

@Injectable({
  providedIn: 'root'
})
export class CraftingDataService {

  readonly items: WritableSignal<Map<string, Item>> = signal(items);
  readonly recipes: WritableSignal<Map<string, Recipe>> = signal(recipes);
  readonly skills: WritableSignal<Map<string, Skill>> = signal(skills);
  readonly tables: WritableSignal<Map<string, CraftingTable>> = signal(tables);

  readonly recipesArray: Signal<Recipe[]>;

  constructor(private storageService: WebStorageService) {
    const customSkills = this.storageService.getCustomSkills();
    const customTables = this.storageService.getCustomTables();
    const customItems = this.storageService.getCustomItems();
    const customRecipes = this.storageService.getCustomRecipes();

    this.processServerSkills(customSkills);
    this.processServerTables(customTables);
    this.processServerItems(customItems);
    this.processServerRecipes(customRecipes);

    this.recipesArray = computed(() => {
      return Array.from(this.recipes().values())
        .sort((a, b) => a.name().localeCompare(b.name()))
    });
  }

  getSelectedSkills(): Skill[] {
    const storedSkills = this.storageService.getSelectedSkills();
    if (storedSkills) {
      return storedSkills.map((storedSkill: StoredSkill) => {
        let skill = this.skills().get(storedSkill.id) as Skill;
        skill?.level.set(storedSkill.lvl);
        skill?.lavishChecked.set(storedSkill.lav);
        return skill;
      }).filter((skill: Skill) => skill != undefined);
    }
    return [];
  }

  getSelectedTables(): CraftingTable[] {
    const storedTables = this.storageService.getSelectedTables();
    if (storedTables) {
      return storedTables.map((storedTable: StoredTable) => {
        let table = this.tables().get(storedTable.id) as CraftingTable;
        let upgrade = upgradeModules.get(storedTable.up);
        table?.selectedUpgrade.set(upgrade!);
        return table;
      }).filter((table: CraftingTable) => table != undefined);
    }
    return [];
  }

  getSelectedRecipes(): Recipe[] {
    const storedRecipes = this.storageService.getSelectedRecipes();
    if (storedRecipes) {
      return storedRecipes.map((storedRecipe: StoredRecipe) => {
        let recipe = this.recipes().get(storedRecipe.id) as Recipe;
        recipe?.basePrice.set(Number.parseFloat(storedRecipe.bp));
        recipe?.price.set(Number.parseFloat(storedRecipe.pr));
        if (storedRecipe.po) {
          recipe?.profitOverride.set(Number.parseFloat(storedRecipe.po));
        }
        return recipe;
      }).filter((recipe: Recipe) => recipe != undefined && !recipe.hidden);
    }
    return [];
  }

  getSelectedItems(): Item[] {
    const storedItems = this.storageService.getSelectedItems();
    if (storedItems) {
      return storedItems.map((storedItem: StoredItem) => {
        let item = this.items().get(storedItem.id) as Item;
        item?.price.set(Number.parseFloat(storedItem.pr));
        item?.touched.set(storedItem.t ?? false);
        return item;
      }).filter((item: Item) => item != undefined);
    }
    return [];
  }

  getSelectedByproducts(): Item[] {
    const storedItems = this.storageService.getSelectedByproducts();
    if (storedItems) {
      return storedItems.map((storedItem: StoredItem) => {
        let item = this.items().get(storedItem.id) as Item;
        item?.price.set(Number.parseFloat(storedItem.pr));
        return item;
      }).filter((item: Item) => item != undefined);
    }
    return [];
  }

  processServerSkills(serverSkills: ServerSkill[]) {
    serverSkills.forEach(skill => {
      const iSkill: ISkill = {
        name: skill.Skill,
        nameID: skill.NameID!,
        level: 0,
        lavishWorkspace: true,
        basicUpgrade: true,
        advancedUpgrade: false,
        modernUpgrade: false
      };

      this.skills.update(skills => skills.set(skill.NameID!, new Skill(iSkill)));
    })
  }

  processServerTables(serverTables: ServerTable[]) {

    this.tables.update(tables => {
      const newTables = new Map(tables);
      serverTables.forEach(table => {
        const iTable: ICraftingTable = {
          name: table.Name,
          nameID: table.NameID,
          upgradeModuleType: table.CanUseModules ? 'BasicUpgrade' : 'None',
          hidden: false
        };
        newTables.set(table.NameID!, new CraftingTable(iTable));
      });
      return newTables;
    })
  }

  /**
   * Processes new items retrieved from an api call to a server running UCat's Price Calculator.
   * @param newItems the new and modified items to be added
   */
  processServerItems(newItems: ServerItem[]) {
    newItems.forEach(newItem => {
      const iItem: IItem = {
        name: newItem.PropertyInfos.DisplayName.LocString,
        nameID: newItem.PropertyInfos.Name.String,
        tag: false
      };

      this.items.update(items => items.set(iItem.nameID, new Item(iItem)));
    });
  }

  /**
   * Processes new recipes, crafting tables, and skills retrieved from an api call to a server running UCat's Price
   * Calculator.
   * @param newRecipes the new recipes to be added
   */
  processServerRecipes(newRecipes: ServerRecipe[]) {
    newRecipes.forEach(newRecipe => {

      let table: CraftingTable | undefined;
      if (this.tables().has(newRecipe.CraftingTableNameID!)) {
        table = this.tables().get(newRecipe.CraftingTableNameID!);
      }

      let skill = this.skills().get(newRecipe.SkillNameID!);
      const iRecipe: IRecipe = {
        name: newRecipe.Key,
        nameID: newRecipe.NameID!,
        craftingTable: table,
        skill: skill,
        hidden: false,
        labor: newRecipe.BaseLaborCost,
        level: newRecipe.SkillLevel!,
        ingredients: this.createIngredients(newRecipe.Ingredients),
        outputs: this.createOutputs(newRecipe.Outputs)
      };

      this.recipes.update(recipes => recipes.set(iRecipe.nameID, new Recipe(iRecipe)));
    });
  }

  private createIngredients(ingredients: ServerIngredient[] | undefined): Ingredient[] {
    const result: Ingredient[] = [];
    if (!ingredients) {
      return result;
    }

    for (let ing of ingredients) {
      const iIngredient: Ingredient = {
        quantity: ing.Ammount,
        reducible: !ing.IsStatic,
        item: this.items().get(ing.NameID!)!
      };
      result.push(iIngredient);
    }

    return result;
  }

  private createOutputs(outputs: ServerOutput[] | undefined): Output[] {
    const result: Output[] = [];
    if (!outputs) {
      return result;
    }

    for (let i = 0; i < outputs.length; i++) {
      const out = outputs[i];
      const iOutput: Output = {
        quantity: out.Ammount,
        reducible: !out.IsStatic,
        item: this.items().get(out.NameID!)!,
        primary: i === 0
      };
      result.push(iOutput);
    }

    return result;
  }

}
