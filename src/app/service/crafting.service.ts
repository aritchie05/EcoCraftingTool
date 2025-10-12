import {computed, effect, Injectable, linkedSignal, signal, Signal, WritableSignal} from '@angular/core';
import {Skill} from '../model/skill';
import {CraftingTable} from '../model/crafting-table';
import {WebStorageService} from './storage.service';
import {UpgradeModule} from '../model/upgrade-module';
import {recipes} from '../../assets/data/recipes';
import {Recipe} from '../model/recipe';
import {Item} from '../model/item';
import {OutputDisplay, SubRecipe} from '../model/output-display';
import {LaborCost} from '../model/labor-cost';
import {laborCosts} from '../../assets/data/labor-costs';
import {Ingredient} from '../model/ingredient';

@Injectable({
  providedIn: 'root'
})
export class CraftingService {

  //settings
  craftResourceModifier: WritableSignal<number>;
  expensiveEndgameRecipes: WritableSignal<boolean>;

  //skills
  selectedSkills: WritableSignal<Skill[]>;
  selectedTables: WritableSignal<CraftingTable[]>;

  //inputs
  pricePerThousandCals: WritableSignal<number>;
  defaultProfitPercent: WritableSignal<number>;
  selectedInputs: WritableSignal<Item[]>;
  selectedByproducts: WritableSignal<Item[]>;

  //outputs
  selectedRecipes: WritableSignal<Recipe[]>;
  outputDisplays: Signal<OutputDisplay[]>;
  primaryOutputIds: Signal<Set<string>>;

