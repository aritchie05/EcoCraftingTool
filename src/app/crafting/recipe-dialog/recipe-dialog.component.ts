import {ChangeDetectionStrategy, Component, inject, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {Recipe} from '../../model/recipe';
import {ImageService} from '../../service/image.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {CraftingService} from '../../service/crafting.service';
import {MatTooltip} from '@angular/material/tooltip';
import {MessageService} from '../../service/message.service';
import {LocaleService} from '../../service/locale.service';

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
              protected imageService: ImageService, protected craftingService: CraftingService,
              private messageService: MessageService, private localeService: LocaleService) {
    this.recipe = data.recipe;
  }

  message(id: string): string {
    return this.messageService.getMessage(id);
  }

  formatNumber(value: number): string {
    return value.toLocaleString(this.localeService.selectedLocale().code, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0
    });
  }

  close() {
    this.dialogRef.close();
  }
}
