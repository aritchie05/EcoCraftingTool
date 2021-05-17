import {Item} from './item';
import {SetItem} from './actual-set';

export class Ingredient implements SetItem<Ingredient> {
  item: Item;
  quantity: bigint;
  reducible: boolean;

  public equals(other: Ingredient): boolean {
    return this.item.equals(other.item)
      && this.quantity === other.quantity
      && this.reducible === other.reducible;
  }
}
