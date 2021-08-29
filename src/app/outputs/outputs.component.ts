import {AfterContentInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CraftingDataService} from '../service/crafting-data.service';
import {Recipe} from '../interface/recipe';
import {OutputDisplay, SubRecipe} from '../interface/output-display';
import {Locale, LocaleService} from '../service/locale.service';
import {MessageService} from '../service/message.service';
import {CookieService} from 'ngx-cookie-service';
import {OutputCookie} from '../cookie/output-cookie';

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

  @Output() recipeAddedEvent = new EventEmitter<Recipe>();
  @Output() itemRemovedEvent = new EventEmitter<Recipe[]>();
  @Output() subRecipeRemovedEvent = new EventEmitter<Recipe>();

  constructor(private dataService: CraftingDataService, private localeService: LocaleService,
              private messageService: MessageService, private cookieService: CookieService) {
    this.outputRecipes = [];
    this.outputDisplays = [];
    this.locale = localeService.selectedLocale;
  }

  ngOnInit(): void {
    if (this.cookieService.check('recipes')) {
      let outputsCookies: OutputCookie[] = JSON.parse(atob(this.cookieService.get('recipes')));
      outputsCookies.forEach(cookie => {
        let recipe = this.dataService.getRecipes().find(recipe => recipe.nameID.localeCompare(cookie.id) === 0);
        recipe.price = Number.parseFloat(cookie.pr);
        this.outputRecipes.push(recipe);
      });
      this.convertRecipesToOutputDisplays();
    }
  }

  ngAfterContentInit(): void {
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

      //Check if the outputDisplays already contains at least one of the primary output item
      let exists = this.outputDisplays.some(outputDisplay => {
          if (outputDisplay.itemNameID.localeCompare(recipe.primaryOutput.item.nameID) === 0) {
            outputDisplay.subRecipes.push({
              recipeNameID: recipe.nameID,
              recipeName: recipe.name,
              recipePrice: recipe.price
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
            recipePrice: recipe.price
          }]
        });
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

  onRemoveSubRecipe(subRecipe: SubRecipe): void {
    let recipe;
    for (let i = this.outputRecipes.length - 1; i >= 0; i--) {
      if (this.outputRecipes[i].nameID.localeCompare(subRecipe.recipeNameID) === 0) {
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
}
