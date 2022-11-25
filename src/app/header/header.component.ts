import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Locale, LocaleService} from '../service/locale.service';
import {MessageService} from '../service/message.service';
import {CookieService} from 'ngx-cookie-service';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';

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

  @Input() imageBaseUrl: string;

  @Output() updateLocaleEvent = new EventEmitter<Locale>();
  @Output() updateExpensiveEndgameCostEvent = new EventEmitter<boolean>();
  @Output() updateResourceCostMultiplierEvent = new EventEmitter<number>();


  constructor(private localeService: LocaleService, private messageService: MessageService, private cookieService: CookieService,
              @Inject(LOCAL_STORAGE) private storageService: StorageService) {
    this.locale = localeService.selectedLocale;
    this.locales = localeService.supportedLocales;
    this.expensiveEndgameCostChecked = false;
    this.resourceCostMultiplier = 1;
  }

  ngOnInit(): void {

    let expensiveEndgame = this.storageService.get('expensiveEndgameCost');
    if (expensiveEndgame != null) {
      this.expensiveEndgameCostChecked = expensiveEndgame === 'true';
    } else if (this.cookieService.check('expensiveEndgameCost')) {
      this.expensiveEndgameCostChecked = this.cookieService.get('expensiveEndgameCost') === 'true';
      this.cookieService.delete('expensiveEndgameCost');
      this.storageService.set('expensiveEndgameCost', '' + this.expensiveEndgameCostChecked);
    }

    let multiplier = this.storageService.get('resourceCostMultiplier');
    if (multiplier != null) {
      this.resourceCostMultiplier = Number.parseFloat(multiplier);
    } else if (this.cookieService.check('resourceCostMultiplier')) {
      this.resourceCostMultiplier = Number.parseFloat(this.cookieService.get('resourceCostMultiplier'));
      this.cookieService.delete('resourceCostMultiplier');
      this.storageService.set('resourceCostMultiplier', this.resourceCostMultiplier.toFixed(2));
    }
  }

  saveDataToLocalStorage(): void {
    this.storageService.set('expensiveEndgameCost', '' + this.expensiveEndgameCostChecked);
    this.storageService.set('resourceCostMultiplier', this.resourceCostMultiplier.toFixed(2));
    this.storageService.set('locale', this.localeService.selectedLocale);
  }

  message(id: string): string {
    return this.messageService.getMessage(id, this.locale);
  }

  onLocaleSelect(locale: Locale): void {
    if (locale.code.localeCompare(this.localeService.selectedLocale.code) !== 0) {
      this.locale = locale;
      this.localeService.selectedLocale = locale;
      this.updateLocaleEvent.emit(locale);
      this.saveDataToLocalStorage();
    }
  }

  onEndgameCostChange(input: boolean): void {
    this.expensiveEndgameCostChecked = input;
    this.updateExpensiveEndgameCostEvent.emit(input);
    this.saveDataToLocalStorage();
  }

  onResourceCostMultiplierChange(input: string): void {
    let newValue = this.toFloat(input);

    if (!isNaN(newValue)) {
      this.resourceCostMultiplier = newValue;
      this.updateResourceCostMultiplierEvent.emit(newValue);
      this.saveDataToLocalStorage();
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
