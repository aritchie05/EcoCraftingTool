import {Component, ViewChild} from '@angular/core';
import {SkillsComponent} from '../skills/skills.component';
import {IngredientsComponent} from '../ingredients/ingredients.component';
import {OutputsComponent} from '../outputs/outputs.component';
import {CraftingDataService} from '../service/crafting-data.service';
import {Skill} from '../interface/skill';
import {Item} from '../interface/item';
import {Recipe} from '../interface/recipe';
import {CraftingTable} from '../interface/crafting-table';
import {Locale, LocaleService} from '../service/locale.service';
import {CookieService} from 'ngx-cookie-service';
import {SkillCookie} from '../cookie/skill-cookie';
import {TableCookie} from '../cookie/table-cookie';
import {IngredientCookie} from '../cookie/ingredient-cookie';
import {OutputCookie} from '../cookie/output-cookie';

@Component({
  selector: 'app-crafting-parent',
  templateUrl: './crafting-parent.component.html',
  styleUrls: ['./crafting-parent.component.css'],
  providers: [CraftingDataService]
})
export class CraftingParentComponent {

  @ViewChild(SkillsComponent)
  private skillsComponent: SkillsComponent;

  @ViewChild(IngredientsComponent)
  private ingredientsComponent: IngredientsComponent;

  @ViewChild(OutputsComponent)
  private outputsComponent: OutputsComponent;

  constructor(private dataService: CraftingDataService, private localeService: LocaleService, private cookieService: CookieService) {
  }


  onSkillAdded(skill: Skill) {
    let itemIngredients = this.dataService.getUniqueItemIngredientsForSkills(this.skillsComponent.selectedSkills, false);

    //Remove any item ingredients that are no longer relevant
    for (let i = this.ingredientsComponent.itemIngredients.length - 1; i >= 0; i--) {
      let item = this.ingredientsComponent.itemIngredients[i];
      let relevant = false;
      itemIngredients.forEach(newItem => {
        if (item.nameID.localeCompare(newItem.nameID) === 0) {
          relevant = true;
        }
      });
      if (!relevant) {
        this.ingredientsComponent.itemIngredients.splice(i, 1);
      }
    }

    //Add all the new item ingredients associated with the skill
    itemIngredients.forEach(item => {

      let exists = false;
      this.ingredientsComponent.itemIngredients.forEach(ingredient => {
        if (ingredient.nameID.localeCompare(item.nameID) === 0) {
          exists = true;
        }
      });
      if (!exists) {
        this.ingredientsComponent.itemIngredients.push(item);
      }
    });

    //Sort the ingredients array
    this.ingredientsComponent.sortIngredients();

    //Now check new recipes
    let recipes = this.dataService.getRecipesForSkills([skill], false);

    let recipesNotConfirmed = new Array<Recipe>();

    //Initial loop through the recipes to get as many prices as possible
    recipes.forEach(recipe => {
      let price = this.calculatePrice(recipe);
      if (price !== Number.MIN_VALUE) {
        if (this.hasOtherRecipes(recipe)) {
          recipesNotConfirmed.push(recipe);
        } else {
          recipe.price = price;
          this.outputsComponent.outputRecipes.push(recipe);
        }
      } else {
        recipesNotConfirmed.push(recipe);
      }
    });

    //Now loop through the recipes not found to retry them (limit 10 loops)
    for (let i = 0; i < 10 && recipesNotConfirmed.length > 0; i++) {

      for (let i = recipesNotConfirmed.length - 1; i >= 0; i--) {
        let recipe = recipesNotConfirmed[i];
        let price = this.calculatePrice(recipe);
        if (price !== Number.MIN_VALUE) {
          recipe.price = price;
          recipesNotConfirmed.splice(i, 1);
          this.outputsComponent.outputRecipes.push(recipe);
        } else if (i < 10) {
          console.log(`Could not calculate price for recipe ${recipe.name}, will try again on next loop.`);
        } else {
          console.log(`Exhausted retries for price calculation for recipe ${recipe.name}`);
        }
      }

    }

    //Finally sort the recipes array
    this.outputsComponent.sortRecipes();

    //Tell the outputs component to populate the output displays
    this.outputsComponent.convertRecipesToOutputDisplays();

    this.saveDataToCookies();
  }


