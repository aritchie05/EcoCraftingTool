import {Component} from '@angular/core';
import {SkillService} from './data/skill.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EcoCraftingTool';
  skills = this.skillService.getSkills();

  constructor(private skillService: SkillService) {
  }

}
