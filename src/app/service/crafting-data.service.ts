import {Injectable} from '@angular/core';
import {Skill} from '../interface/skill';
import {CraftingData} from '../interface/crafting-data';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';
import {UpgradeModule} from '../interface/upgrade-module';
import {CraftingTable} from '../interface/crafting-table';
import {Item} from '../interface/item';
import {Recipe} from '../interface/recipe';
import {Ingredient} from '../interface/ingredient';
import {Output} from '../interface/output';

@Injectable({
  providedIn: 'root'
})
export class CraftingDataService {
  craftingData: CraftingData;
  private subjectData = new Subject<CraftingData>();
  responseStatus = this.subjectData.asObservable();

  constructor(private http: HttpClient) {
    this.http.get<CraftingData>(environment.craftingDataApi)
      .subscribe(resp => {
        console.log('Got response');
        this.craftingData = resp;
        this.subjectData.next(resp);
      });
  }

  getCraftingData(): CraftingData {
    return this.craftingData;
  }

  getCraftingTables(): CraftingTable[] {
    return this.craftingData.craftingTables;
  }

  getUpgradeModules(): UpgradeModule[] {
    return this.craftingData.upgradeModules;
  }

  getItems(): Item[] {
    return this.craftingData.items;
  }

  getRecipes(): Recipe[] {
    return this.craftingData.recipes;
  }

  getSkills(): Skill[] {
    return this.craftingData.skills;
  }

  getIngredients(): Ingredient[] {
    return this.craftingData.ingredients;
  }

  getOutputs(): Output[] {
    return this.craftingData.outputs;
  }

  filterSkillList(searchQuery: string) {
    return this.getSkills().filter(skill => skill.name.toUpperCase().includes(searchQuery.toUpperCase()));
  }

  getRecipesForSkills(skills: Skill[], includeLvl5Upgrades: boolean): Set<Recipe> {
    console.log(`Getting recipes for skills`);
    let recipes = new Set<Recipe>();

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
      filteredRecipes.forEach(filteredRecipe => recipes.add(filteredRecipe));
    });

    return recipes;
  }

  getUniqueItemIngredientsForSkills(skills: Skill[], includeLvl5Upgrades: boolean): Set<Item> {
    console.log(`Getting unique ingredients for skills`);
    let itemIngredients = new Set<Item>();

    //Get recipes for the selected skills
    let recipes = this.getRecipesForSkills(skills, includeLvl5Upgrades);

    //Add all item ingredients to the set
    recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        itemIngredients.add(ingredient.item);
      });
    });

    //Remove output items that are ingredients in one of the selected skills
    let removedItems = new Set<Item>();
    recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        recipes.forEach(recipe2 => {
          if (recipe !== recipe2) {
            recipe2.outputs.forEach(output => {
              if (!removedItems.has(output.item) && output.item.nameID === ingredient.item.nameID) {
                console.log(`Removing ingredient ${ingredient.item.name} from recipe ${recipe.name}
                since it is an output of recipe ${recipe2.name} in a valid selected skill.`);
                itemIngredients.delete(ingredient.item);
                removedItems.add(ingredient.item);
              }
            });
          }
        });
      });
    });

    return itemIngredients;
  }
}
