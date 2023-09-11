import {craftingTables} from '../crafting-tables';
import {skills} from '../skills';
import {items} from '../items';
import {CraftingTable} from '../../../app/interface/crafting-table';
import {Skill} from '../../../app/interface/skill';
import {Item} from '../../../app/interface/item';

export function getCraftingTableByNameID(nameID: string): CraftingTable {
  let table = craftingTables.find(table => table.nameID.localeCompare(nameID) === 0);
  if (table === undefined) {
    console.error(`Crafting table ${nameID} not found`);
  }
  return table;
}

export function getSkillByNameID(nameID: string): Skill {
  let skill = skills.find(skill => skill.nameID.localeCompare(nameID) === 0);
  if (skill === undefined) {
    console.error(`Skill ${nameID} not found`);
  }
  return skill;
}

export function getItemByNameID(nameID: string): Item {
  let item = items.find(item => item.nameID.localeCompare(nameID) === 0);
  if (item === undefined) {
    console.error(`Item ${nameID} not found`);
  }
  return item;
}
