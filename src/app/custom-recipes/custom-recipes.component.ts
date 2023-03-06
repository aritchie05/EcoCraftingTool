import {Component, Inject, OnInit} from '@angular/core';
import {CraftingDataService} from '../service/crafting-data.service';
import {Locale, LocaleService} from '../service/locale.service';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {MessageService} from '../service/message.service';
import {Recipe} from '../interface/recipe';
import {ImageService} from '../service/image.service';
import {ITEM_SPRITE_SIZE} from '../outputs/outputs.component';

@Component({
  selector: 'app-custom-recipes',
  templateUrl: './custom-recipes.component.html',
  styleUrls: ['./custom-recipes.component.css']
})
export class CustomRecipesComponent implements OnInit {

  private locale: Locale;
  filteredRecipes: Recipe[];
  selectedRecipe: Recipe;

  constructor(private dataService: CraftingDataService, private localeService: LocaleService, private messageService: MessageService,
              private imageService: ImageService, @Inject(LOCAL_STORAGE) private storageService: StorageService) {
    this.locale = localeService.selectedLocale;
  }

  ngOnInit(): void {
    this.filteredRecipes = this.dataService.getRecipes();
  }

  onRecipeSearchInput(value: string): void {
    this.filteredRecipes = this.dataService.filterRecipeList(value);
  }

  onRecipeSelect(recipe: Recipe): void {
    this.selectedRecipe = recipe;
  }

  message(id: string): string {
    return this.messageService.getMessage(id, this.locale);
  }

}
