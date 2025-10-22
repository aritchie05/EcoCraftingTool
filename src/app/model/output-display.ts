import {Recipe} from "./recipe";
import {computed, Signal} from '@angular/core';

export class SubRecipe {
  recipeNameID: string;
  recipeName: Signal<string>;
  recipePrice: Signal<number>;
  basePrice: Signal<number>;
  recipe: Recipe;


  constructor(recipe: Recipe) {
    this.recipeNameID = recipe.nameID;
    this.recipeName = recipe.name;
    this.recipePrice = recipe.price;
    this.basePrice = recipe.basePrice;
    this.recipe = recipe;
  }
}

export class OutputDisplay {
  itemNameID: string;
  itemName: Signal<string>;

  basePrice: Signal<number>;
  //Price PER OUTPUT ITEM
  itemPrice: Signal<number>;
  subRecipes: SubRecipe[];

  imageFile?: string;
  xPos?: number;
  yPos?: number;
  filter?: string;


  constructor(recipe: Recipe) {
    this.itemNameID = recipe.primaryOutput.item.nameID;

    this.itemName = recipe.primaryOutput.item.name;
    this.subRecipes = [{
      recipeNameID: recipe.nameID,
      recipeName: recipe.name.asReadonly(),
      recipePrice: recipe.price.asReadonly(),
      basePrice: recipe.basePrice.asReadonly(),
      recipe: recipe
    }];
    this.itemPrice = computed(() => {
      const prices = this.subRecipes.map(subRecipe => subRecipe.recipePrice());

      return Math.min(...prices);
    });
    this.basePrice = computed(() => {
      const prices = this.subRecipes.map(subRecipe => subRecipe.basePrice());

      return Math.min(...prices);
    });
    this.imageFile = recipe.primaryOutput.item.imageFile;
    this.xPos = recipe.primaryOutput.item.xPos;
    this.yPos = recipe.primaryOutput.item.yPos;
    this.filter = recipe.primaryOutput.item.filter;
  }

  containsRecipeToProduceItem(primaryOutputNameID: string): boolean {
    return this.subRecipes.some(subRecipe => subRecipe.recipe.primaryOutput.item.nameID === primaryOutputNameID);
  }
}
