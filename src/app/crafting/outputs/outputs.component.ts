import {ChangeDetectionStrategy, Component, computed, inject, Signal} from '@angular/core';
import {Recipe} from '../../model/recipe';
import {CraftingService} from '../../service/crafting.service';
import {OutputDisplay, SubRecipe} from '../../model/output-display';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ImageService} from '../../service/image.service';
import {LocaleService} from '../../service/locale.service';
import {MatOption, MatOptionModule} from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {recipes} from '../../../assets/data/recipes';
import {MatDialog} from '@angular/material/dialog';
import {RecipeDialogComponent} from '../recipe-dialog/recipe-dialog.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIcon} from '@angular/material/icon';
import {Skill} from '../../model/skill';

@Component({
  selector: 'app-outputs',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatIcon
  ],
  templateUrl: './outputs.component.html',
  styleUrl: './outputs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OutputsComponent {

  allRecipes: Recipe[];
  filteredRecipes: Recipe[];

  dialog = inject(MatDialog);

  outputDisplays: Signal<OutputDisplay[]>;
  defaultProfitPercent: Signal<number>;
  groupedOutputDisplays: Signal<Map<Skill, OutputDisplay[]>>;
  groupedDisplayKeys: Signal<Skill[]>;

  constructor(private craftingService: CraftingService, protected imageService: ImageService,
              protected localeService: LocaleService) {
    this.allRecipes = Array.from(recipes.values());
    this.filteredRecipes = this.allRecipes;
    this.outputDisplays = craftingService.outputDisplays;
    this.defaultProfitPercent = craftingService.defaultProfitPercent;
    this.groupedOutputDisplays = computed(() => {
      const map = new Map<Skill, OutputDisplay[]>();
      this.outputDisplays().forEach(outputDisplay => {
        const skill = outputDisplay.subRecipes[0].recipe.skill;
        if (!map.has(skill)) {
          map.set(skill, []);
        }
        map.get(skill)?.push(outputDisplay);
      });

      return map;
    });

    this.groupedDisplayKeys = computed(() => {
      return Array.from(this.groupedOutputDisplays().keys());
    });
  }

  onRecipeInput(value: string) {
    value = value.toLowerCase();
    if (value.length > 0) {
      this.filteredRecipes = this.allRecipes.filter(recipe => recipe.name().toLowerCase().includes(value));
    } else {
      this.filteredRecipes = this.allRecipes;
    }
  }


  onRecipeSelected(option: MatOption, input: HTMLInputElement) {
    option.deselect(false);
    input.value = '';
    document.body.focus();
    const recipe: Recipe = option.value;
    setTimeout(() => {
      this.craftingService.selectRecipe(recipe);
    });

    setTimeout(() => {
      this.filteredRecipes = this.allRecipes;
    }, 100);
  }

  onRemoveOutput(outputIndex: number) {
    setTimeout(() => {
      this.craftingService.removeOutput(outputIndex);
    });
  }

  onRemoveSubRecipe(outputIndex: number, subIndex: number) {
    setTimeout(() => {
      this.craftingService.removeSubRecipe(outputIndex, subIndex);
    });
  }

  onRecipeInfoClick(subRecipe: SubRecipe) {
    const recipe = recipes.get(subRecipe.recipeNameID) as Recipe;
    this.dialog.open(RecipeDialogComponent, {
      data: {
        recipe: recipe
      }
    });
  }

  onRemoveSkill(skill: Skill) {
    this.craftingService.removeSkill(skill);
  }

  onProfitOverrideChange(value: string, outputDisplay: OutputDisplay) {
    let number = Number.parseFloat(value);
    if (isNaN(number)) {
      number = -1;
    }

    this.craftingService.updateProfitPercent(number, outputDisplay);
  }
}
