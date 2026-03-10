import {computed, effect, Injectable, linkedSignal, signal, Signal, WritableSignal} from '@angular/core';
import {Skill} from '../model/skill';
import {CraftingTable} from '../model/crafting-table';
import WebStorageService from './storage.service';
import {UpgradeModule} from '../model/upgrade-module';
import {Recipe} from '../model/recipe';
import {Item} from '../model/item';
import {OutputDisplay, SubRecipe} from '../model/output-display';
import {LaborCost} from '../model/labor-cost';
import {laborCosts} from '../../assets/data/labor-costs';
import {Ingredient} from '../model/ingredient';
import {Output} from '../model/output';
import {CraftingDataService} from './crafting-data.service';

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

  private computePricesTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(storageService: WebStorageService, private craftingDataService: CraftingDataService) {
    this.craftResourceModifier = signal(storageService.getCraftResourceModifier());
    this.expensiveEndgameRecipes = signal(storageService.getExpensiveEndgameRecipes());

    this.selectedSkills = signal(craftingDataService.getSelectedSkills());
    this.selectedTables = signal(craftingDataService.getSelectedTables());

    this.selectedRecipes = signal(craftingDataService.getSelectedRecipes());

    this.pricePerThousandCals = signal(storageService.getPricePerThousandCals());
    this.defaultProfitPercent = signal(storageService.getProfitPercent());

    this.primaryOutputIds = computed(() => new Set(
      this.selectedRecipes()
        .filter((recipe) => !recipe.hidden)
        .flatMap((recipe) => recipe.primaryOutput?.item?.nameID)
        .filter((nameID): nameID is string => nameID !== undefined))
    );

    this.selectedInputs = linkedSignal(() => {
      const seen = new Set<string>();
      const items: Item[] = [];
      const primaryIds = this.primaryOutputIds();

      for (const recipe of this.selectedRecipes()) {
        if (!recipe.hidden) {
          for (const ing of recipe.ingredients) {
            if (!seen.has(ing.item.nameID) && !primaryIds.has(ing.item.nameID)) {
              seen.add(ing.item.nameID);
              items.push(ing.item);
            }
          }
        }
      }

      items.sort((a, b) => a.name().localeCompare(b.name()));
      return items;
    });

    this.selectedByproducts = linkedSignal(() => {
      const seen = new Set<string>();
      const byproducts: Item[] = [];
      const inputIds = new Set(this.selectedInputs().map(item => item.nameID));
      const primaryIds = this.primaryOutputIds();

      for (const recipe of this.selectedRecipes()) {
        if (!recipe.hidden) {
          for (const output of recipe.outputs) {
            if (!output.primary && output.item &&
              !seen.has(output.item.nameID) &&
              !inputIds.has(output.item.nameID) &&
              !primaryIds.has(output.item.nameID)) {
              seen.add(output.item.nameID);
              byproducts.push(output.item);
            }
          }
        }
      }

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

    // Debounced effect to compute prices — reads all signal dependencies synchronously,
    // then defers the expensive computation to avoid cascading rerenders
    effect(() => {
      const recipes = this.selectedRecipes();
      const inputs = this.selectedInputs();
      const byproducts = this.selectedByproducts();

      const pricePerThousandCals = this.pricePerThousandCals();
      const defaultProfitPercent = this.defaultProfitPercent();

      if (this.computePricesTimeout) {
        clearTimeout(this.computePricesTimeout);
      }
      this.computePricesTimeout = setTimeout(() => {
        void this.computePricesAsync(recipes, inputs, byproducts, pricePerThousandCals, defaultProfitPercent);
      }, 150);
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

  private async computePricesAsync(recipes: Recipe[], inputs: Item[], byproducts: Item[],
                                   pricePerThousandCals: number, defaultProfitPercent: number): Promise<void> {
    recipes.forEach(recipe => recipe.isPriceComputed = false);

    // Build lookup maps for O(1) price lookups instead of O(n) Array.find()
    const inputPriceMap = new Map(inputs.map(item => [item.nameID, item]));
    const byproductPriceMap = new Map(byproducts.map(item => [item.nameID, item]));
    const recipePrimaryOutputMap = new Map(recipes.map(r => [r.primaryOutput.item.nameID, r]));

    let numLoops = 0;
    const maxLoops = 10;

    while (recipes.some(recipe => !recipe.isPriceComputed) && numLoops < maxLoops) {

      for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        if (recipe.isPriceComputed) {
          continue;
        }

        let canComputeInputPrices = true;
        let cost = 0;

        for (let j = 0; j < recipe.ingredients.length; j++) {
          const ing = recipe.ingredients[j];
          const quantity = this.computeAdjustedInputQuantity(recipe, ing);

          const input = inputPriceMap.get(ing.item.nameID);
          if (input) {
            cost += input.price() * quantity;
            continue;
          }

          const byproduct = byproductPriceMap.get(ing.item.nameID);
          if (byproduct) {
            cost += byproduct.price() * quantity;
            continue;
          }

          const otherRecipe = recipePrimaryOutputMap.get(ing.item.nameID);
          if (otherRecipe && otherRecipe.isPriceComputed) {
            cost += otherRecipe.basePrice() * quantity;
            continue;
          }

          canComputeInputPrices = false;
          break;
        }

        if (canComputeInputPrices) {
          let canComputeOutputPrices = true;
          for (let j = 0; j < recipe.outputs.length; j++) {
            const output = recipe.outputs[j];
            if (output.primary && recipe.outputs.length > 1) {
              continue;
            } else if (output.primary && recipe.outputs.length === 1) {
              break;
            }
            const quantity = this.computeAdjustedOutputQuantity(recipe, output);

            const input = inputPriceMap.get(output.item.nameID);
            if (input) {
              cost -= input.price() * quantity;
              continue;
            }

            const byproduct = byproductPriceMap.get(output.item.nameID);
            if (byproduct) {
              cost -= byproduct.price() * quantity;
              continue;
            }

            const otherRecipe = recipePrimaryOutputMap.get(output.item.nameID);
            if (otherRecipe && otherRecipe.isPriceComputed) {
              cost -= otherRecipe.basePrice() * quantity;
              continue;
            }

            canComputeOutputPrices = false;
            break;
          }

          if (canComputeOutputPrices) {
            cost += this.computeAdjustedLabor(recipe) * pricePerThousandCals / 1000;
            cost /= recipe.primaryOutput.quantity;

            let profitMultiplier = 1 + defaultProfitPercent / 100;
            if (recipe.profitOverride() >= 0) {
              profitMultiplier = 1 + recipe.profitOverride() / 100;
            }

            recipe.basePrice.set(cost);
            recipe.price.set(cost * profitMultiplier);
            recipe.isPriceComputed = true;
          }
        }

        if (i > 0 && i % 10 === 0) {
          await new Promise(resolve => setTimeout(resolve));
        }
      }

      numLoops++;

      await new Promise(resolve => setTimeout(resolve, 0));
    }

    if (numLoops === maxLoops) {
      console.warn(`Could not compute prices for all recipes after ${maxLoops} loops`);
    }
  }

  //Skill methods
  async selectSkill(skill: Skill) {
    if (this.selectedSkills().some(s => s.nameID === skill.nameID)) {
      return;
    }

    this.selectedSkills.update(skills =>
      [...skills, skill].sort((a, b) => a.name().localeCompare(b.name()))
    );

    let recipesToAdd: Recipe[] = [];
    let tablesToAdd: CraftingTable[] = [];

    await new Promise(resolve => setTimeout(resolve));

    //Find out which tables and recipes to add based on the selected skill
    for (const recipe of this.craftingDataService.recipes().values()) {
      if (!recipe.hidden && skill.nameID === recipe.skill?.nameID) {
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

    await new Promise(resolve => setTimeout(resolve));

    this.selectedTables.update(tables =>
      [...tables, ...tablesToAdd].sort((a, b) => a.name().localeCompare(b.name()))
    );
    this.selectedRecipes.update(recipes => [...recipes, ...recipesToAdd]);
  }

  private resetTouchedForRemovedItems(removedRecipes: Recipe[]): void {
    removedRecipes.forEach(recipe => {
      recipe.ingredients.forEach(ing => ing.item.touched.set(false));
      recipe.outputs.forEach(output => {
        if (!output.primary) {
          output.item.touched.set(false);
        }
      });
    });
  }


  //Settings methods
  setCraftResourceModifier(value: number) {
    this.craftResourceModifier.set(value);
  }

  toggleExpensiveEndgameRecipes() {
    this.expensiveEndgameRecipes.update(value => !value);
  }

  // Table methods
  async selectTable(table: CraftingTable) {
    if (this.selectedTables().some(t => t.nameID === table.nameID)) {
      return;
    }

    // Add the table to the selected tables
    this.selectedTables.update(tables => {
      return [...tables, table].sort((a, b) => a.name().localeCompare(b.name()));
    });

    await new Promise(resolve => setTimeout(resolve));

    //Add all recipes and skills for that table — batch updates to avoid cascading rerenders
    const recipesToAdd: Recipe[] = [];
    const skillsToAdd: Skill[] = [];
    const existingSkillIds = new Set(this.selectedSkills().map(s => s.nameID));
    const existingRecipeIds = new Set(this.selectedRecipes().map(r => r.nameID));

    for (const recipe of this.craftingDataService.recipes().values()) {
      if (!recipe.hidden && recipe.craftingTable.nameID === table.nameID) {
        if (!existingRecipeIds.has(recipe.nameID)) {
          recipesToAdd.push(recipe);
          if (recipe.skill && !existingSkillIds.has(recipe.skill.nameID)) {
            skillsToAdd.push(recipe.skill);
            existingSkillIds.add(recipe.skill.nameID);
          }
        }
      }
    }

    if (recipesToAdd.length > 0) {
      this.selectedRecipes.update(recipes => [...recipes, ...recipesToAdd]);
    }
    if (skillsToAdd.length > 0) {
      this.selectedSkills.update(skills =>
        [...skills, ...skillsToAdd].sort((a, b) => a.name().localeCompare(b.name()))
      );
    }
  }

  updateSkillLevel(level: number, index: number) {
    this.selectedSkills.update(skills => {
      skills[index].level.set(level);
      return skills;
    });
  }

  async removeSkillByIndex(index: number) {
    const skill = this.selectedSkills()[index];

    // Remove the skill from the array
    this.selectedSkills.update(skills => {
      skills.splice(index, 1);
      return [...skills];
    });

    await new Promise(resolve => setTimeout(resolve));

    // Get recipes to be removed
    const recipesToRemove = this.selectedRecipes().filter(
      recipe => recipe.skill?.nameID === skill.nameID
    );

    // Remove any selected recipes with that skill
    this.selectedRecipes.update(recipes => {
      return recipes.filter(recipe => recipe.skill?.nameID !== skill.nameID);
    });

    await new Promise(resolve => setTimeout(resolve));

    // Reset touched flag for removed ingredients
    this.resetTouchedForRemovedItems(recipesToRemove);

    await new Promise(resolve => setTimeout(resolve));

    // Remove any tables that no longer have any matching recipes
    this.selectedTables.update(tables => {
      return tables.filter(table => this.selectedRecipes().some(r => r.craftingTable.nameID === table.nameID));
    });
  }

  removeSkill(skill: Skill) {
    void this.removeSkillByIndex(this.selectedSkills().indexOf(skill));
  }

  updateLavish(value: boolean, index: number) {
    this.selectedSkills.update(skills => {
      skills[index].lavishChecked.set(value);
      return skills;
    });
  }

  async removeOutput(outputIndex: number) {
    const outputDisplay = this.outputDisplays()[outputIndex];
    const subRecipeNameIds = outputDisplay.subRecipes.map(subRecipe => subRecipe.recipeNameID);
    const recipesToRemove = subRecipeNameIds.map(nameID => this.craftingDataService.recipes().get(nameID) as Recipe);

    const skillsToRemove = new Set<string>(recipesToRemove.map(recipe => recipe.skill.nameID));
    const tablesToRemove = new Set<string>(recipesToRemove.map(recipe => recipe.craftingTable.nameID));

    await new Promise(resolve => setTimeout(resolve));

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

    await new Promise(resolve => setTimeout(resolve));

    this.resetTouchedForRemovedItems(recipesToRemove);

    this.selectedSkills.update(skills => {
      return skills.filter(skill => !skillsToRemove.has(skill.nameID));
    });

    await new Promise(resolve => setTimeout(resolve));

    this.selectedTables.update(tables => {
      return tables.filter(table => !tablesToRemove.has(table.nameID));
    });
  }

  updateSelectedUpgrade(index: number, value: UpgradeModule) {
    this.selectedTables.update(tables => {
      tables[index].selectedUpgrade.set(value);
      return tables;
    });
  }

  async removeTableByIndex(index: number) {
    const table = this.selectedTables()[index];

    // Remove the table from the array
    this.selectedTables.update(tables => {
      tables.splice(index, 1);
      return [...tables];
    });

    await new Promise(resolve => setTimeout(resolve));

    // Get recipes to be removed
    const recipesToRemove = this.selectedRecipes().filter(
      recipe => recipe.craftingTable.nameID === table.nameID
    );

    // Remove all selected recipes on that table
    this.selectedRecipes.update(recipes => {
      return recipes.filter(recipe => recipe.craftingTable.nameID !== table.nameID);
    });

    await new Promise(resolve => setTimeout(resolve));

    // Reset touched flag for removed ingredients
    this.resetTouchedForRemovedItems(recipesToRemove);

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

  async selectRecipe(recipe: Recipe) {
    if (this.selectedRecipes().some(r => r.nameID === recipe.nameID)) {
      return;
    }

    this.selectedRecipes.update(recipes => [...recipes, recipe]);

    await new Promise(resolve => setTimeout(resolve));

    //Find out which skills and recipes to add based on the selected skill
    if (!this.selectedSkills().some(s => s.nameID === recipe.skill.nameID)) {
      this.selectedSkills.update(skills =>
        [...skills, recipe.skill].sort((a, b) => a.name().localeCompare(b.name()))
      );

      await new Promise(resolve => setTimeout(resolve));
    }

    if (!this.selectedTables().some(t => t.nameID === recipe.craftingTable.nameID)) {
      this.selectedTables.update(tables =>
        [...tables, recipe.craftingTable].sort((a, b) => a.name().localeCompare(b.name()))
      );
    }
  }

  async removeSubRecipe(outputIndex: number, subRecipeIndex: number) {
    const subRecipeToRemoveArray = this.outputDisplays()[outputIndex].subRecipes.splice(subRecipeIndex, 1);
    const recipeToRemove = this.craftingDataService.recipes().get(subRecipeToRemoveArray[0].recipeNameID) as Recipe;

    //We need to remove the recipe's skill and table as well, if it's the only one that uses them
    const skillToRemove = recipeToRemove.skill.nameID;
    const tableToRemove = recipeToRemove.craftingTable.nameID;

    //Keep track of whether we can remove the skill and table (based on other selected recipes being present)
    let shouldRemoveSkill = true;
    let shouldRemoveTable = true;

    await new Promise(resolve => setTimeout(resolve));

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
      await new Promise(resolve => setTimeout(resolve));

      this.selectedSkills.update(skills => {
        return skills.filter(skill => skill.nameID !== skillToRemove);
      });
    }

    if (shouldRemoveTable) {
      await new Promise(resolve => setTimeout(resolve));

      this.selectedTables.update(tables => {
        return tables.filter(table => table.nameID !== tableToRemove);
      });
    }
  }

  private restoreSavedPrices(): void {
    const savedItems = this.craftingDataService.getSelectedItems();
    const savedByproducts = this.craftingDataService.getSelectedByproducts();

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

  computeAdjustedInputQuantity(recipe: Recipe, input: Ingredient): number {
    let quantity = input.quantity * this.craftResourceModifier();
    if (!input.reducible) {
      return quantity;
    }
    const modifier = recipe.craftingTable.selectedUpgrade().modifier;
    quantity *= modifier;
    if (recipe.skill.lavishChecked()) {
      quantity *= .95;
    }
    return quantity;
  }

  computeAdjustedOutputQuantity(recipe: Recipe, output: Output): number {
    let quantity = output.quantity;
    if (!output.reducible) {
      return quantity;
    }
    const modifier = recipe.craftingTable.selectedUpgrade().modifier;
    quantity *= modifier;
    if (recipe.skill.lavishChecked() && output.primary) {
      //Lavish reduction no longer applies to byproducts
      quantity *= .95;
    }
    return quantity;
  }

  /**
   * Re-maps selectedRecipes, selectedSkills, and selectedTables to the current objects in
   * the CraftingDataService central Maps. This must be called after server data changes
   * (e.g. saveConnection) to prevent stale object references from being used in calculations.
   * User state (skill levels, table upgrades, recipe profit overrides, item prices) is
   * preserved across the refresh.
   */
  refreshSelectedData(): void {
    const currentRecipes = this.craftingDataService.recipes();
    const currentSkills = this.craftingDataService.skills();
    const currentTables = this.craftingDataService.tables();

    // Capture user state from current objects before swapping references
    const skillState = new Map(this.selectedSkills().map(s =>
      [s.nameID, {level: s.level(), lavish: s.lavishChecked()}]
    ));
    const tableState = new Map(this.selectedTables().map(t =>
      [t.nameID, t.selectedUpgrade()]
    ));
    const recipeProfits = new Map(this.selectedRecipes().map(r =>
      [r.nameID, r.profitOverride()]
    ));
    const inputPrices = new Map(this.selectedInputs().map(i =>
      [i.nameID, i.price()]
    ));
    const byproductPrices = new Map(this.selectedByproducts().map(i =>
      [i.nameID, i.price()]
    ));

    // Re-map to current objects from the central Maps
    this.selectedRecipes.update(selected =>
      selected
        .map(r => currentRecipes.get(r.nameID))
        .filter((r): r is Recipe => r !== undefined)
    );

    this.selectedSkills.update(selected =>
      selected
        .map(s => currentSkills.get(s.nameID))
        .filter((s): s is Skill => s !== undefined)
    );

    this.selectedTables.update(selected =>
      selected
        .map(t => currentTables.get(t.nameID))
        .filter((t): t is CraftingTable => t !== undefined)
    );

    // Restore user state on the new objects
    this.selectedSkills().forEach(s => {
      const saved = skillState.get(s.nameID);
      if (saved) {
        s.level.set(saved.level);
        s.lavishChecked.set(saved.lavish);
      }
    });

    this.selectedTables().forEach(t => {
      const saved = tableState.get(t.nameID);
      if (saved) {
        t.selectedUpgrade.set(saved);
      }
    });

    this.selectedRecipes().forEach(r => {
      const saved = recipeProfits.get(r.nameID);
      if (saved !== undefined) {
        r.profitOverride.set(saved);
      }
    });

    // Restore input/byproduct prices (linkedSignals recompute when read)
    this.selectedInputs().forEach(i => {
      const saved = inputPrices.get(i.nameID);
      if (saved !== undefined) {
        i.price.set(saved);
      }
    });

    this.selectedByproducts().forEach(i => {
      const saved = byproductPrices.get(i.nameID);
      if (saved !== undefined) {
        i.price.set(saved);
      }
    });
  }
}
