import {SetItem} from './actual-set';

export class Skill implements SetItem<Skill> {
  name: string;
  nameID: string;
  basicUpgrade: boolean;
  advancedUpgrade: boolean;
  modernUpgrade: boolean;
  lavishWorkspace: boolean;
  level?: number;

  public equals(other: Skill): boolean {
    return this.nameID.localeCompare(other.nameID) === 0;
  }
}