  constructor(private storageService: WebStorageService) {
    this.craftResourceModifier = signal(storageService.getCraftResourceModifier());
    this.expensiveEndgameRecipes = signal(storageService.getExpensiveEndgameRecipes());

    this.selectedSkills = signal(storageService.getSelectedSkills());
    this.selectedTables = signal(storageService.getSelectedTables());

    this.selectedRecipes = signal(storageService.getSelectedRecipes());

    this.pricePerThousandCals = signal(storageService.getPricePerThousandCals());
    this.defaultProfitPercent = signal(storageService.getProfitPercent());

    this.primaryOutputIds = computed(() => new Set(
      this.selectedRecipes()
        .flatMap((recipe) => recipe.primaryOutput?.item.nameID)
        .filter((nameID): nameID is string => nameID !== undefined))
    );

    this.selectedInputs = linkedSignal(() => {
      let items: Item[] = [];
      this.selectedRecipes().forEach(recipe => {
        recipe.ingredients.forEach(ing => {
          if (!items.some(item => item.nameID === ing.item.nameID)) {
            items.push(ing.item);
          }
        });
      });

      //Filter out all the ingredients that are primary outputs of other selected recipes
      items = items.filter(item => !this.primaryOutputIds().has(item.nameID));
      items.sort((a, b) => a.name().localeCompare(b.name()));

      return items;
    });

    this.selectedByproducts = linkedSignal(() => {
      let byproducts: Item[] = [];
      this.selectedRecipes().forEach(recipe => {
        recipe.outputs.forEach(output => {
          if (!output.primary && !byproducts.some(item => item.nameID === output.item?.nameID) &&
            !this.selectedInputs().some(item => item.nameID === output.item?.nameID)) {
            byproducts.push(output.item);
          }
        });
      });

      //Filter out byproducts that are primary outputs of another recipe
      byproducts = byproducts.filter(item => !this.primaryOutputIds().has(item.nameID));

      byproducts.sort((a, b) => a.name().localeCompare(b.name()));
      return byproducts;
    });

    this.outputDisplays = computed(() => {
      const outputDisplays: OutputDisplay[] = [];
      this.selectedRecipes().forEach(recipe => {
        if (!recipe.hidden) {
          let existingOutputDisplay = outputDisplays.find(outputDisplay =>
            outputDisplay.containsRecipeToProduceItem(recipe.primaryOutput.item.nameID)
          );

          if (existingOutputDisplay) {
            existingOutputDisplay.subRecipes.push(new SubRecipe(recipe));
          } else {
            outputDisplays.push(new OutputDisplay(recipe));
          }
        }
      });

      outputDisplays.sort((a, b) => a.itemName().localeCompare(b.itemName()));
      return outputDisplays;
    });

    this.restoreSavedPrices();


    //Sort skills and tables whenever they change
    effect(() => {
      this.selectedSkills.update(skills => {
        skills.sort((a, b) => a.name().localeCompare(b.name()));
        return skills;
      });
    });

    effect(() => {
      this.selectedTables.update(tables => {
        tables.sort((a, b) => a.name().localeCompare(b.name()));
        return tables;
      });
    });

    //Effect to compute the prices for each selected recipe
    effect(() => {
      const recipes = this.selectedRecipes();

      //Reset all recipes to consider their price not computed
      recipes.forEach(recipe => recipe.isPriceComputed = false);

      let numLoops = 0;

      //Loop to continue attempting to compute prices until all recipes are done
      while (recipes.some(recipe => !recipe.isPriceComputed) && numLoops < 20) {

        //Loop through each recipe and compute the price, if all the inputs have known prices
        for (let i = 0; i < recipes.length; i++) {
          const recipe = recipes[i];
          if (recipe.isPriceComputed) {
            continue;
          }

          let canComputeInputPrices = false;
          let cost = 0;

          for (let i = 0; i < recipe.ingredients.length; i++) {
            const ing = recipe.ingredients[i];
            const quantity = this.computeAdjustedQuantity(recipe, ing);
            let input = this.selectedInputs().find(item => item.nameID === ing.item.nameID);
            if (input) {
              cost += input.price() * quantity;
            } else {
              let byproduct = this.selectedByproducts().find(item => item.nameID === ing.item.nameID);
              if (byproduct) {
                cost += byproduct.price() * quantity;
              } else {
                let otherRecipe = this.selectedRecipes().find(r => r.primaryOutput.item.nameID === ing.item.nameID);
                if (otherRecipe && otherRecipe.isPriceComputed) {
                  cost += otherRecipe.basePrice() * quantity;
                } else {
                  //We cannot compute the price of this recipe yet. Move on to the next recipe
                  break;
                }
              }
            }
            canComputeInputPrices = true;
          }

          if (canComputeInputPrices) {
            let canComputeOutputPrices = true;
            for (let i = 0; i < recipe.outputs.length; i++) {
              const output = recipe.outputs[i];
              if (output.primary) {
                continue;
              }
              let input = this.selectedInputs().find(item => item.nameID === output.item.nameID);
              if (input) {
                cost -= input.price() * output.quantity;
              } else {
                let byproduct = this.selectedByproducts().find(item => item.nameID === output.item.nameID);
                if (byproduct) {
                  cost -= byproduct.price() * output.quantity;
                } else {
                  let otherRecipe = this.selectedRecipes().find(r => r.primaryOutput.item.nameID === output.item.nameID);
                  if (otherRecipe && otherRecipe.isPriceComputed) {
                    cost -= otherRecipe.basePrice() * output.quantity;
                  } else {
                    canComputeOutputPrices = false;
                    break;
                  }
                }
              }

              canComputeOutputPrices = true;
            }

            if (canComputeOutputPrices) {
              cost /= recipe.primaryOutput.quantity;
              cost += this.computeAdjustedLabor(recipe) * this.pricePerThousandCals() / 1000;

              let profitMultiplier = 1 + this.defaultProfitPercent() / 100;
              if (recipe.profitOverride() >= 0) {
                profitMultiplier = 1 + recipe.profitOverride() / 100;
              }

              recipe.basePrice.set(cost);
              recipe.price.set(cost * profitMultiplier);
              recipe.isPriceComputed = true;
            }
          }
        }

        numLoops++;
      }

      if (numLoops === 20) {
        console.warn("Could not compute prices for all recipes after 20 loops");
      }
    });

    effect(() => {
      storageService.saveCraftResourceModifier(this.craftResourceModifier());
    });

    effect(() => {
      storageService.saveExpensiveEndgameRecipes(this.expensiveEndgameRecipes());
    });

    effect(() => {
      storageService.saveSelectedSkills(this.selectedSkills());
    });

    effect(() => {
      storageService.saveSelectedTables(this.selectedTables());
    });

    effect(() => {
      storageService.savePricePerThousandCals(this.pricePerThousandCals());
    });

    effect(() => {
      storageService.saveProfitPercent(this.defaultProfitPercent());
    });

    effect(() => {
      storageService.saveSelectedItems(this.selectedInputs());
    });

    effect(() => {
      storageService.saveSelectedByproducts(this.selectedByproducts());
    });

    effect(() => {
      storageService.saveSelectedRecipes(this.selectedRecipes());
    });
  }


  private restoreSavedPrices(): void {
    const savedItems = this.storageService.getSelectedItems();
    const savedByproducts = this.storageService.getSelectedByproducts();

    if (savedItems.length === 0 && savedByproducts.length === 0) {
      return;
    }

    // Create maps for efficient lookup
    const savedItemPrices = new Map(savedItems.map(item => [item.nameID, item.price()]));
    const savedByproductPrices = new Map(savedByproducts.map(item => [item.nameID, item.price()]));

    // Restore input prices
    this.selectedInputs().forEach(item => {
      const savedPrice = savedItemPrices.get(item.nameID);
      if (savedPrice !== undefined) {
        item.price.set(savedPrice);
      }
    });

    // Restore byproduct prices
    this.selectedByproducts().forEach(item => {
      const savedPrice = savedByproductPrices.get(item.nameID);
      if (savedPrice !== undefined) {
        item.price.set(savedPrice);
      }
    });
  }


