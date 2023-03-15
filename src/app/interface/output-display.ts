import { Recipe } from "./recipe";

export class SubRecipe {
  recipeNameID: string;
  recipeName: string;
  recipePrice: number;
  recipe: Recipe;
}

export class OutputDisplay {
  itemNameID: string;
  itemName: string;

  //Price PER OUTPUT ITEM
  itemPrice: number;
  subRecipes: SubRecipe[];

  imageFile?: string;
  xPos?: number;
  yPos?: number;
  filter?: string;
}
