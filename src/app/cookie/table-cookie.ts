import {CraftingTable} from '../interface/crafting-table';

export class TableCookie {
  id: string;

  /**
   * Upgrade id that is selected
   */
  up: string;

  constructor(table: CraftingTable) {
    this.id = table.nameID;
    this.up = table.selectedUpgrade.nameID;
  }
}