  //Settings methods
  setCraftResourceModifier(value: number) {
    this.craftResourceModifier.set(value);
  }

  toggleExpensiveEndgameRecipes() {
    this.expensiveEndgameRecipes.update(value => !value);
  }

  //Skill methods
  selectSkill(skill: Skill) {
    if (this.selectedSkills().some(s => s.nameID === skill.nameID)) {
      return;
    }

    this.selectedSkills.update(skills => [...skills, skill]);

    let recipesToAdd: Recipe[] = [];
    let tablesToAdd: CraftingTable[] = [];

    //Find out which tables and recipes to add based on the selected skill
    for (const recipe of recipes.values()) {
      if (skill.nameID === recipe.skill?.nameID) {
        if (!this.selectedRecipes().some(r => r.nameID === recipe.nameID)) {
          recipesToAdd.push(recipe);
        }

        //Add the recipe's table as well, if it's not already marked for add and not already in the selected tables
        if (!tablesToAdd.some(t => t.nameID === recipe.craftingTable.nameID) &&
          !this.selectedTables().some(t => t.nameID === recipe.craftingTable.nameID)) {
          tablesToAdd.push(recipe.craftingTable);
        }
      }
    }

    this.selectedTables.update(tables => [...tables, ...tablesToAdd]);
    this.selectedRecipes.update(recipes => [...recipes, ...recipesToAdd]);
  }

  updateSkillLevel(level: number, index: number) {
    this.selectedSkills.update(skills => {
      skills[index].level.set(level);
      return skills;
    });
  }

  removeSkillByIndex(index: number) {
    const skill = this.selectedSkills()[index];

    // Remove the skill from the array
    this.selectedSkills.update(skills => {
      skills.splice(index, 1);
      return [...skills];
    });

    // Remove any selected recipes with that skill
    this.selectedRecipes.update(recipes => {
      return recipes.filter(recipe => recipe.skill?.nameID !== skill.nameID);
    });

    // Remove any tables that no longer have any matching recipes
    this.selectedTables.update(tables => {
      return tables.filter(table => this.selectedRecipes().some(r => r.craftingTable.nameID === table.nameID));
    });
  }

  removeSkill(skill: Skill) {
    this.removeSkillByIndex(this.selectedSkills().indexOf(skill));
  }

  updateLavish(value: boolean, index: number) {
    this.selectedSkills.update(skills => {
      skills[index].lavishChecked.set(value);
      return skills;
    });
  }

  // Table methods
  selectTable(table: CraftingTable) {
    if (this.selectedTables().some(t => t.nameID === table.nameID)) {
      return;
    }

    // Add the table to the selected tables
    this.selectedTables.update(tables => {
      return [...tables, table];
    });

    //Add all recipes and skills for that table
    for (const recipe of recipes.values()) {
      if (recipe.craftingTable.nameID === table.nameID) {
        if (!this.selectedRecipes().some(r => r.nameID === recipe.nameID)) {
          this.selectedRecipes.update(recipes => [...recipes, recipe]);
          if (!this.selectedSkills().some(s => s.nameID === recipe.skill?.nameID)) {
            this.selectedSkills.update(skills => [...skills, recipe.skill]);
          }
        }
      }
    }
  }

  updateSelectedUpgrade(index: number, value: UpgradeModule) {
    this.selectedTables.update(tables => {
      tables[index].selectedUpgrade.set(value);
      return tables;
    });
  }

  removeTableByIndex(index: number) {
    const table = this.selectedTables()[index];

    // Remove the table from the array
    this.selectedTables.update(tables => {
      tables.splice(index, 1);
      return [...tables];
    });

    // Remove all selected recipes on that table
    this.selectedRecipes.update(recipes => {
      return recipes.filter(recipe => recipe.craftingTable.nameID !== table.nameID);
    });

    // Remove any skills that no longer have any selected recipes
    this.selectedSkills.update(skills => {
      return skills.filter(skill => this.selectedRecipes().some(r => r.skill?.nameID === skill.nameID));
    });
  }

  //Input methods
  updatePricePerThousandCals(number: number) {
    this.pricePerThousandCals.set(number);
  }

  updateDefaultProfitPercent(number: number) {
    this.defaultProfitPercent.set(number);
  }

  updateInputPrice(index: number, value: number) {
    this.selectedInputs.update((items: Item[]) => {
      items[index].price.set(value);
      return [...items];
    });
  }

  updateByproductPrice(index: number, value: number) {
    this.selectedByproducts.update((items: Item[]) => {
      items[index].price.set(value);
      return [...items];
    });
  }

