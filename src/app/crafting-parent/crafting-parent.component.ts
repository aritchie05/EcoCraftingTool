import {Component, OnInit, ViewChild} from '@angular/core';
import {SkillsComponent} from '../skills/skills.component';
import {IngredientsComponent} from '../ingredients/ingredients.component';
import {OutputsComponent} from '../outputs/outputs.component';
import {CraftingDataService} from '../service/crafting-data.service';
import {Skill} from '../interface/skill';

@Component({
  selector: 'app-crafting-parent',
  templateUrl: './crafting-parent.component.html',
  styleUrls: ['./crafting-parent.component.css'],
  providers: [CraftingDataService]
})
export class CraftingParentComponent implements OnInit {

  @ViewChild(SkillsComponent)
  private skillsComponent: SkillsComponent;

  @ViewChild(IngredientsComponent)
  private ingredientsComponent: IngredientsComponent;

  @ViewChild(OutputsComponent)
  private outputsComponent: OutputsComponent;

  constructor(private dataService: CraftingDataService) {
  }

  ngOnInit(): void {
    this.dataService.responseStatus.subscribe((resp) => {
      this.skillsComponent.filteredSkills = resp.skills;
    });
  }


  onSkillAdded(skill: Skill) {
    let itemIngredients = this.dataService.getUniqueItemIngredientsForSkills([skill], false);
    itemIngredients.forEach(item => {

      let exists = false;
      this.ingredientsComponent.itemIngredients.forEach(ingredient => {
        if (ingredient.nameID.localeCompare(item.nameID) === 0) {
          exists = true;
        }
      });
      if (!exists) {
        console.log(`Adding item ${item.name}`);
        this.ingredientsComponent.itemIngredients.push(item);
      }
    });

    let recipes = this.dataService.getRecipesForSkills([skill], false);
    recipes.forEach(recipe => {
      let exists = false;
      this.outputsComponent.recipes.forEach(recipe2 => {
        if (recipe.nameID.localeCompare(recipe2.nameID) === 0) {
          exists = true;
        }
      });
      if (!exists) {
        console.log(`Adding recipe ${recipe.name}`);
        this.outputsComponent.recipes.push(recipe);
      }
    });
  }


  onSkillLevelChanged(skill: Skill) {

  }

  onSkillRemoved(skill: Skill) {

  }
}
