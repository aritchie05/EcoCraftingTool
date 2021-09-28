import {Skill} from './skill';
import {CraftingTable} from './crafting-table';
import {Ingredient} from './ingredient';
import {Output} from './output';

export class Recipe {
  name: string;
  nameID: string;
  skill: Skill;
  level: number;
  labor: number;
  craftingTable: CraftingTable;
  ingredients: Ingredient[];
  outputs: Output[];
  hidden: boolean;
  primaryOutput?: Output;

  //Price per primary output without profit
  basePrice?: number;

  //Price PER PRIMARY OUTPUT ITEM
  price?: number;
}
