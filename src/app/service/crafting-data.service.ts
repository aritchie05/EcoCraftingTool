import {Injectable} from '@angular/core';
import {Skill} from '../interface/skill';
import {CraftingData} from '../interface/crafting-data';
import {HttpClient} from '@angular/common/http';
import {UpgradeModule} from '../interface/upgrade-module';
import {CraftingTable} from '../interface/crafting-table';
import {Item} from '../interface/item';
import {Recipe} from '../interface/recipe';
import {Ingredient} from '../interface/ingredient';
import {Output} from '../interface/output';
import {LaborCost} from '../interface/labor-cost';
import {craftingData} from '../../assets/data/crafting-data';

@Injectable({
  providedIn: 'root'
})
export class CraftingDataService {
  //private subjectData = new Subject<CraftingData>();
  //responseStatus = this.subjectData.asObservable();

  constructor(private http: HttpClient) {
    /*
    this.http.get<CraftingData>(environment.craftingDataApi)
      .subscribe(resp => {
        console.log('Got response');
        craftingData = resp;
        this.subjectData.next(resp);
      });
    */
  }

  getCraftingData(): CraftingData {
    return craftingData;
  }

  getCraftingTables(): CraftingTable[] {
    return craftingData.craftingTables;
  }

  getUpgradeModules(): UpgradeModule[] {
    return craftingData.upgradeModules;
  }

  getItems(): Item[] {
    return craftingData.items;
  }

  getRecipes(): Recipe[] {
    return craftingData.recipes;
  }

  getSkills(): Skill[] {
    return craftingData.skills;
  }

  getIngredients(): Ingredient[] {
    return craftingData.ingredients;
  }

  getOutputs(): Output[] {
    return craftingData.outputs;
  }

  getLaborCosts(): LaborCost[] {
    return craftingData.laborCosts;
  }

  filterSkillList(searchQuery: string) {
    return this.getSkills().filter(skill => skill.name.toUpperCase().includes(searchQuery.toUpperCase()));
  }

  getRecipesForSkills(skills: Skill[], includeLvl5Upgrades: boolean): Array<Recipe> {
    let recipes = new Array<Recipe>();

    //Look through each skill and add recipes if skill matches
    skills.forEach(skill => {
      let filteredRecipes = this.getRecipes().filter(recipe =>
        recipe.skill.nameID.toUpperCase().localeCompare(skill.nameID.toUpperCase()) === 0);
      //Remove lvl 5 upgrades if flag is false
      if (!includeLvl5Upgrades) {
        filteredRecipes = filteredRecipes.filter(recipe => {
          let shouldAdd = true;
          recipe.outputs.forEach(output => {
            let searchString = recipe.skill.name.replace(' ', '');
            if (output.item.nameID.toUpperCase().includes(searchString.toUpperCase())) {
              shouldAdd = false;
            }
          });
          return shouldAdd;
        });
      }
      filteredRecipes.forEach(filteredRecipe => recipes.push(filteredRecipe));
    });

    return recipes;
  }

  getUniqueItemIngredientsForSkills(skills: Skill[], includeLvl5Upgrades: boolean): Array<Item> {
    let itemIngredients = new Array<Item>();

    //Get recipes for the selected skills
    let recipes = this.getRecipesForSkills(skills, includeLvl5Upgrades);

    //Add all item ingredients to the set
    recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        if (!this.arrayContains(itemIngredients, ingredient.item)) {
          ingredient.item.price = 0;
          itemIngredients.push(ingredient.item);
        }
      });
    });

    //Remove output items that are ingredients in one of the selected skills
    let removedItems = new Array<Item>();
    recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        recipes.forEach(recipe2 => {
          if (recipe !== recipe2) {
            recipe2.outputs.forEach(output => {
              if (!this.arrayContains(removedItems, output.item) && output.item.nameID === ingredient.item.nameID) {
                console.log(`Removing ingredient ${ingredient.item.name} ${ingredient.item.tag} from recipe ${recipe.name}
                since it is an output of recipe ${recipe2.name} in a valid selected skill.`);
                let index = itemIngredients.findIndex((item) => {
                  return item.nameID.localeCompare(ingredient.item.nameID) === 0;
                });
                itemIngredients.splice(index, 1);
                removedItems.push(ingredient.item);
              }
            });
          }
        });
      });
    });

    return itemIngredients;
  }

  getLaborReductionForSkillLevel(level: number): number {
    let laborCosts = this.getLaborCosts();
    let index = laborCosts.findIndex(laborCost => {
      return laborCost.level === level;
    });
    return laborCosts[index].modifier;
  }

  getCraftingTablesForSkill(skill: Skill): CraftingTable[] {
    return this.getCraftingTables().filter(table => {
      return this.getRecipesForSkills([skill], false).some(recipe => {
        return recipe.craftingTable.nameID.localeCompare(table.nameID) === 0;
      });
    });
  }

  getUpgradeModulesForTable(craftingTable: CraftingTable): UpgradeModule[] {
    return this.getUpgradeModules().filter(upgrade => {
      return upgrade.nameID.localeCompare(craftingTable.upgradeModuleType) === 0;
    });
  }

  private arrayContains(items: Item[], searchItem: Item) {
    return items.some(item => {
      return searchItem.nameID.localeCompare(item.nameID) === 0;
    });
  }
}
