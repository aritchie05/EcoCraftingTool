import {Item} from '../item';

export class StoredItem {
  id: string;

  /**
   * Price of the ingredient
   */
  pr: string;

  constructor(item: Item) {
    this.id = item.nameID;
    this.pr = item.price ? item.price().toFixed(2) : '0';
  }
}