  selectRecipe(recipe: Recipe) {
    if (this.selectedRecipes().some(r => r.nameID === recipe.nameID)) {
      return;
    }

    this.selectedRecipes.update(recipes => [...recipes, recipe]);

    //Find out which skills and recipes to add based on the selected skill
    if (!this.selectedSkills().some(s => s.nameID === recipe.skill.nameID)) {
      this.selectedSkills.update(skills => [...skills, recipe.skill]);
    }

    if (!this.selectedTables().some(t => t.nameID === recipe.craftingTable.nameID)) {
      this.selectedTables.update(tables => [...tables, recipe.craftingTable]);
    }
  }

  removeOutput(outputIndex: number) {
    const outputDisplay = this.outputDisplays()[outputIndex];
    const subRecipeNameIds = outputDisplay.subRecipes.map(subRecipe => subRecipe.recipeNameID);
    const recipesToRemove = subRecipeNameIds.map(nameID => recipes.get(nameID) as Recipe);

    const skillsToRemove = new Set<string>(recipesToRemove.map(recipe => recipe.skill.nameID));
    const tablesToRemove = new Set<string>(recipesToRemove.map(recipe => recipe.craftingTable.nameID));

    this.selectedRecipes.update(recipes => {
      for (let i = recipes.length - 1; i >= 0; i--) {
        const recipe = recipes[i];
        if (subRecipeNameIds.includes(recipe.nameID)) {
          recipes.splice(i, 1);
        } else {
          if (skillsToRemove.has(recipe.skill.nameID)) {
            skillsToRemove.delete(recipe.skill.nameID);
          }
          if (tablesToRemove.has(recipe.craftingTable.nameID)) {
            tablesToRemove.delete(recipe.craftingTable.nameID);
          }
        }
      }
      return [...recipes];
    });

    this.selectedSkills.update(skills => {
      return skills.filter(skill => !skillsToRemove.has(skill.nameID));
    });

    this.selectedTables.update(tables => {
      return tables.filter(table => !tablesToRemove.has(table.nameID));
    });
  }

  removeSubRecipe(outputIndex: number, subRecipeIndex: number) {
    const subRecipeToRemoveArray = this.outputDisplays()[outputIndex].subRecipes.splice(subRecipeIndex, 1);
    const recipeToRemove = recipes.get(subRecipeToRemoveArray[0].recipeNameID) as Recipe;

    //We need to remove the recipe's skill and table as well, if it's the only one that uses them
    const skillToRemove = recipeToRemove.skill.nameID;
    const tableToRemove = recipeToRemove.craftingTable.nameID;

    //Keep track of whether we can remove the skill and table (based on other selected recipes being present)
    let shouldRemoveSkill = true;
    let shouldRemoveTable = true;

    //Update the selected recipes to remove the selected subrecipe, and determine whether to remove that recipe's skill/table
    this.selectedRecipes.update(recipes => {
      for (let i = recipes.length - 1; i >= 0; i--) {
        const recipe = recipes[i];
        if (recipe.nameID === recipeToRemove.nameID) {
          recipes.splice(i, 1);
        } else {
          if (shouldRemoveSkill && recipe.skill.nameID === skillToRemove) {
            shouldRemoveSkill = false;
          }
          if (shouldRemoveTable && recipe.craftingTable.nameID === tableToRemove) {
            shouldRemoveTable = false;
          }
        }
      }
      return [...recipes];
    });

    if (shouldRemoveSkill) {
      this.selectedSkills.update(skills => {
        return skills.filter(skill => skill.nameID !== skillToRemove);
      });
    }

    if (shouldRemoveTable) {
      this.selectedTables.update(tables => {
        return tables.filter(table => table.nameID !== tableToRemove);
      });
    }
  }

  updateProfitPercent(value: number, outputDisplay: OutputDisplay) {
    this.selectedRecipes.update(recipes => {
      const recipeIds = new Set(outputDisplay.subRecipes.map(sr => sr.recipeNameID));
      recipes.forEach(recipe => {
        if (recipeIds.has(recipe.nameID)) {
          recipe.profitOverride.set(value);
        }
      });
      return recipes;
    });
  }

  computeAdjustedLabor(recipe: Recipe): number {
    let laborCalories = recipe.labor;
    const laborCost = laborCosts.find(laborCost => laborCost.level === recipe.skill.level()) as LaborCost;
    return laborCalories * laborCost.modifier;
  }

  computeAdjustedQuantity(recipe: Recipe, input: Ingredient): number {
    let quantity = input.quantity * this.craftResourceModifier();
    if (!input.reducible) {
      return input.quantity;
    }
    const modifier = recipe.craftingTable.selectedUpgrade().modifier;
    quantity *= modifier;
    if (recipe.skill.lavishChecked()) {
      quantity *= .95;
    }
    return quantity;
  }
}
