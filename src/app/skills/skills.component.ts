import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CraftingDataService} from '../service/crafting-data.service';
import {Skill} from '../interface/skill';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  filteredSkills: Skill[];
  selectedSkills: Skill[];

  @Output() skillAddedEvent = new EventEmitter<Skill>();
  @Output() skillLevelChangedEvent = new EventEmitter<Skill>();
  @Output() skillRemovedEvent = new EventEmitter<Skill>();

  constructor(private dataService: CraftingDataService) {
    this.selectedSkills = [];
  }

  ngOnInit(): void {
  }

  onSkillsSearchInput(value: string): void {
    this.filteredSkills = this.dataService.filterSkillList(value);
  }

  onSkillSelect(skill: Skill): void {
    console.log(`Skill selected ${skill.name}`);
    if (this.selectedSkills.find(s => s.nameID === skill.nameID) === undefined) {
      console.log(`Skill not found in existing list, pushing ${skill.name}`);
      skill.level = 1;
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
}
