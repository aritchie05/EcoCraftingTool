import {Item} from '../item';

export class StoredItem {
  id: string;

  /**
   * Price of the ingredient
   */
  pr: string;

  /**
   * Touched flag
   */
  t?: boolean;

  constructor(item: Item) {
    this.id = item.nameID;
    this.pr = item.price ? item.price().toFixed(2) : '0';

    if (item.touched()) {
      this.t = item.touched();
    }
  }
}
