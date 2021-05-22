import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CraftingDataService} from '../service/crafting-data.service';
import {Recipe} from '../interface/recipe';
import {OutputDisplay, SubRecipe} from '../interface/output-display';

@Component({
  selector: 'app-outputs',
  templateUrl: './outputs.component.html',
  styleUrls: ['./outputs.component.css']
})
export class OutputsComponent implements OnInit {

  recipes: Recipe[];
  outputDisplays: OutputDisplay[];

  @Output() itemRemovedEvent = new EventEmitter<string>();
  @Output() subRecipeRemovedEvent = new EventEmitter<Recipe>();

  constructor(private dataService: CraftingDataService) {
    this.recipes = [];
    this.outputDisplays = [];
  }

  ngOnInit(): void {
  }

  convertRecipesToOutputDisplays(): void {
    //Clear the contents of the array
    this.outputDisplays = [];

    //Loop through recipes and populate data
    this.recipes.forEach(recipe => {

      //Check if the outputDisplays already contains at least one of the primary output item
      let exists = this.outputDisplays.some(outputDisplay => {
          if (outputDisplay.itemNameID.localeCompare(recipe.primaryOutput.item.nameID) === 0) {
            outputDisplay.subRecipes.push({
              recipeNameID: recipe.nameID,
              recipeName: recipe.name,
              recipePrice: recipe.price
            });
            return true;
          }
          return false;
        }
      );

      if (!exists) {
        //Output displays doesn't contain this output item, create a new element
        this.outputDisplays.push({
          itemName: recipe.primaryOutput.item.name,
          itemNameID: recipe.primaryOutput.item.nameID,
          itemPrice: recipe.price,
          subRecipes: [{
            recipeNameID: recipe.nameID,
            recipeName: recipe.name,
            recipePrice: recipe.price
          }]
        });
      }
    });

    //Check each output display to calculate the cheapest recipe and set that as the overall price
    this.outputDisplays.forEach(outputDisplay => {

      let cheapestPrice = Number.MAX_VALUE;

      //Multiple recipes create this item as primary output
      if (outputDisplay.subRecipes.length > 1) {
        outputDisplay.subRecipes.forEach(subRecipe => {
          if (subRecipe.recipePrice < cheapestPrice) {
            console.log(`Setting new cheapest price to ${subRecipe.recipePrice} from recipe ${subRecipe.recipeName}`);
            cheapestPrice = subRecipe.recipePrice;
          }
        });

        outputDisplay.itemPrice = cheapestPrice;
      }

      this.sortOutputDisplaySubRecipes(outputDisplay);
    });

    //Finally sort the array by item name
    this.sortOutputDisplays();
  }

  onRemoveItem(itemNameID: string): void {
    let index = this.outputDisplays.findIndex(outputDisplay => {
      return outputDisplay.itemNameID.localeCompare(itemNameID) === 0;
    });
    this.outputDisplays.splice(index, 1);

    //Loop backwards to prevent array reindexing on splice
    for (let i = this.recipes.length - 1; i >= 0; i--) {
      if (this.recipes[i].primaryOutput.item.nameID.localeCompare(itemNameID) === 0) {
        this.recipes.splice(i, 1);
      }
    }
    this.itemRemovedEvent.emit(itemNameID);
  }

  onRemoveSubRecipe(subRecipe: SubRecipe): void {
    let recipe;
    for (let i = this.recipes.length - 1; i >= 0; i--) {
      if (this.recipes[i].nameID.localeCompare(subRecipe.recipeNameID) === 0) {
        recipe = this.recipes[i];
        this.recipes.splice(i, 1);
        break;
      }
    }

    this.convertRecipesToOutputDisplays();
    this.subRecipeRemovedEvent.emit(recipe);
  }

  sortRecipes(): void {
    this.recipes.sort((a, b) => a.name.localeCompare(b.name));
  }

  sortOutputDisplays(): void {
    this.outputDisplays.sort((a, b) => a.itemName.localeCompare(b.itemName));
  }

  sortOutputDisplaySubRecipes(outputDisplay: OutputDisplay): void {
    outputDisplay.subRecipes.sort((a, b) => {
      return a.recipePrice - b.recipePrice;
    });
  }
}
