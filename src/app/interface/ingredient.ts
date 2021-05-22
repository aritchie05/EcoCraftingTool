import {Item} from './item';

export class Ingredient {
  item: Item;
  quantity: number;
  reducible: boolean;
  price?: number;
}
