import {Skill} from './skill';
import {CraftingTable} from './crafting-table';
import {Ingredient} from './ingredient';
import {Output} from './output';
import {SetItem} from './actual-set';

export class Recipe implements SetItem<Recipe> {
  name: string;
  nameID: string;
  skill: Skill;
  level: bigint;
  labor: bigint;
  craftingTable: CraftingTable;
  ingredients: Ingredient[];
  outputs: Output[];
  price?: number;

  public equals(other: Recipe): boolean {
    return this.nameID.localeCompare(other.nameID) === 0;
  }
}
