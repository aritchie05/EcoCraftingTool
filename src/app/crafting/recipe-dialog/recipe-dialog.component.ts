import {ChangeDetectionStrategy, Component, inject, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {Recipe} from '../../model/recipe';
import {ImageService} from '../../service/image.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {CraftingService} from '../../service/crafting.service';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-recipe-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltip
  ],
  templateUrl: './recipe-dialog.component.html',
  styleUrl: './recipe-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDialogComponent {
  dialogRef = inject(MatDialogRef<RecipeDialogComponent>);
  recipe: Recipe;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { recipe: Recipe },
              protected imageService: ImageService, protected craftingService: CraftingService) {
    this.recipe = data.recipe;
  }

  close() {
    this.dialogRef.close();
  }
}
