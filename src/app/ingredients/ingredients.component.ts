import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {CraftingDataService} from '../service/crafting-data.service';
import {Item} from '../interface/item';
import {Locale, LocaleService} from '../service/locale.service';
import {MessageService} from '../service/message.service';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {ImageService} from '../service/image.service';

export const ITEM_SPRITE_SIZE = 32;

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  itemIngredients: Item[];
  laborCost: number;
  profitPercent: number;
  locale: Locale;

  @Input() imageBaseUrl: string;
  @Input() imageTemplateUrl: string;

  @Output() ingredientPriceChangedEvent = new EventEmitter<Item>();
  @Output() laborCostChangedEvent = new EventEmitter<number>();
  @Output() profitPercentChangedEvent = new EventEmitter<number>();

  constructor(public imageService: ImageService, private dataService: CraftingDataService, private localeService: LocaleService,
              private messageService: MessageService, @Inject(LOCAL_STORAGE) private storageService: StorageService) {
    this.itemIngredients = [];
    this.laborCost = 0;
    this.profitPercent = 0;
    this.locale = localeService.selectedLocale;
  }

  ngOnInit(): void {

    let ingredients = this.storageService.get('ingredients');
    if (ingredients != null) {
      ingredients.forEach(ing => {
        let item = this.dataService.getItems().find(item => item.nameID.localeCompare(ing.id) === 0);
        item.price = ing.pr;
        this.itemIngredients.push(item);
      });
    }

    let laborCost = this.storageService.get('laborCost');
    if (laborCost != null) {
      this.laborCost = Number.parseFloat(laborCost);
    }

    let profit = this.storageService.get('profitPercent');
    if (profit != null) {
      this.profitPercent = Number.parseFloat(profit);
    }
  }

  message(id: string): string {
    return this.messageService.getMessage(id, this.locale);
  }

  onPriceChange(item: Item, value: string) {
    let price = this.toFloat(value);
    if (price !== item.price && !isNaN(price)) {
      item.price = price;
      this.ingredientPriceChangedEvent.emit(item);
    }
  }

  onLaborCostChange(value: string): void {
    let newValue = this.toFloat(value);

    if (!isNaN(newValue)) {
      this.laborCost = newValue;
      this.laborCostChangedEvent.emit(this.laborCost);
    }
  }

  onProfitPercentChange(value: string): void {
    let newValue = this.toFloat(value);

    if (!isNaN(newValue)) {
      this.profitPercent = newValue;
      this.profitPercentChangedEvent.emit(this.profitPercent);
    }
  }

  ingredientExists(nameID: string): boolean {
    return this.itemIngredients.some(ing => ing.nameID.localeCompare(nameID) === 0);
  }

  sortIngredients() {
    this.itemIngredients.sort((a, b) => a.name.localeCompare(b.name, this.locale.code));
  }

  localize(locale: Locale) {
    this.locale = locale;
    this.itemIngredients.forEach(item => item.name = this.localeService.localizeItemName(item.name, item.nameID, locale.langCode()));
    this.sortIngredients();
  }

  toFloat(input: string) {
    const delimiterRegex = /[0-9,.]*([,.])[0-9]*/;
    const delim = input.match(delimiterRegex);
    if (delim) {
      if (delim[1] == ',') {
        input = input.replace('.', '').replace(',', '.');
      } else if (delim[1] == '.') {
        input = input.replace(',', '');
      }
    }
    return parseFloat(input);
  }
}
