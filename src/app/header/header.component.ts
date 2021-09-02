import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Locale, LocaleService} from '../service/locale.service';
import {MessageService} from '../service/message.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  locale: Locale;
  locales: Locale[];
  expensiveEndgameCostChecked: boolean;
  resourceCostMultiplier: number;

  @Output() updateLocaleEvent = new EventEmitter<Locale>();
  @Output() updateExpensiveEndgameCostEvent = new EventEmitter<boolean>();
  @Output() updateResourceCostMultiplierEvent = new EventEmitter<number>();


  constructor(private localeService: LocaleService, private messageService: MessageService, private cookieService: CookieService) {
    this.locale = localeService.selectedLocale;
    this.locales = localeService.supportedLocales;
    this.expensiveEndgameCostChecked = false;
    this.resourceCostMultiplier = 1;
  }

  ngOnInit(): void {
    if (this.cookieService.check('expensiveEndgameCost')) {
      this.expensiveEndgameCostChecked = this.cookieService.get('expensiveEndgameCost') === 'true';
    }
    if (this.cookieService.check('resourceCostMultiplier')) {
      this.resourceCostMultiplier = Number.parseFloat(this.cookieService.get('resourceCostMultiplier'));
    }
  }

  saveDataToCookies(): void {
    let expDays = 60;

    this.cookieService.set('expensiveEndgameCost', '' + this.expensiveEndgameCostChecked, expDays);
    this.cookieService.set('resourceCostMultiplier', this.resourceCostMultiplier.toFixed(2), expDays);
  }

  message(id: string): string {
    return this.messageService.getMessage(id, this.locale);
  }

  onLocaleSelect(locale: Locale): void {
    if (locale.code.localeCompare(this.localeService.selectedLocale.code) !== 0) {
      this.locale = locale;
      this.localeService.selectedLocale = locale;
      this.updateLocaleEvent.emit(locale);
    }
  }

  onEndgameCostChange(input: boolean): void {
    this.expensiveEndgameCostChecked = input;
    this.updateExpensiveEndgameCostEvent.emit(input);
    this.saveDataToCookies();
  }

  onResourceCostMultiplierChange(input: string): void {
    let newValue = this.toFloat(input);

    if (!isNaN(newValue)) {
      this.resourceCostMultiplier = newValue;
      this.updateResourceCostMultiplierEvent.emit(newValue);
      this.saveDataToCookies();
    }
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
