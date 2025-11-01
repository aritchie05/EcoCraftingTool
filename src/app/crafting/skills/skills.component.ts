import {ChangeDetectionStrategy, Component, OnInit, Signal} from '@angular/core';
import {Skill} from '../../model/skill';
import {MatAutocompleteModule, MatOption} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ImageService} from '../../service/image.service';
import {CraftingTable} from '../../model/crafting-table';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {UpgradeModule} from '../../model/upgrade-module';
import {CraftingService} from '../../service/crafting.service';
import {skills} from '../../../assets/data/skills';
import {tables} from '../../../assets/data/crafting-tables';
import {MessageService} from '../../service/message.service';

@Component({
  selector: 'app-skills',
  imports: [MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent implements OnInit {

  allSkills: Skill[];
  filteredSkills: Skill[];

  allTables: CraftingTable[];
  filteredTables: CraftingTable[];

  selectedSkills: Signal<Skill[]>;
  selectedTables: Signal<CraftingTable[]>;

  constructor(private craftingService: CraftingService, protected imageService: ImageService,
              private messageService: MessageService) {
    this.allSkills = Array.from(skills.values());
    this.filteredSkills = this.allSkills;

    this.allTables = Array.from(tables.values());
    this.filteredTables = this.allTables;

    this.selectedSkills = this.craftingService.selectedSkills;
    this.selectedTables = this.craftingService.selectedTables;
  }

  message(id: string): string {
    return this.messageService.getMessage(id);
  }

  ngOnInit() {

  }

  onSkillInput(value: string) {
    value = value.toLowerCase();
    if (value.length > 0) {
      this.filteredSkills = this.allSkills.filter(skill => skill.name().toLowerCase().includes(value));
    } else {
      this.filteredSkills = this.allSkills;
    }
  }

  onSkillSelected(option: MatOption, input: HTMLInputElement) {
    option.deselect(false);
    input.value = '';
    document.body.focus();
    const skill: Skill = option.value;
    void this.craftingService.selectSkill(skill);

    setTimeout(() => {
      this.filteredSkills = this.allSkills;
    }, 100);
  }

  onSkillLevelChange(index: number, value: string) {
    let number = Number.parseInt(value);
    if (isNaN(number)) {
      number = 0;
    } else {
      number = Math.min(7, Math.max(0, number));
    }

    this.craftingService.updateSkillLevel(number, index);
  }

  onLavishChange(index: number, value: boolean) {
    this.craftingService.updateLavish(value, index);
  }

  onRemoveSkill(index: number) {
    void this.craftingService.removeSkillByIndex(index);
  }

  onTableInput(value: string) {
    value = value.toLowerCase();
    if (value.length > 0) {
      this.filteredTables = this.allTables.filter(table => table.name().toLowerCase().includes(value));
    } else {
      this.filteredTables = this.allTables;
    }
  }

  onTableSelected(option: MatOption, input: HTMLInputElement) {
    option.deselect(false);
    input.value = '';
    const table: CraftingTable = option.value;
    void this.craftingService.selectTable(table);

    setTimeout(() => {
      this.filteredTables = this.allTables;
    }, 100);
  }

  onTableUpgradeChange(index: number, value: UpgradeModule) {
    this.craftingService.updateSelectedUpgrade(index, value);
  }

  onRemoveTable(index: number) {
    void this.craftingService.removeTableByIndex(index);
  }
}
