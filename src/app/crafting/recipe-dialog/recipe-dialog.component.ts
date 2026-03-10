import {ChangeDetectionStrategy, Component, computed, inject, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {Recipe} from '../../model/recipe';
import {ImageService} from '../../service/image.service';
import {CraftingService} from '../../service/crafting.service';
import {MatTooltip} from '@angular/material/tooltip';
import {MessageService} from '../../service/message.service';
import {LocaleService} from '../../service/locale.service';
import {LocaleNumberPipe} from '../../pipe/locale-number.pipe';

@Component({
  selector: 'app-recipe-dialog',
  imports: [
    MatDialogModule,
    MatTooltip,
    LocaleNumberPipe
  ],
  templateUrl: './recipe-dialog.component.html',
  styleUrl: './recipe-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDialogComponent {
  dialogRef = inject(MatDialogRef<RecipeDialogComponent>);
  recipe: Recipe;
  localeCode = computed(() => this.localeService.selectedLocale().code);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { recipe: Recipe },
              protected imageService: ImageService, protected craftingService: CraftingService,
              private messageService: MessageService, private localeService: LocaleService) {
    this.recipe = data.recipe;
  }

  message(id: string): string {
    return this.messageService.getMessage(id);
  }

  close() {
    this.dialogRef.close();
  }
}
