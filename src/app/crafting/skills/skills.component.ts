import {ChangeDetectionStrategy, Component, computed, signal, Signal, WritableSignal} from '@angular/core';
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
import {MessageService} from '../../service/message.service';
import {CraftingDataService} from '../../service/crafting-data.service';

@Component({
  selector: 'app-skills',
  imports: [MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent {

  allSkills: Signal<Skill[]>;
  skillSearchTerm: WritableSignal<string> = signal('');
  filteredSkills: Signal<Skill[]>;

  allTables: Signal<CraftingTable[]>;
  tableSearchTerm: WritableSignal<string> = signal('');
  filteredTables: Signal<CraftingTable[]>;

  selectedSkills: Signal<Skill[]>;
  selectedTables: Signal<CraftingTable[]>;

  constructor(private craftingService: CraftingService, private craftingDataService: CraftingDataService,
              protected imageService: ImageService, private messageService: MessageService) {

    this.allSkills = computed(() => {
      const skills = this.craftingDataService.skills().values();
      return Array.from(skills).sort((a, b) => a.name().localeCompare(b.name()));
    });
    this.filteredSkills = computed(() => {
      const term = this.skillSearchTerm().toLowerCase();
      return term.length > 0
        ? this.allSkills().filter(skill => skill.name().toLowerCase().includes(term))
        : this.allSkills();
    });

    this.allTables = computed(() => {
      const tables = this.craftingDataService.tables().values();
      return Array.from(tables).sort((a, b) => a.name().localeCompare(b.name()));
    });
    this.filteredTables = computed(() => {
      const term = this.tableSearchTerm().toLowerCase();
      return term.length > 0
        ? this.allTables().filter(table => table.name().toLowerCase().includes(term))
        : this.allTables();
    });

    this.selectedSkills = this.craftingService.selectedSkills;
    this.selectedTables = this.craftingService.selectedTables;
  }

  message(id: string): string {
    return this.messageService.getMessage(id);
  }

  onSkillInput(value: string) {
    this.skillSearchTerm.set(value);
  }

  onSkillSelected(option: MatOption, input: HTMLInputElement) {
    option.deselect(false);
    input.value = '';
    document.body.focus();
    const skill: Skill = option.value;
    void this.craftingService.selectSkill(skill);

    setTimeout(() => {
      this.skillSearchTerm.set('');
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
    this.tableSearchTerm.set(value);
  }

  onTableSelected(option: MatOption, input: HTMLInputElement) {
    option.deselect(false);
    input.value = '';
    const table: CraftingTable = option.value;
    void this.craftingService.selectTable(table);

    setTimeout(() => {
      this.tableSearchTerm.set('');
    }, 100);
  }

  onTableUpgradeChange(index: number, value: UpgradeModule) {
    this.craftingService.updateSelectedUpgrade(index, value);
  }

  onRemoveTable(index: number) {
    void this.craftingService.removeTableByIndex(index);
  }
}