  onSkillLevelChanged(skill: Skill): void {
    this.recalculateOutputPrices();

    this.saveDataToCookies();
  }

  onLavishUpdated(skill: Skill): void {
    this.recalculateOutputPrices();

    this.saveDataToCookies();
  }

  onUpgradeChanged(table: CraftingTable) {
    this.recalculateOutputPrices();

    this.saveDataToCookies();
  }

  onSkillRemoved(skill: Skill): void {
    //Filter out all recipes that are based on the removed skill
    this.outputsComponent.outputRecipes = this.outputsComponent.outputRecipes.filter(recipe => {
      return recipe.skill.nameID.localeCompare(skill.nameID) !== 0;
    });

    //Remove all item ingredients that are only used for recipes in that skill
    for (let i = this.ingredientsComponent.itemIngredients.length - 1; i >= 0; i--) {
      let ingredient = this.ingredientsComponent.itemIngredients[i];
      let stillNeeded = false;
      this.outputsComponent.outputRecipes.forEach(recipe => {
        if (recipe.ingredients.some(recipeIngredient => recipeIngredient.item.nameID.localeCompare(ingredient.nameID) === 0)) {
          stillNeeded = true;
        }
      });
      if (!stillNeeded) {
        this.ingredientsComponent.itemIngredients.splice(i, 1);
      }
    }

    //Add new item ingredients that may have been covered by recipes from the removed skill
    let newIngredients = this.dataService.getUniqueItemIngredientsForSkills(this.skillsComponent.selectedSkills, false);

    //Filter array to only ingredients that are not already present
    newIngredients = newIngredients.filter(ingredient => {
      this.ingredientsComponent.itemIngredients.some(existingIngredient => {
        return existingIngredient.nameID.localeCompare(ingredient.nameID) === 0;
      });
    });

    //Remove any crafting tables that are no longer needed
    for (let i = this.skillsComponent.craftingTables.length - 1; i >= 0; i--) {
      let table = this.skillsComponent.craftingTables[i];
      let stillNeeded = this.outputsComponent.outputRecipes.some(recipe => {
        return recipe.craftingTable.nameID.localeCompare(table.nameID) === 0;
      });
      if (!stillNeeded) {
        this.skillsComponent.craftingTables.splice(i, 1);
      }
    }

    this.ingredientsComponent.itemIngredients.push(...newIngredients);
    this.ingredientsComponent.sortIngredients();

    this.recalculateOutputPrices();

    this.saveDataToCookies();
  }

  onLaborCostChanged(value: number): void {
    this.recalculateOutputPrices();

    this.saveDataToCookies();
  }

  onIngredientPriceChanged(item: Item): void {
    let affectedRecipes = this.outputsComponent.outputRecipes.filter(recipe => {
      return recipe.ingredients.some(ingredient => {
          return ingredient.item.nameID.localeCompare(item.nameID) === 0;
        }
      );
    });


    this.addDownstreamAffectedRecipes(affectedRecipes);
    affectedRecipes.forEach(recipe => {
      recipe.price = this.calculatePrice(recipe);
      this.outputsComponent.outputRecipes.forEach((recipe2, index) => {
        if (recipe.nameID.localeCompare(recipe2.nameID) === 0) {
          this.outputsComponent.outputRecipes[index] = recipe;
        }
      });
    });

    this.outputsComponent.convertRecipesToOutputDisplays();

    this.saveDataToCookies();
  }

