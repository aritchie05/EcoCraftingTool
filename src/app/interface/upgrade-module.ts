import {SetItem} from './actual-set';

export class UpgradeModule implements SetItem<UpgradeModule> {
  name: string;
  nameID: string;
  modifier: number;

  public equals(other: UpgradeModule): boolean {
    return this.nameID.localeCompare(other.nameID) === 0;
  }
}
