import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {items} from '../../assets/data/items';
import {IItem, Item} from '../model/item';
import {ServerItem} from '../model/server-api/server-item';
import {ServerRecipe} from '../model/server-api/server-recipe';
import {IRecipe, Recipe} from '../model/recipe';
import {recipes} from '../../assets/data/recipes';
import {Skill} from '../model/skill';
import {skills} from '../../assets/data/skills';
import {CraftingTable, ICraftingTable} from '../model/crafting-table';
import {tables} from '../../assets/data/crafting-tables';

@Injectable({
  providedIn: 'root'
})
export class CraftingDataService {

  readonly items: WritableSignal<Map<string, Item>> = signal(items);
  readonly recipes: WritableSignal<Map<string, Recipe>> = signal(recipes);
  readonly skills: WritableSignal<Map<string, Skill>> = signal(skills);
  readonly tables: WritableSignal<Map<string, CraftingTable>> = signal(tables);

  readonly recipesArray: Signal<Recipe[]>;

  constructor() {
    this.recipesArray = computed(() => {
      return Array.from(this.recipes().values())
        .sort((a, b) => a.name().localeCompare(b.name()))
    });
  }

  /**
   * Processes new items retrieved from an api call to a server running UCat's Price Calculator.
   * @param newItems the new items to be added
   */
  processNewItems(newItems: ServerItem[]) {
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
  processNewRecipes(newRecipes: ServerRecipe[]) {
    newRecipes.forEach(newRecipe => {

      const serverRecipeNameID = newRecipe.Key.replaceAll(' ', '');
      const serverTableName = newRecipe.CraftingTable;

      const serverTableNameID = this.convertNameToObjectNameID(serverTableName);
      let table: CraftingTable | undefined;
      if (this.tables().has(serverTableNameID)) {
        table = this.tables().get(serverTableNameID);
      }

      if (!table) {
        const iTable: ICraftingTable = {
          name: serverTableName,
          nameID: serverTableNameID,
          hidden: false,
          upgradeModuleType: newRecipe.CraftingTableCanUseModules ? 'BasicUpgrade' : 'None'
        };
        table = new CraftingTable(iTable);
        this.tables.update(tables => tables.set(serverTableNameID, table!));
      }

      const serverSkills = newRecipe.SkillNeeds;
      let skill: Skill | undefined = undefined;
      let level = 1;
      if (serverSkills.length > 0) {
        const serverSkill = serverSkills[0];
        level = serverSkill.Level;
        const skillNameID = this.convertNameToObjectNameID(serverSkill.Skill);
        skill = this.skills().get(skillNameID);
      }

      const iRecipe: IRecipe = {
        name: newRecipe.Key,
        nameID: serverRecipeNameID,
        craftingTable: table,
        skill: skill,
        hidden: false,
        labor: newRecipe.BaseLaborCost,
        level: level,
        ingredients: [],
        outputs: []
      };

      this.recipes.update(recipes => recipes.set(iRecipe.nameID, new Recipe(iRecipe)));
    });
  }

  private convertNameToObjectNameID(name: string): string {
    // This is a bit of a hack, the server names are not the IDs. Since our tables/skills potentially have localized
    // names, we need to remove spaces and append Object to the end (e.g. Blast Furnace vs BlastFurnaceObject)
    return name.replaceAll(' ', '') + 'Object';
  }
}
