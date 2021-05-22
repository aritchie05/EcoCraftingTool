import {Component, OnInit, ViewChild} from '@angular/core';
import {SkillsComponent} from '../skills/skills.component';
import {IngredientsComponent} from '../ingredients/ingredients.component';
import {OutputsComponent} from '../outputs/outputs.component';
import {CraftingDataService} from '../service/crafting-data.service';
import {Skill} from '../interface/skill';
import {Item} from '../interface/item';
import {Recipe} from '../interface/recipe';
import {CraftingTable} from '../interface/crafting-table';

@Component({
  selector: 'app-crafting-parent',
  templateUrl: './crafting-parent.component.html',
  styleUrls: ['./crafting-parent.component.css'],
  providers: [CraftingDataService]
})
export class CraftingParentComponent implements OnInit {

  @ViewChild(SkillsComponent)
  private skillsComponent: SkillsComponent;

  @ViewChild(IngredientsComponent)
  private ingredientsComponent: IngredientsComponent;

  @ViewChild(OutputsComponent)
  private outputsComponent: OutputsComponent;

  constructor(private dataService: CraftingDataService) {
  }

  ngOnInit(): void {

  }


  onSkillAdded(skill: Skill) {
    let itemIngredients = this.dataService.getUniqueItemIngredientsForSkills(this.skillsComponent.selectedSkills, false);

    //Remove any item ingredients that are no longer relevant
    for (let i = this.ingredientsComponent.itemIngredients.length - 1; i >= 0; i--) {
      let item = this.ingredientsComponent.itemIngredients[i];
      console.log(`Checking item ${item.nameID} from current ingredients list.`);
      let relevant = false;
      itemIngredients.forEach(newItem => {
        if (item.nameID.localeCompare(newItem.nameID) === 0) {
          relevant = true;
        }
      });
      if (!relevant) {
        console.log(`Splicing ${item.name} from the item ingredients array`);
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
        console.log(`Pushing new input ${item.name} to the list`);
        this.ingredientsComponent.itemIngredients.push(item);
      }
    });

    //Sort the ingredients array
    this.ingredientsComponent.sortIngredients();

    //Now check new recipes
    let recipes = this.dataService.getRecipesForSkills([skill], false);
    recipes.forEach(recipe => recipe.primaryOutput = recipe.outputs[0]);

    let recipesNotConfirmed = new Array<Recipe>();

