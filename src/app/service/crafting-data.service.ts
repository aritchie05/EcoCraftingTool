import {Inject, Injectable} from '@angular/core';
import {Skill} from '../interface/skill';
import {UpgradeModule} from '../interface/upgrade-module';
import {CraftingTable} from '../interface/crafting-table';
import {Item} from '../interface/item';
import {Recipe} from '../interface/recipe';
import {LaborCost} from '../interface/labor-cost';
import {Locale, LocaleService} from './locale.service';
import {craftingTables} from '../../assets/data/crafting-tables';
import {upgradeModules} from '../../assets/data/upgrade-modules';
import {items} from '../../assets/data/items';
import {standardRecipes} from '../../assets/data/recipes';
import {skills} from '../../assets/data/skills';
import {laborCosts} from '../../assets/data/labor-costs';
import {whiteTigerRecipes} from '../../assets/data/white-tiger/white-tiger-recipes';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class CraftingDataService {
  //private subjectData = new Subject<CraftingData>();
  //responseStatus = this.subjectData.asObservable();

  expensiveRecipeNameIDs = ['ComputerLabExpensive', 'LaserExpensive'];
  cheapRecipeNameIDs = ['ComputerLab', 'Laser'];

  expensiveRecipes: Recipe[];
  cheapRecipes: Recipe[];

  locale: Locale;

  skills: Skill[];
  recipes: Recipe[];
  items: Item[];
  tables: CraftingTable[];
  upgrades: UpgradeModule[];

  constructor(private localeService: LocaleService, @Inject(LOCAL_STORAGE) private storageService: StorageService) {
    this.locale = localeService.selectedLocale;

    this.skills = skills.sort((a, b) => a.name.localeCompare(b.name, this.locale.code));
    this.recipes = [...standardRecipes.sort((a, b) => a.name.localeCompare(b.name, this.locale.code))];
    this.items = items.sort((a, b) => a.name.localeCompare(b.name, this.locale.code));
    this.tables = craftingTables.sort((a, b) => a.name.localeCompare(b.name, this.locale.code));
    this.upgrades = upgradeModules.sort((a, b) => a.name.localeCompare(b.name, this.locale.code));

    let whiteTigerRecipes = this.storageService.get('whiteTigerRecipes');
    if (whiteTigerRecipes != null) {
      let wt: boolean = false;
      if (whiteTigerRecipes.localeCompare('true') === 0) {
        wt = true;
      }
      this.setWhiteTigerRecipesEnabled(wt);
    }

    this.setIngredientPricesAndPrimaryOutputs();
    this.setSkillLevelAndLavish();

    this.expensiveRecipes = this.recipes.filter(recipe =>
      this.expensiveRecipeNameIDs.some(recipeNameID => recipeNameID.localeCompare(recipe.nameID) === 0))
      .sort((a, b) => a.nameID.localeCompare(b.nameID));
    this.cheapRecipes = this.recipes.filter(recipe =>
      this.cheapRecipeNameIDs.some(recipeNameID => recipeNameID.localeCompare(recipe.nameID) === 0))
      .sort((a, b) => a.nameID.localeCompare(b.nameID));

    if (!this.locale.langCode().match('en')) {
      this.localize(this.locale);
    }

    /*
    this.http.get<CraftingData>(environment.craftingDataApi)
      .subscribe(resp => {
        craftingData = resp;
        this.subjectData.next(resp);
      });
    */
  }

  filterTableList(searchQuery: string) {
    return this.getCraftingTables().filter(table => table.name.toUpperCase().includes(searchQuery.toUpperCase()));
  }

  getRecipesForTable(table: CraftingTable, includeLvl5Upgrades: boolean): Recipe[] {
    let recipes = this.getRecipes().filter(rec => rec.craftingTable.nameID.localeCompare(table.nameID) === 0);

    if (!includeLvl5Upgrades) {
      recipes = recipes.filter(recipe => {
        let shouldAdd = true;
        let searchString = recipe.skill.nameID.replace('Skill', '');
        if (recipe.primaryOutput.item.nameID.toUpperCase().includes(searchString.toUpperCase())) {
          shouldAdd = false;
        }
        return shouldAdd;
      });
    }

    return recipes;
  }

  getRecipesForTableAndSkills(table: CraftingTable, skills: Skill[]): Recipe[] {
    let recipes = this.getRecipesForTable(table, false);
    return recipes.filter(recipe => skills.some(skill => skill.nameID.localeCompare(recipe.skill.nameID) === 0));
  }

  getCraftingTables(): CraftingTable[] {
    return this.tables;
  }

  getUpgradeModules(): UpgradeModule[] {
    return this.upgrades;
  }

  getItems(): Item[] {
    return this.items;
  }

  getRecipes(): Recipe[] {
    return this.recipes.filter(recipe => !recipe.hidden);
  }

  getSkills(): Skill[] {
    return this.skills;
  }

  getLaborCosts(): LaborCost[] {
    return laborCosts;
  }

  filterSkillList(searchQuery: string) {
    return this.getSkills().filter(skill => skill.name.toUpperCase().includes(searchQuery.toUpperCase()));
  }

  filterRecipeList(searchQuery: string) {
    return this.getRecipes().filter(recipe => recipe.name.toUpperCase().includes(searchQuery.toUpperCase()) && !recipe.hidden);
  }

  getSkillsForCraftingTable(table: CraftingTable): Skill[] {
    let newRecipes = this.getRecipesForTable(table, false);
    let skills: Skill[] = [];
    newRecipes.forEach(recipe => {
      if (!skills.some(skill => skill.nameID.localeCompare(recipe.skill.nameID) === 0)) {
        skills.push(this.getSkills().find(skill => skill.nameID.localeCompare(recipe.skill.nameID) === 0));
      }
    });

    return skills;
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
            let searchString = recipe.skill.nameID.replace('Skill', '');
            if (output.item.nameID.toUpperCase().includes(searchString.toUpperCase()) && output.item.nameID.includes('Upgrade')) {
              shouldAdd = false;
            }
          });
          return shouldAdd;
        });
      }
      filteredRecipes.forEach(filteredRecipe => {
        if (!filteredRecipe.hidden) {
          recipes.push(filteredRecipe);
        }
      });
    });

    return recipes;
  }

  getRecipeById(recipeNameID: string): Recipe {
    let recipe = this.getRecipes().find(recipe => recipe.nameID.localeCompare(recipeNameID) === 0);
    return recipe;
  }

  getUniqueItemIngredientsForSkills(skills: Skill[], includeLvl5Upgrades: boolean): Item[] {
    let recipes = this.getRecipesForSkills(skills, includeLvl5Upgrades);
    return this.getUniqueItemIngredientsForRecipes(recipes);
  }

  private setIngredientPricesAndPrimaryOutputs() {
    this.recipes.forEach(recipe => {
      this.setIngredientPricesandPrimaryOutput(recipe);
    });
  }

  private setIngredientPricesandPrimaryOutput(recipe: Recipe): void {
    if (recipe.price === undefined) {
      recipe.price = 0;
    }
    if (recipe.basePrice === undefined) {
      recipe.basePrice = 0;
    }
    for (let i = 0; i < recipe.ingredients.length; i++) {
      if (recipe.ingredients[i].price === undefined) {
        recipe.ingredients[i].price = 0;
      }
    }
    for (let i = 0; i < recipe.outputs.length; i++) {
      if (recipe.outputs[i].primary) {
        recipe.primaryOutput = recipe.outputs[i];
        break;
      }
    }
  }

  getUniqueItemIngredientsForRecipes(recipes: Recipe[]): Item[] {
    let itemIngredients: Item[] = [];

    //Add all item ingredients to the set
    recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        if (!this.arrayContains(itemIngredients, ingredient.item)) {
          if (ingredient.item.price === undefined) {
            ingredient.item.price = 0;
          }
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
            if (!this.arrayContains(removedItems, recipe2.primaryOutput.item) && recipe2.primaryOutput.item.nameID === ingredient.item.nameID) {
              let index = itemIngredients.findIndex((item) => {
                return item.nameID.localeCompare(ingredient.item.nameID) === 0;
              });
              itemIngredients.splice(index, 1);
              removedItems.push(ingredient.item);
            }
          }
        });
      });
    });

    return itemIngredients;
  }

  getLaborReductionForSkillLevel(level: number): number {
    let laborCosts = this.getLaborCosts();
    return laborCosts.find(laborCost => laborCost.level === level).modifier;
  }

  getCraftingTablesForSkill(skill: Skill): CraftingTable[] {
    return this.getCraftingTables().filter(table => {
      return this.getRecipesForSkills([skill], false).some(recipe => {
        return recipe.craftingTable.nameID.localeCompare(table.nameID) === 0;
      });
    });
  }

  private setSkillLevelAndLavish() {
    this.skills.forEach(skill => {
      if (skill.level == undefined) {
        skill.level = 1;
      }
      skill.lavishChecked = false;
    });
  }

  getUpgradeModulesForTable(craftingTable: CraftingTable): UpgradeModule[] {
    return this.getUpgradeModules().filter(upgrade => {
      return upgrade.typeNameID.localeCompare(craftingTable.upgradeModuleType) === 0;
    });
  }

  localize(locale: Locale): void {
    this.tables.forEach(table => table.name = this.localeService.localizeCraftingTableName(table.nameID, locale.langCode()));
    this.upgrades.forEach(upgrade => upgrade.name = this.localeService.localizeUpgradeName(upgrade.nameID, locale.langCode()));
    this.items.forEach(item => item.name = this.localeService.localizeItemName(item.nameID, locale.langCode()));
    this.recipes.forEach(recipe => {
      recipe.name = this.localeService.localizeRecipeName(recipe.nameID, locale.langCode());
      recipe.ingredients.forEach(input => input.item.name = this.localeService.localizeItemName(input.item.nameID, locale.langCode()));
      recipe.outputs.forEach(output => output.item.name = this.localeService.localizeItemName(output.item.nameID, locale.langCode()));
      recipe.craftingTable.name = this.localeService.localizeCraftingTableName(recipe.craftingTable.nameID, locale.langCode());
      recipe.skill.name = this.localeService.localizeSkillName(recipe.skill.nameID, locale.langCode());
    });
    this.skills.forEach(skill => skill.name = this.localeService.localizeSkillName(skill.nameID, locale.langCode()));
  }

  setExpensiveEndgameCost(isExpensive: boolean): void {
    if (isExpensive) {
      this.expensiveRecipes.forEach(recipe => recipe.hidden = false);
      this.cheapRecipes.forEach(recipe => recipe.hidden = true);
    } else {
      this.expensiveRecipes.forEach(recipe => recipe.hidden = true);
      this.cheapRecipes.forEach(recipe => recipe.hidden = false);
    }
  }

  setWhiteTigerRecipesEnabled(isEnabled: boolean): void {
    whiteTigerRecipes.forEach(wtRecipe => {
      let recipeToReplace = this.recipes.find(r => r.nameID.localeCompare(wtRecipe.nameID) === 0);
      if (isNotNullOrUndefined(recipeToReplace)) {
        let index = this.recipes.findIndex(r => r === recipeToReplace);
        if (isEnabled) {
          this.setIngredientPricesandPrimaryOutput(wtRecipe);
          this.recipes[index] = wtRecipe;
        } else {
          let oldRecipe = standardRecipes.find(r => r.nameID.localeCompare(wtRecipe.nameID) === 0);
          if (isNotNullOrUndefined(oldRecipe)) {
            this.setIngredientPricesandPrimaryOutput(oldRecipe);
            this.recipes[index] = oldRecipe;
          } else {
            this.recipes.splice(index, 1);
          }
        }
      } else {
        if (isEnabled) {
          this.recipes.push(wtRecipe);
        }
      }
    });
  }

  private arrayContains(items: Item[], searchItem: Item) {
    return items.some(item => {
      return searchItem.nameID.localeCompare(item.nameID) === 0;
    });
  }
}
