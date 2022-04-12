export class SubRecipe {
  recipeNameID: string;
  recipeName: string;
  recipePrice: number;
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
}
