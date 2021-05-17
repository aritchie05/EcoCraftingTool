import {SetItem} from './actual-set';

export class CraftingTable implements SetItem<CraftingTable> {
  name: string;
  nameID: string;
  upgradeModuleType: string;

  public equals(other: CraftingTable): boolean {
    return this.nameID.localeCompare(other.nameID) === 0;
  }

}
