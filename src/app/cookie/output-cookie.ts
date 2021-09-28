import {Recipe} from '../interface/recipe';

export class OutputCookie {
  id: string;

  /**
   * Base price of the recipe
   */
  bp: string;

  /**
   * Cost of the recipe
   */
  pr: string;

  constructor(recipe: Recipe) {
    this.id = recipe.nameID;
    this.bp = recipe.basePrice.toFixed(2);
    this.pr = recipe.price.toFixed(2);
  }
}
