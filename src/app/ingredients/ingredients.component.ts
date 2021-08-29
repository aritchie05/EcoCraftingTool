import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CraftingDataService} from '../service/crafting-data.service';
import {Item} from '../interface/item';
import {Locale, LocaleService} from '../service/locale.service';
import {MessageService} from '../service/message.service';
import {CookieService} from 'ngx-cookie-service';
import {IngredientCookie} from '../cookie/ingredient-cookie';

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

  @Output() ingredientPriceChangedEvent = new EventEmitter<Item>();
  @Output() laborCostChangedEvent = new EventEmitter<number>();
  @Output() profitPercentChangedEvent = new EventEmitter<number>();

  constructor(private dataService: CraftingDataService, private localeService: LocaleService,
              private messageService: MessageService, private cookieService: CookieService) {
    this.itemIngredients = [];
    this.laborCost = 0;
    this.profitPercent = 0;
    this.locale = localeService.selectedLocale;
  }

  ngOnInit(): void {
    if (this.cookieService.check('ingredients')) {
      let ingredientCookies: IngredientCookie[] = JSON.parse(atob(this.cookieService.get('ingredients')));
      ingredientCookies.forEach(cookie => {
        let item = this.dataService.getItems().find(item => item.nameID.localeCompare(cookie.id) === 0);
        item.price = cookie.pr;
        this.itemIngredients.push(item);
      });
    }
    if (this.cookieService.check('laborCost')) {
      this.laborCost = Number.parseFloat(this.cookieService.get('laborCost'));
    }
  }

  message(id: string): string {
    return this.messageService.getMessage(id, this.locale);
  }

  onPriceChange(item: Item, value: string) {
    let price = this.toFloat(value);
    if (price !== item.price && !isNaN(price)) {
      const index = this.itemIngredients.findIndex(i => i.nameID === item.nameID);
      item.price = price;
      this.itemIngredients[index] = item;
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

  sortIngredients() {
    this.itemIngredients.sort((a, b) => a.name.localeCompare(b.name, this.locale.code));
  }

  localize(locale: Locale) {
    this.locale = locale;
    this.itemIngredients.forEach(item => item.name = this.localeService.localizeItemName(item.nameID, locale.langCode()));
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
