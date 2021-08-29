import {Recipe} from '../interface/recipe';

export class OutputCookie {
  id: string;

  /**
   * Cost of the recipe
   */
  pr: number;

  constructor(recipe: Recipe) {
    this.id = recipe.nameID;
    this.pr = Number.parseFloat(recipe.price.toFixed(2));
  }
}
