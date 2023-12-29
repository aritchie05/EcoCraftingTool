import {AfterContentInit, Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {CraftingDataService} from '../service/crafting-data.service';
import {Recipe} from '../interface/recipe';
import {OutputDisplay} from '../interface/output-display';
import {Locale, LocaleService} from '../service/locale.service';
import {MessageService} from '../service/message.service';
import {CookieService} from 'ngx-cookie-service';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {Item} from '../interface/item';
import {RecipeModalComponent} from '../recipe-modal/recipe-modal.component';

export const ITEM_SPRITE_SIZE = 32;

@Component({
  selector: 'app-outputs',
  templateUrl: './outputs.component.html',
  styleUrls: ['./outputs.component.css']
})
export class OutputsComponent implements OnInit, AfterContentInit {

  outputRecipes: Recipe[];
  filteredRecipes: Recipe[];
  outputDisplays: OutputDisplay[];
  locale: Locale;

  @Input() imageBaseUrl: string;
  @Input() imageTemplateUrl: string;
  @Input() performanceModeEnabled: boolean;

  @Output() calculatePricesEvent = new EventEmitter();
  @Output() recipeAddedEvent = new EventEmitter<Recipe>();
  @Output() itemRemovedEvent = new EventEmitter<Recipe[]>();
  @Output() subRecipeRemovedEvent = new EventEmitter<Recipe>();
  @Output() recipeModalOpenedEvent = new EventEmitter<RecipeModalComponent>();

  constructor(private dataService: CraftingDataService, private localeService: LocaleService,
              private messageService: MessageService, private cookieService: CookieService,
              @Inject(LOCAL_STORAGE) private storageService: StorageService) {
    this.outputRecipes = [];
    this.outputDisplays = [];
    this.locale = localeService.selectedLocale;
  }

  ngOnInit(): void {

  }

  ngAfterContentInit(): void {
    let storedRecipes = this.storageService.get('recipes');
    if (storedRecipes != null) {
      storedRecipes.forEach(storedRecipe => {
        let recipe = this.dataService.getRecipeById(storedRecipe.id);
        recipe.price = Number.parseFloat(storedRecipe.pr);
        if (storedRecipe.hasOwnProperty('bp')) {
          recipe.basePrice = Number.parseFloat(storedRecipe.bp);
        } else {
          let profitStored = this.storageService.get('profitPercent');
          if (profitStored != null) {
            let profitPercent = Number.parseFloat(profitStored) / 100;
            recipe.basePrice = recipe.price / (1 + profitPercent);
          } else {
            let profitPercent = Number.parseFloat(this.cookieService.get('profitPercent')) / 100;
            recipe.basePrice = recipe.price / (1 + profitPercent);
          }
        }

        this.outputRecipes.push(recipe);
      });
      this.convertRecipesToOutputDisplays();
    }

    this.refreshFilteredRecipes();
  }

  refreshFilteredRecipes(): void {
    this.filteredRecipes = this.dataService.getRecipes();
  }

  message(id: string): string {
    return this.messageService.getMessage(id, this.locale);
  }

  convertRecipesToOutputDisplays(): void {
    //Clear the contents of the array
    this.outputDisplays = [];

    //Loop through recipes and populate data
    this.outputRecipes.forEach(recipe => {

      //Only show the recipe if it is not hidden
      if (!recipe.hidden) {
        //Check if the outputDisplays already contains at least one of the primary output item
        let exists = this.outputDisplays.some(outputDisplay => {
            if (outputDisplay.itemNameID.localeCompare(recipe.primaryOutput.item.nameID) === 0) {
              outputDisplay.subRecipes.push({
                recipeNameID: recipe.nameID,
                recipeName: recipe.name,
                recipePrice: recipe.price,
                recipe: recipe
              });
              return true;
            }
            return false;
          }
        );

        if (!exists) {
          //Output displays doesn't contain this output item, create a new element
          this.outputDisplays.push({
            itemName: recipe.primaryOutput.item.name,
            itemNameID: recipe.primaryOutput.item.nameID,
            itemPrice: recipe.price,
            subRecipes: [{
              recipeNameID: recipe.nameID,
              recipeName: recipe.name,
              recipePrice: recipe.price,
              recipe: recipe
            }],
            imageFile: recipe.primaryOutput.item.imageFile,
            xPos: recipe.primaryOutput.item.xPos,
            yPos: recipe.primaryOutput.item.yPos,
            filter: recipe.primaryOutput.item.filter
          });
        }
      }
    });

    //Check each output display to calculate the cheapest recipe and set that as the overall price
    this.outputDisplays.forEach(outputDisplay => {

      let cheapestPrice = Number.MAX_VALUE;

      //Multiple recipes create this item as primary output
      if (outputDisplay.subRecipes.length > 1) {
        outputDisplay.subRecipes.forEach(subRecipe => {
          if (subRecipe.recipePrice < cheapestPrice) {
            cheapestPrice = subRecipe.recipePrice;
          }
        });

        outputDisplay.itemPrice = cheapestPrice;
      }

      this.sortOutputDisplaySubRecipes(outputDisplay);
    });

    //Finally sort the array by item name
    this.sortOutputDisplays();
  }

  onRemoveItem(itemNameID: string): void {
    let index = this.outputDisplays.findIndex(outputDisplay => {
      return outputDisplay.itemNameID.localeCompare(itemNameID) === 0;
    });
    this.outputDisplays.splice(index, 1);

    let removedRecipes = new Array<Recipe>();

    //Loop backwards to prevent array reindexing on splice
    for (let i = this.outputRecipes.length - 1; i >= 0; i--) {
      if (this.outputRecipes[i].primaryOutput.item.nameID.localeCompare(itemNameID) === 0) {
        removedRecipes.push(...this.outputRecipes.splice(i, 1));
      }
    }
    this.itemRemovedEvent.emit(removedRecipes);
  }

  onRemoveSubRecipe(recipeNameID: string): void {
    let recipe;
    for (let i = this.outputRecipes.length - 1; i >= 0; i--) {
      if (this.outputRecipes[i].nameID.localeCompare(recipeNameID) === 0) {
        recipe = this.outputRecipes[i];
        this.outputRecipes.splice(i, 1);
        break;
      }
    }

    this.convertRecipesToOutputDisplays();
    this.subRecipeRemovedEvent.emit(recipe);
  }

  sortRecipes(): void {
    this.outputRecipes.sort((a, b) => a.name.localeCompare(b.name, this.locale.code));
  }

  sortOutputDisplays(): void {
    this.outputDisplays.sort((a, b) => a.itemName.localeCompare(b.itemName, this.locale.code));
  }

  sortOutputDisplaySubRecipes(outputDisplay: OutputDisplay): void {
    outputDisplay.subRecipes.sort((a, b) => {
      return a.recipePrice - b.recipePrice;
    });
  }

  onRecipeSearchInput(value: string): void {
    this.filteredRecipes = this.dataService.filterRecipeList(value);
  }

  onRecipeSelect(recipe: Recipe): void {
    let exists = this.outputDisplays.some(outputDisplay => {
      return outputDisplay.subRecipes.some(subRecipe => subRecipe.recipeNameID.localeCompare(recipe.nameID) === 0);
    });
    if (!exists) {
      this.outputRecipes.push(recipe);
      this.convertRecipesToOutputDisplays();
      this.recipeAddedEvent.emit(recipe);
    }
  }

  refreshFilterList(): void {
    this.filteredRecipes = this.dataService.getRecipes();
    document.getElementById('recipeSearchInput').innerText = '';
    document.getElementById('recipeSearchInput').blur();
  }

  outputExists(itemNameID: string): boolean {
    return this.outputRecipes.some(recipe => recipe.primaryOutput.item.nameID.localeCompare(itemNameID) === 0);
  }

  getOutputDisplaySpritePosition(outputDisplay: OutputDisplay): string {
    if (outputDisplay.itemNameID.localeCompare('LightBulbItem') === 0) {
      return '0px 0px'
    }
    return `-${outputDisplay.xPos * ITEM_SPRITE_SIZE}px -${outputDisplay.yPos * ITEM_SPRITE_SIZE}px`;
  }

  getOutputDisplayBackgroundSize(outputDisplay: OutputDisplay): string {
    if (outputDisplay.itemNameID.localeCompare('LightBulbItem') === 0) {
      return '32px'
    } else if ('UI_Icons_Baked_0.png'.localeCompare(outputDisplay.imageFile) === 0) {
      return '2048px';
    }
    return '512px';
  }

  getOutputDisplayFilter(outputDisplay: OutputDisplay): string {
    if (outputDisplay != undefined) {
      return outputDisplay.filter;
    }
    return '';
  }

  getOutputDisplayImageUrl(outputDisplay: OutputDisplay): string {
    if (outputDisplay.itemNameID.localeCompare('LightBulbItem') === 0) {
      return this.imageBaseUrl + 'lightbulb.png';
    }
    return this.imageBaseUrl + outputDisplay.imageFile;
  }

  getItemSpritePosition(item: Item): string {
    return `-${item.xPos * ITEM_SPRITE_SIZE}px -${item.yPos * ITEM_SPRITE_SIZE}px`;
  }

  getItemBackgroundSize(item: Item): string {
    if ('UI_Icons_Baked_0.png'.localeCompare(item.imageFile) === 0) {
      return '2048px';
    }
    return '512px';
  }

  getItemFilter(item: Item): string {
    if (item.filter != undefined) {
      return item.filter;
    }
    return '';
  }

  toggleModal(recipeModal: RecipeModalComponent): void {
    if (recipeModal.showRecipe) {
      recipeModal.closeModal();
    } else {
      this.recipeModalOpenedEvent.emit(recipeModal);
    }
  }

  localize(locale: Locale): void {
    this.locale = locale;
    this.outputRecipes.forEach(recipe => {
      recipe.name = this.localeService.localizeRecipeName(recipe.nameID, locale.langCode());
      recipe.primaryOutput.item.name = this.localeService.localizeItemName(recipe.primaryOutput.item.nameID, locale.langCode());
    });
    this.filteredRecipes.forEach(recipe => {
      recipe.name = this.localeService.localizeRecipeName(recipe.nameID, locale.langCode());
      recipe.ingredients.forEach(ingredient => {
        ingredient.item.name = this.localeService.localizeItemName(ingredient.item.nameID, locale.langCode());
      });
      recipe.outputs.forEach(output => {
        output.item.name = this.localeService.localizeItemName(output.item.nameID, locale.langCode());
      });
    });
    this.convertRecipesToOutputDisplays();
  }

  onCalculatePrices() {
    this.calculatePricesEvent.emit();
  }
}
