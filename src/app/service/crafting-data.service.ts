import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {items} from '../../assets/data/items';
import {IItem, Item} from '../model/item';
import {ServerItem} from '../model/server-api/server-item';
import {ServerIngredient, ServerOutput, ServerRecipe} from '../model/server-api/server-recipe';
import {IRecipe, Recipe} from '../model/recipe';
import {recipes} from '../../assets/data/recipes';
import {ISkill, Skill} from '../model/skill';
import {skills} from '../../assets/data/skills';
import {CraftingTable, ICraftingTable} from '../model/crafting-table';
import {tables} from '../../assets/data/crafting-tables';
import {Ingredient} from '../model/ingredient';
import {Output} from '../model/output';

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

      let table: CraftingTable | undefined;
      if (this.tables().has(newRecipe.CraftingTable)) {
        table = this.tables().get(newRecipe.CraftingTable);
      }

      if (!table) {
        const iTable: ICraftingTable = {
          name: newRecipe.CraftingTable,
          nameID: newRecipe.CraftingTableNameID!,
          hidden: false,
          upgradeModuleType: newRecipe.CraftingTableCanUseModules ? 'BasicUpgrade' : 'None'
        };
        table = new CraftingTable(iTable);
        this.tables.update(tables => tables.set(newRecipe.CraftingTableNameID!, table!));
      }


      let skill = this.skills().get(newRecipe.SkillNameID!);
      if (!skill) {
        const iSkill: ISkill = {
          name: newRecipe.SkillNeeds[0].Skill,
          nameID: newRecipe.SkillNameID!,
          basicUpgrade: true,
          advancedUpgrade: false,
          modernUpgrade: false,
          lavishWorkspace: true
        };
        skill = new Skill(iSkill);
        this.skills.update(skills => skills.set(skill?.nameID!, skill!));
      }

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
