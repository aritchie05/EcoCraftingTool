import {Item} from '../interface/item';

export class IngredientCookie {
  id: string;

  /**
   * Price of the ingredient
   */
  pr: number;

  constructor(item: Item) {
    this.id = item.nameID;
    this.pr = item.price;
  }
}
