import {Recipe} from '../interface/recipe';

export class OutputCookie {
  id: string;

  /**
   * Cost of the recipe
   */
  pr: string;

  constructor(recipe: Recipe) {
    this.id = recipe.nameID;
    this.pr = recipe.price.toFixed(2);
  }
}
