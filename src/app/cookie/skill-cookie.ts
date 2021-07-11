import {Skill} from '../interface/skill';

export class SkillCookie {
  id: string;
  lvl: number;
  lav: boolean;

  constructor(skill: Skill) {
    this.id = skill.nameID;
    this.lvl = skill.level;
    this.lav = skill.lavishChecked;
  }
}
