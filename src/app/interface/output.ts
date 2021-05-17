import {Item} from './item';
import {SetItem} from './actual-set';

export class Output implements SetItem<Output> {
  item: Item;
  quantity: bigint;
  reducible: boolean;

  public equals(other: Output): boolean {
    return this.item.equals(other.item);
  }
}