  onRecipeAdded(recipe: Recipe) {
    let hasSkill = this.skillsComponent.selectedSkills.some(skill => this.strMatch(recipe.skill.nameID, skill.nameID));
    if (!hasSkill) {
      recipe.skill.level = 1;
      recipe.skill.lavishChecked = false;
      this.skillsComponent.selectedSkills.push(recipe.skill);
    }

    let hasTable = this.skillsComponent.craftingTables.some(table => this.strMatch(recipe.craftingTable.nameID, table.nameID));
    if (!hasTable) {
      let table = recipe.craftingTable;
      table.availableUpgrades = this.dataService.getUpgradeModulesForTable(table);
      table.selectedUpgrade = table.availableUpgrades.find(upgrade => upgrade.nameID.match('NoUpgrade'));
      this.skillsComponent.craftingTables.push(table);
    }

    recipe.ingredients.forEach(ingredient => {
      let itemExists = this.ingredientsComponent.itemIngredients.some(item => this.strMatch(ingredient.item.nameID, item.nameID));
      if (!itemExists) {
        let item = ingredient.item;
        item.price = 0;
        this.ingredientsComponent.itemIngredients.push(item);
      }
    });

    for (let i = this.ingredientsComponent.itemIngredients.length - 1; i >= 0; i--) {
      let item = this.ingredientsComponent.itemIngredients[i];
      if (this.strMatch(item.nameID, recipe.primaryOutput.item.nameID)) {
        this.ingredientsComponent.itemIngredients.splice(i, 1);
      }
    }

    this.ingredientsComponent.sortIngredients();

    this.recalculateOutputPrices();

    this.saveDataToCookies();
  }

  onSubRecipeRemoved(recipe: Recipe): void {
    //Check the recipe inputs and see if they are still needed for some other output recipe
    recipe.ingredients.forEach(ingredient => {
      let stillNeeded = false;
      for (let i = this.outputsComponent.outputRecipes.length - 1; i >= 0; i--) {
        let recipe = this.outputsComponent.outputRecipes[i];
        recipe.ingredients.forEach(ingredient2 => {
          if (ingredient.item.nameID.localeCompare(ingredient2.item.nameID) === 0) {
            stillNeeded = true;
          }
        });
        if (stillNeeded) {
          break;
        }
      }

      //Ingredient is no longer needed, remove it
      if (!stillNeeded) {
        this.removeItemIngredient(ingredient.item.nameID);
      }
    });

    this.recalculateOutputPrices();

    this.saveDataToCookies();
  }

  onItemRemoved(recipes: Recipe[]): void {
    recipes.forEach(recipe => {
      this.onSubRecipeRemoved(recipe);
    });

    for (let i = this.skillsComponent.craftingTables.length - 1; i >= 0; i--) {
      let table = this.skillsComponent.craftingTables[i];
      if (!this.outputsComponent.outputRecipes.some(recipe => this.strMatch(recipe.craftingTable.nameID, table.nameID))) {
        this.skillsComponent.craftingTables.splice(i, 1);
      }
    }

    for (let i = this.skillsComponent.selectedSkills.length - 1; i >= 0; i--) {
      let skill = this.skillsComponent.selectedSkills[i];
      if (!this.outputsComponent.outputRecipes.some(recipe => this.strMatch(recipe.skill.nameID, skill.nameID))) {
        this.skillsComponent.selectedSkills.splice(i, 1);
      }
    }

    this.saveDataToCookies();
  }

  /**
   * Called when a crafting table is removed by the user.
   * @param table the table that was removed
   */
  onTableRemoved(table: CraftingTable): void {
    //Filter recipes that are not performed on the given crafting table
    this.outputsComponent.outputRecipes = this.outputsComponent.outputRecipes.filter(recipe => {
      return recipe.craftingTable.nameID.localeCompare(table.nameID) !== 0;
    });

    //Remove any item ingredients that are no longer needed
    this.checkIngredientsForRemoval();

    //Remove skills that are no longer relevant
    this.checkSkillsForRemoval();

    this.recalculateOutputPrices();

    this.saveDataToCookies();
  }

  updateLocale(locale: Locale) {
    this.skillsComponent.localize(locale);
    this.ingredientsComponent.localize(locale);
    this.outputsComponent.localize(locale);
    this.dataService.localize(locale);

    this.saveDataToCookies();
  }

  /**
   * Recursively adds recipes that are downstream to the given array of recipes.
   *
   * E.g. Changing iron ore price will affect iron bar price. Iron bar is a downstream recipe because it does not directly
   * take iron ore as an ingredient.
   *
   * @param affectedRecipes the initially affected recipes
   * @private
   */
  private addDownstreamAffectedRecipes(affectedRecipes: Recipe[]): Recipe[] {
    let downstreamRecipes = [];
    affectedRecipes.forEach(recipe => {
      let primaryItemID = recipe.primaryOutput.item.nameID;
      let newRecipes = this.outputsComponent.outputRecipes.filter(outputRecipe => {
        return outputRecipe.ingredients.some(ingredient => ingredient.item.nameID.localeCompare(primaryItemID) === 0);
      });
      downstreamRecipes.push(...newRecipes);
    });
    //Base case
    if (downstreamRecipes.length === 0) {
      return affectedRecipes;
    } else {
      //Recursively call downstream on the new set of recipes
      affectedRecipes.push(...this.addDownstreamAffectedRecipes(downstreamRecipes));
      return affectedRecipes;
    }
  }

