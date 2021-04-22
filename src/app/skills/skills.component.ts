import {Component, OnInit} from '@angular/core';
import {SkillService} from '../data/skill.service';
import {Skill} from '../interface/skill';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  filteredSkills: Array<Skill>;
  selectedSkills: Array<Skill>;

  constructor(private skillService: SkillService) {
    this.filteredSkills = this.skillService.skills;
    this.selectedSkills = [];
  }

  ngOnInit(): void {
  }

  onSkillsSearchInput(value: string): void {
    this.filteredSkills = this.skillService.filterSkillList(value);
  }

  onSkillSelect(skill: Skill): void {
    console.log(`Skill selected ${skill.name}`);
    if (this.selectedSkills.find(s => s.name === skill.name) === undefined) {
      console.log(`Skill not found in existing list, pushing ${skill.name}`);
      skill.level = 1;
      this.selectedSkills.push(skill);
    }
  }

  onLevelChange(skill: Skill, event: KeyboardEvent): void {
    // @ts-ignore - resets the active element to the <body> tag to avoid weird behavior with the level input field
    document.activeElement.blur();

    let level = parseInt(event.key, 10);
    if (isNaN(level)) {
      level = 1;
    }
    console.log(`Level changed for skill ${skill.name} to level ${level}`);
    const index = this.selectedSkills.findIndex(s => s.name === skill.name);
    let newLevel = level;
    if (level < 0) {
      newLevel = 0;
    } else if (level > 7) {
      newLevel = 7;
    }
    skill.level = newLevel;
    console.log(`Propagating level ${skill.level} back`);
    this.selectedSkills[index] = skill;
  }

  onRemoveSkill(skill: Skill): void {
    console.log(`Removing skill ${skill.name}`);
    const index = this.selectedSkills.findIndex(s => s.name === skill.name);
    this.selectedSkills.splice(index, 1);
  }
}
