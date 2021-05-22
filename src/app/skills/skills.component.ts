import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CraftingDataService} from '../service/crafting-data.service';
import {Skill} from '../interface/skill';
import {CraftingTable} from '../interface/crafting-table';
import {UpgradeModule} from '../interface/upgrade-module';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  filteredSkills: Skill[];
  selectedSkills: Skill[];
  craftingTables: CraftingTable[];

  @Output() skillAddedEvent = new EventEmitter<Skill>();
  @Output() skillLevelChangedEvent = new EventEmitter<Skill>();
  @Output() skillRemovedEvent = new EventEmitter<Skill>();
  @Output() upgradeChangedEvent = new EventEmitter<CraftingTable>();
  @Output() tableRemovedEvent = new EventEmitter<CraftingTable>();
  @Output() lavishUpdatedEvent = new EventEmitter<Skill>();

  constructor(private dataService: CraftingDataService) {
    this.selectedSkills = [];
    this.craftingTables = [];
  }

  ngOnInit(): void {
    this.filteredSkills = this.dataService.getSkills();
    /*
    this.dataService.responseStatus.subscribe((resp) => {
      this.filteredSkills = resp.skills;
    });
    */
  }

  onSkillsSearchInput(value: string): void {
    this.filteredSkills = this.dataService.filterSkillList(value);
  }

  onSkillSelect(skill: Skill): void {
    console.log(`Skill selected ${skill.name}`);
    if (this.selectedSkills.find(s => s.nameID === skill.nameID) === undefined) {
      console.log(`Skill not found in existing list, pushing ${skill.name}`);
      skill.level = 1;
      skill.lavishChecked = false;
      let newTables = this.dataService.getCraftingTablesForSkill(skill);
      newTables.forEach(table => {
        table.availableUpgrades = this.dataService.getUpgradeModulesForTable(table);
        table.selectedUpgrade = table.availableUpgrades.find(upgrade => upgrade.name.localeCompare('No Upgrade') === 0);
        if (!this.craftingTables.some(existingTable => existingTable.nameID.localeCompare(table.nameID) === 0)) {
          this.craftingTables.push(table);
        }
      });
      this.selectedSkills.push(skill);
      this.skillAddedEvent.emit(skill);
    }
  }

  onLevelChange(skill: Skill, event: KeyboardEvent): void {
    // @ts-ignore - resets the active element to the <body> tag to avoid weird behavior with the level input field
    document.activeElement.blur();

    let level = parseInt(event.key, 10);
    if (level !== skill.level) {
      if (isNaN(level)) {
        level = 1;
      }
      console.log(`Level changed for skill ${skill.name} to level ${level}`);
      const index = this.selectedSkills.findIndex(s => s.nameID === skill.nameID);
      let newLevel = level;
      if (level < 0) {
        newLevel = 0;
      } else if (level > 7) {
        newLevel = 7;
      }
      skill.level = newLevel;
      console.log(`Propagating level ${skill.level} back`);
      this.selectedSkills[index] = skill;
      this.skillLevelChangedEvent.emit(skill);
    }

  }

  onRemoveSkill(skill: Skill): void {
    console.log(`Removing skill ${skill.name}`);
    const index = this.selectedSkills.findIndex(s => s.nameID === skill.nameID);
    if (index !== -1) {
      let removedSkills = this.selectedSkills.splice(index, 1);
      removedSkills.forEach(removedSkill => this.skillRemovedEvent.emit(removedSkill));
    }
  }

  onUpgradeSelect(table: CraftingTable, upgrade: UpgradeModule): void {
    if (table.selectedUpgrade !== upgrade) {
      table.selectedUpgrade = upgrade;
      this.upgradeChangedEvent.emit(table);
    }
  }

  onRemoveTable(craftingTable: CraftingTable): void {
    const index = this.craftingTables.findIndex(table => table.nameID.localeCompare(craftingTable.nameID) === 0);
    this.craftingTables.splice(index, 1);
    this.tableRemovedEvent.emit(craftingTable);
  }

  onUpdateLavish(skill: Skill, value: boolean): void {
    skill.lavishChecked = value;
    this.lavishUpdatedEvent.emit(skill);
  }
}
