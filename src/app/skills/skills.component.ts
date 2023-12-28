import {AfterContentInit, Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {CraftingDataService} from '../service/crafting-data.service';
import {Skill} from '../interface/skill';
import {CraftingTable} from '../interface/crafting-table';
import {UpgradeModule} from '../interface/upgrade-module';
import {Locale, LocaleService} from '../service/locale.service';
import {MessageService} from '../service/message.service';
import {CookieService} from 'ngx-cookie-service';
import {SkillCookie} from '../cookie/skill-cookie';
import {TableCookie} from '../cookie/table-cookie';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';

export const SKILL_SPRITE_SIZE = 32;
export const TABLE_SPRITE_SIZE = 32;

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit, AfterContentInit {

  filteredSkills: Skill[];
  selectedSkills: Skill[];
  filteredTables: CraftingTable[];
  craftingTables: CraftingTable[];
  locale: Locale;

  @Input() imageBaseUrl: string;
  @Input() imageTemplateUrl: string;
  skillsSpriteImage: string = 'skill-icons-sprite.png';

  @Output() skillAddedEvent = new EventEmitter<Skill>();
  @Output() skillLevelChangedEvent = new EventEmitter<Skill>();
  @Output() skillRemovedEvent = new EventEmitter<Skill>();
  @Output() upgradeChangedEvent = new EventEmitter<CraftingTable>();
  @Output() tableAddedEvent = new EventEmitter<CraftingTable>();
  @Output() tableRemovedEvent = new EventEmitter<CraftingTable>();
  @Output() lavishUpdatedEvent = new EventEmitter<Skill>();

  constructor(private dataService: CraftingDataService, private localeService: LocaleService,
              private messageService: MessageService, private cookieService: CookieService,
              @Inject(LOCAL_STORAGE) private storageService: StorageService) {
    this.selectedSkills = [];
    this.craftingTables = [];
    this.locale = localeService.selectedLocale;
  }

  ngOnInit(): void {
    let skills = this.storageService.get('skills');
    if (skills != null) {
      skills.forEach(sk => {
        let skill = this.dataService.getSkills().find(skill => skill.nameID.localeCompare(sk.id) === 0);
        skill.level = sk.lvl;
        skill.lavishChecked = sk.lav;
        this.selectedSkills.push(skill);
      });
    }

    let tables = this.storageService.get('tables');
    if (tables != null) {
      tables.forEach(tb => {
        let table = this.dataService.getCraftingTables().find(table => table.nameID.localeCompare(tb.id) === 0);
        table.availableUpgrades = this.dataService.getUpgradeModulesForTable(table);
        table.selectedUpgrade = table.availableUpgrades.find(upgrade => upgrade.nameID.localeCompare(tb.up) === 0);
        this.craftingTables.push(table);
      });
    }
  }

  ngAfterContentInit(): void {
    this.filteredSkills = this.dataService.getSkills();
    this.filteredTables = this.dataService.getCraftingTables();
    /*
    this.dataService.responseStatus.subscribe((resp) => {
      this.filteredSkills = resp.skills;
    });
    */
  }

  message(id: string): string {
    return this.messageService.getMessage(id, this.locale);
  }

  onSkillsSearchInput(value: string): void {
    this.filteredSkills = this.dataService.filterSkillList(value);
  }

  onSkillSelect(skill: Skill): void {
    if (this.selectedSkills.find(s => s.nameID.localeCompare(skill.nameID) === 0) === undefined) {
      if (this.skillLevelIsReadOnly(skill)) {
        skill.level = 0;
      } else {
        skill.level = 1;
      }
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
      const index = this.selectedSkills.findIndex(s => s.nameID.localeCompare(skill.nameID) === 0);
      let newLevel = level;
      if (level < 0) {
        newLevel = 0;
      } else if (level > 7) {
        newLevel = 7;
      }
      skill.level = newLevel;
      this.selectedSkills[index] = skill;
      this.skillLevelChangedEvent.emit(skill);
    }

  }

  onRemoveSkill(skill: Skill): void {
    const index = this.selectedSkills.findIndex(s => s.nameID.localeCompare(skill.nameID) === 0);
    if (index !== -1) {
      let removedSkills = this.selectedSkills.splice(index, 1);
      removedSkills.forEach(removedSkill => this.skillRemovedEvent.emit(removedSkill));
    }
  }

  onTablesSearchInput(value: string): void {
    this.filteredTables = this.dataService.filterTableList(value);
  }

  onTableSelect(table: CraftingTable): void {
    if (!this.craftingTables.some(tbl => tbl.nameID.localeCompare(table.nameID) === 0)) {
      table.availableUpgrades = this.dataService.getUpgradeModulesForTable(table);
      table.selectedUpgrade = table.availableUpgrades.find(upgrade => upgrade.nameID.match('NoUpgrade'));
      let newSkills = this.dataService.getSkillsForCraftingTable(table);

      //Check if any of the table recipes use one of the currently selected skills
      if (!newSkills.some(skill => this.selectedSkills.some(sk => sk.nameID.localeCompare(skill.nameID) === 0))) {
        //If not, add all skills
        this.selectedSkills.push(...newSkills);
      }
      this.craftingTables.push(table);
      this.tableAddedEvent.emit(table);
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

  getSkillImageUrl(skill: Skill): string {
    return this.imageBaseUrl + this.skillsSpriteImage;
  }

  skillLevelIsReadOnly(skill: Skill): boolean {
    return skill.nameID.localeCompare('NoSkill') === 0;
  }

  /**
   * Gets the sprite position of the skill icon image based on the skill provided
   * @param skill the skill to use the xPos and yPos
   */
  getSpritePosition(skill: Skill): string {
    return `-${skill.xPos * SKILL_SPRITE_SIZE}px -${skill.yPos * SKILL_SPRITE_SIZE}px`;
  }

  getTableSpritePosition(table: CraftingTable): string {
    return `-${table.xPos * TABLE_SPRITE_SIZE}px -${table.yPos * TABLE_SPRITE_SIZE}px`;
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
