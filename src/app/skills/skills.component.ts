import {AfterContentInit, Component, EventEmitter, Output} from '@angular/core';
import {CraftingDataService} from '../service/crafting-data.service';
import {Skill} from '../interface/skill';
import {CraftingTable} from '../interface/crafting-table';
import {UpgradeModule} from '../interface/upgrade-module';
import {Locale, LocaleService} from '../service/locale.service';
import {MessageService} from '../service/message.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements AfterContentInit {

  filteredSkills: Skill[];
  selectedSkills: Skill[];
  craftingTables: CraftingTable[];
  locale: Locale;

  @Output() skillAddedEvent = new EventEmitter<Skill>();
  @Output() skillLevelChangedEvent = new EventEmitter<Skill>();
  @Output() skillRemovedEvent = new EventEmitter<Skill>();
  @Output() upgradeChangedEvent = new EventEmitter<CraftingTable>();
  @Output() tableRemovedEvent = new EventEmitter<CraftingTable>();
  @Output() lavishUpdatedEvent = new EventEmitter<Skill>();

  constructor(private dataService: CraftingDataService, private localeService: LocaleService, private messageService: MessageService) {
    this.selectedSkills = [];
    this.craftingTables = [];
    this.locale = localeService.selectedLocale;
  }

  message(id: string): string {
    return this.messageService.getMessage(id, this.locale);
  }

  ngAfterContentInit(): void {
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
    if (this.selectedSkills.find(s => s.nameID.localeCompare(skill.nameID) === 0) === undefined) {
      console.log(`Skill not found in existing list, pushing ${skill.name}`);
      skill.level = 1;
      skill.lavishChecked = false;
      let newTables = this.dataService.getCraftingTablesForSkill(skill);
      newTables.forEach(table => {
        table.availableUpgrades = this.dataService.getUpgradeModulesForTable(table);
        table.selectedUpgrade = table.availableUpgrades.find(upgrade => upgrade.nameID.match('NoUpgrade'));
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
      const index = this.selectedSkills.findIndex(s => s.nameID.localeCompare(skill.nameID) === 0);
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
    const index = this.selectedSkills.findIndex(s => s.nameID.localeCompare(skill.nameID) === 0);
    if (index !== -1) {
      let removedSkills = this.selectedSkills.splice(index, 1);
      removedSkills.forEach(removedSkill => this.skillRemovedEvent.emit(removedSkill));
    }
  }

  onUpgradeSelect(table: CraftingTable, upgrade: UpgradeModule): void {
    if (table.selectedUpgrade.nameID.localeCompare(upgrade.nameID) !== 0) {
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

  localize(locale: Locale): void {
    this.locale = locale;
    this.selectedSkills.forEach(skill => skill.name = this.localeService.localizeSkillName(skill.nameID, locale.langCode()));
    this.filteredSkills.forEach(skill => skill.name = this.localeService.localizeSkillName(skill.nameID, locale.langCode()));
    this.craftingTables.forEach(table => {
      table.name = this.localeService.localizeCraftingTableName(table.nameID, locale.langCode());
      table.availableUpgrades.forEach(upgrade => upgrade.name = this.localeService.localizeUpgradeName(upgrade.nameID, locale.langCode()));
      table.selectedUpgrade.name = this.localeService.localizeUpgradeName(table.selectedUpgrade.nameID, locale.langCode());
    });
  }
}