    //Initial loop through the recipes to get as many prices as possible
    recipes.forEach(recipe => {
      let price = this.calculatePrice(recipe);
      if (price !== Number.MIN_VALUE) {
        if (this.hasOtherRecipes(recipe)) {
          console.log(`${recipe.primaryOutput.item.name} has other recipes! Adding to unconfirmed list`);
          recipesNotConfirmed.push(recipe);
        } else {
          recipe.price = price;
          this.outputsComponent.recipes.push(recipe);
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
          console.log(`Confirming price ${price} for ${recipe.primaryOutput.item.name}`);
          recipe.price = price;
          recipesNotConfirmed.splice(i, 1);
          this.outputsComponent.recipes.push(recipe);
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
  }


  onSkillLevelChanged(skill: Skill): void {
    this.recalculateOutputPrices();
  }

  onLavishUpdated(skill: Skill): void {
    this.recalculateOutputPrices();
  }

  onUpgradeChanged(table: CraftingTable) {
    this.recalculateOutputPrices();
  }

  onSkillRemoved(skill: Skill): void {
    //Filter out all recipes that are based on the removed skill
    this.outputsComponent.recipes = this.outputsComponent.recipes.filter(recipe => {
      return recipe.skill.nameID.localeCompare(skill.nameID) !== 0;
    });

    //Remove all item ingredients that are only used for recipes in that skill
    for (let i = this.ingredientsComponent.itemIngredients.length - 1; i >= 0; i--) {
      let ingredient = this.ingredientsComponent.itemIngredients[i];
      let stillNeeded = false;
      this.outputsComponent.recipes.forEach(recipe => {
        if (recipe.ingredients.some(recipeIngredient => recipeIngredient.item.nameID.localeCompare(ingredient.nameID) === 0)) {
          stillNeeded = true;
        }
      });
      if (!stillNeeded) {
        console.log(`${ingredient.name} no longer needed, removing...`);
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
      let stillNeeded = this.outputsComponent.recipes.some(recipe => {
        return recipe.craftingTable.nameID.localeCompare(table.nameID) === 0;
      });
      if (!stillNeeded) {
        this.skillsComponent.craftingTables.splice(i, 1);
      }
    }

    this.ingredientsComponent.itemIngredients.push(...newIngredients);
    this.ingredientsComponent.sortIngredients();

    this.recalculateOutputPrices();
  }

  onLaborCostChanged(value: number): void {
    this.recalculateOutputPrices();
  }

  onIngredientPriceChanged(item: Item): void {
    let affectedRecipes = this.outputsComponent.recipes.filter(recipe => {
      return recipe.ingredients.some(ingredient => {
          return ingredient.item.nameID.localeCompare(item.nameID) === 0;
        }
      );
    });


    this.addDownstreamAffectedRecipes(affectedRecipes);
    affectedRecipes.forEach(recipe => {
      recipe.price = this.calculatePrice(recipe);
      this.outputsComponent.recipes.forEach((recipe2, index) => {
        if (recipe.nameID.localeCompare(recipe2.nameID) === 0) {
          this.outputsComponent.recipes[index] = recipe;
        }
      });
    });

    this.outputsComponent.convertRecipesToOutputDisplays();
  }

  onSubRecipeRemoved(recipe: Recipe): void {
    //Check the recipe inputs and see if they are still needed for some other output recipe
    recipe.ingredients.forEach(ingredient => {
      let stillNeeded = false;
      for (let i = this.outputsComponent.recipes.length - 1; i >= 0; i--) {
        let recipe = this.outputsComponent.recipes[i];
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
  }

  onItemRemoved(itemNameID: string): void {
    //Check the recipe inputs and see if they are still needed for some other item
    let filteredRecipes = this.outputsComponent.recipes.filter(recipe => {
      return recipe.ingredients.some(ingredient => {
        return ingredient.item.nameID.localeCompare(itemNameID) === 0;
      });
    });

    //Item no longer needed as an input, remove it
    if (filteredRecipes.length === 0) {
      this.removeItemIngredient(itemNameID);
    }

    this.recalculateOutputPrices();
  }

  /**
   * Called when a crafting table is removed by the user.
   * @param table the table that was removed
   */
  onTableRemoved(table: CraftingTable): void {
    //Filter recipes that are not performed on the given crafting table
    this.outputsComponent.recipes = this.outputsComponent.recipes.filter(recipe => {
      return recipe.craftingTable.nameID.localeCompare(table.nameID) !== 0;
    });

    //Remove any item ingredients that are no longer needed
    this.checkIngredientsForRemoval();

    //Remove skills that are no longer relevant
    this.checkSkillsForRemoval();

    this.recalculateOutputPrices();
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
      let newRecipes = this.outputsComponent.recipes.filter(outputRecipe => {
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
        this.outputsComponent.recipes.forEach(recipe => {
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
            price += (ingredient.price * (ingredient.quantity * .95) * table.selectedUpgrade.modifier);
          } else {
            price += (ingredient.price * ingredient.quantity * table.selectedUpgrade.modifier);
          }
        } else {
          price += (ingredient.price * ingredient.quantity);
        }
      });

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
      this.outputsComponent.recipes.forEach(recipe => {
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
        return this.outputsComponent.recipes.some(recipe => recipe.skill.nameID.localeCompare(skill.nameID) === 0);
      });
  }

  private checkTablesForRemoval(): void {

  }

  /**
   * Removes recipes that are no longer relevant based on the crafting tables and skills in the skills component.
   * @private
   */
  private checkRecipesForRemoval(): void {
    this.outputsComponent.recipes = this.outputsComponent.recipes
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
      let stillNeeded = this.outputsComponent.recipes.some(recipe => {
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
