import {craftingTables} from '../crafting-tables';
import {skills} from '../skills';
import {items} from '../items';
import {CraftingTable} from '../../../app/interface/crafting-table';
import {Skill} from '../../../app/interface/skill';
import {Item} from '../../../app/interface/item';

export function getCraftingTableByNameID(nameID: string): CraftingTable {
  return craftingTables.find(table => table.nameID.localeCompare(nameID) === 0);
}

export function getSkillByNameID(nameID: string): Skill {
  return skills.find(skill => skill.nameID.localeCompare(nameID) === 0);
}

export function getItemByNameID(nameID: string): Item {
  return items.find(item => item.nameID.localeCompare(nameID) === 0);
}
