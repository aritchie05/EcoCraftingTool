import {SetItem} from './actual-set';

export class Item implements SetItem<Item> {

  name: string;
  nameID: string;
  tag: boolean;
  price?: number;

  public equals(other: Item): boolean {
    return this.nameID.localeCompare(other.nameID) === 0;
  }
}
