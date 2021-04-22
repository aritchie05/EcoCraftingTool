import {Injectable} from '@angular/core';
import {Skill} from '../interface/skill';
import storedSkills from '../../assets/data/skills.json';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  skills: Array<Skill>;

  constructor() {
    this.skills = storedSkills;
  }

  public getSkills(): Array<Skill> {
    return this.skills;
  }

  public getSkillByName(name: string): Skill {
    return this.skills.find(skill => skill.name.localeCompare(name, undefined, {sensitivity: 'base'}) === 0);
  }

  public filterSkillList(searchQuery: string): Array<Skill> {
    return this.skills.filter(skill => skill.name.toUpperCase().includes(searchQuery.toUpperCase()));
  }
}