  /**
   * Calculates the price of a recipe and returns it, or Number.MIN_VALUE if the price cannot be calculated because some inputs
   * are outputs of other recipes yet to be calculated.
   * @param recipe the recipe for which the price will be calculated
   * @private
   */
  private calculatePrice(recipe: Recipe): number {
    //Get the ingredient prices on the recipe
    let price = 0;

    recipe.ingredients.forEach(ingredient => {
      let found = false;
      this.ingredientsComponent.itemIngredients.forEach(item => {
        if (!found && ingredient.item.nameID.localeCompare(item.nameID) === 0) {
          ingredient.price = item.price;
          found = true;
        }
      });
      if (!found) {
        this.outputsComponent.outputRecipes.forEach(recipe => {
          let output = recipe.primaryOutput;
          if (ingredient.item.nameID.localeCompare(output.item.nameID) === 0) {
            if (!found) {
              ingredient.price = recipe.price;
            } else if (ingredient.price > recipe.price) {
              ingredient.price = recipe.price;
            }
            found = true;
          }
        });
      }
      if (!found) {
        price = Number.MIN_VALUE;
      }
    });


    if (price === 0) {
      //Add the price of each ingredient
      let table = this.skillsComponent.craftingTables.find(table =>
        table.nameID.localeCompare(recipe.craftingTable.nameID) === 0);
      let skill = this.skillsComponent.selectedSkills.find(skill =>
        skill.nameID.localeCompare(recipe.skill.nameID) === 0);
      recipe.ingredients.forEach(ingredient => {
        if (ingredient.reducible) {
          if (skill.lavishWorkspace && skill.lavishChecked) {
            price += (ingredient.price * ingredient.quantity * .95 * table.selectedUpgrade.modifier);
          } else {
            price += (ingredient.price * ingredient.quantity * table.selectedUpgrade.modifier);
          }
        } else {
          price += (ingredient.price * ingredient.quantity);
        }
      });

      //Special case for oil drilling where barrels are secondary output, reducing cost of epoxy, plastic, rubber, & nylon
      if (recipe.primaryOutput.item.nameID.localeCompare('BarrelItem') !== 0 &&
        recipe.outputs.some(output => output.item.nameID.localeCompare('BarrelItem') === 0) &&
        this.outputsComponent.outputRecipes.some(recipe => recipe.nameID.localeCompare('Barrel') === 0)) {
        let barrelPrice = this.outputsComponent.outputRecipes.find(recipe => recipe.nameID.localeCompare('Barrel') === 0).price;
        let barrelQuantity = recipe.outputs.find(output => output.item.nameID.localeCompare('BarrelItem') === 0).quantity;
        let barrelSavings = barrelPrice * barrelQuantity * table.selectedUpgrade.modifier;
        if (skill.lavishWorkspace && skill.lavishChecked) {
          barrelSavings *= .95;
        }
        price -= barrelSavings;
      }

      //Add the labor cost
      let laborSkill = this.skillsComponent.selectedSkills.find(skill => {
        return skill.nameID.localeCompare(recipe.skill.nameID) === 0;
      });
      let reductionModifier = this.dataService.getLaborReductionForSkillLevel(laborSkill.level);
      let calories = recipe.labor * reductionModifier;
      price += ((this.ingredientsComponent.laborCost / 1000) * calories);

      price /= recipe.primaryOutput.quantity;
    }

    return price;
  }

  private hasOtherRecipes(recipe: Recipe): boolean {
    return this.dataService.getRecipesForSkills(this.skillsComponent.selectedSkills, false)
      .some(otherRecipe => {
        return recipe.nameID.localeCompare(otherRecipe.nameID) !== 0 &&
          otherRecipe.primaryOutput.item.nameID.localeCompare(recipe.primaryOutput.item.nameID) === 0;
      });
  }

  /**
   * Removes an item ingredient from the ingredients component.
   * @param nameID the nameID of the item to be removed
   * @private
   */
  private removeItemIngredient(nameID: string): void {
    for (let i = this.ingredientsComponent.itemIngredients.length - 1; i >= 0; i--) {
      let item = this.ingredientsComponent.itemIngredients[i];
      if (item.nameID.localeCompare(nameID) === 0) {
        this.ingredientsComponent.itemIngredients.splice(i, 1);
      }
    }
  }

  /**
   * Recalculates all output recipe prices and converts for display.
   * @private
   */
  private recalculateOutputPrices(): void {
    for (let i = 0; i < 10; i++) {
      this.outputsComponent.outputRecipes.forEach(recipe => {
        recipe.price = this.calculatePrice(recipe);
      });
    }

    this.outputsComponent.convertRecipesToOutputDisplays();
  }

  /**
   * Removes skills that no longer have any valid recipes in the outputs component.
   * @private
   */
  private checkSkillsForRemoval(): void {
    this.skillsComponent.selectedSkills = this.skillsComponent.selectedSkills
      .filter(skill => {
        return this.outputsComponent.outputRecipes.some(recipe => recipe.skill.nameID.localeCompare(skill.nameID) === 0);
      });
  }

  private saveDataToCookies(): void {
    let expDays = 60;

    this.cookieService.set('locale', JSON.stringify(this.localeService.selectedLocale), expDays);
    this.cookieService.set('laborCost', this.ingredientsComponent.laborCost.toLocaleString(this.localeService.selectedLocale.code,
      {minimumFractionDigits: 0, maximumFractionDigits: 2}), expDays);

    let skillsCookie: SkillCookie[] = [];
    this.skillsComponent.selectedSkills.forEach(skill => skillsCookie.push(new SkillCookie(skill)));
    this.cookieService.set('skills', btoa(JSON.stringify(skillsCookie)), expDays);

    let tablesCookie: TableCookie[] = [];
    this.skillsComponent.craftingTables.forEach(table => tablesCookie.push(new TableCookie(table)));
    this.cookieService.set('tables', btoa(JSON.stringify(tablesCookie)), expDays);

    let ingredientsCookie: IngredientCookie[] = [];
    this.ingredientsComponent.itemIngredients.forEach(item => ingredientsCookie.push(new IngredientCookie(item)));
    this.cookieService.set('ingredients', btoa(JSON.stringify(ingredientsCookie)), expDays);

    let outputsCookie: OutputCookie[] = [];
    this.outputsComponent.outputRecipes.forEach(recipe => outputsCookie.push(new OutputCookie(recipe)));
    this.cookieService.set('recipes', btoa(JSON.stringify(outputsCookie)), expDays);
  }

  /**
   * Removes recipes that are no longer relevant based on the crafting tables and skills in the skills component.
   * @private
   */
  private checkRecipesForRemoval(): void {
    this.outputsComponent.outputRecipes = this.outputsComponent.outputRecipes
      .filter(recipe => {
        return this.skillsComponent.craftingTables.some(table => table.nameID.localeCompare(recipe.nameID));
      })
      .filter(recipe => {
        return this.skillsComponent.selectedSkills.some(skill => this.strMatch(skill.nameID, recipe.skill.nameID));
      });
  }

  /**
   * Removes item ingredients that are no longer relevant based on the recipes in the outputs component.
   * @private
   */
  private checkIngredientsForRemoval(): void {
    for (let i = this.ingredientsComponent.itemIngredients.length - 1; i >= 0; i--) {
      let item = this.ingredientsComponent.itemIngredients[i];
      let stillNeeded = this.outputsComponent.outputRecipes.some(recipe => {
        return recipe.ingredients.some(ingredient => this.strMatch(ingredient.item.nameID, item.nameID));
      });
      if (!stillNeeded) {
        this.ingredientsComponent.itemIngredients.splice(i, 1);
      }
    }
  }

  /**
   * Utility method for matching two strings.
   * @param str1 first string to match
   * @param str2 second string to match
   * @private
   */
  private strMatch(str1: string, str2: string): boolean {
    return str1.localeCompare(str2) === 0;
  }
}
