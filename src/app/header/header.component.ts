import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Locale, LocaleService} from '../service/locale.service';
import {MessageService} from '../service/message.service';
import {CookieService} from 'ngx-cookie-service';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {CalculatorConfig} from '../cookie/calculator-config';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  locale: Locale;
  locales: Locale[];
  expensiveEndgameCostChecked: boolean;
  whiteTigerRecipesChecked: boolean;
  resourceCostMultiplier: number;
  performanceModeChecked: boolean;

  @Input() imageBaseUrl: string;
  @Input() exportConfig: CalculatorConfig;

  @Output() updatePerformanceModeEvent = new EventEmitter<boolean>();
  @Output() updateLocaleEvent = new EventEmitter<Locale>();
  @Output() updateExpensiveEndgameCostEvent = new EventEmitter<boolean>();
  @Output() updateWhiteTigerRecipesEvent = new EventEmitter<boolean>();
  @Output() updateResourceCostMultiplierEvent = new EventEmitter<number>();
  @Output() importCalcConfigEvent = new EventEmitter<CalculatorConfig>();
  @Output() exportCalcConfigEvent = new EventEmitter();


  constructor(private localeService: LocaleService, private messageService: MessageService, private cookieService: CookieService,
              @Inject(LOCAL_STORAGE) private storageService: StorageService) {
    this.locale = localeService.selectedLocale;
    this.locales = localeService.supportedLocales;
    this.expensiveEndgameCostChecked = false;
    this.whiteTigerRecipesChecked = false;
    this.resourceCostMultiplier = 1;
    this.performanceModeChecked = true;
  }

  ngOnInit(): void {

    let expensiveEndgame = this.storageService.get('expensiveEndgameCost');
    if (expensiveEndgame != null) {
      this.expensiveEndgameCostChecked = expensiveEndgame === 'true';
    }

    let whiteTigerRecipes = this.storageService.get('whiteTigerRecipes');
    if (whiteTigerRecipes != null) {
      this.whiteTigerRecipesChecked = whiteTigerRecipes === 'true';
    }

    let multiplier = this.storageService.get('resourceCostMultiplier');
    if (multiplier != null) {
      this.resourceCostMultiplier = Number.parseFloat(multiplier);
    }

    let performanceMode = this.storageService.get('performanceMode');
    if (performanceMode != null) {
      this.performanceModeChecked = performanceMode === 'true';
    }
  }

  saveDataToLocalStorage(): void {
    this.storageService.set('performanceMode', '' + this.performanceModeChecked);
    this.storageService.set('expensiveEndgameCost', '' + this.expensiveEndgameCostChecked);
    this.storageService.set('whiteTigerRecipes', '' + this.whiteTigerRecipesChecked);
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

  onWhiteTigerRecipesChange(input: boolean): void {
    this.whiteTigerRecipesChecked = input;
    this.updateWhiteTigerRecipesEvent.emit(input);
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

  onImportConfig(calcConfigJson: string): void {
    try {
      let calcConfig: CalculatorConfig = JSON.parse(calcConfigJson);
      this.importCalcConfigEvent.emit(calcConfig);
    } catch {
      window.alert('Incorrect format for import. Please use valid JSON exported from another configuration of eco calc.')
    }
  }

  selectAllText(exportBox: HTMLTextAreaElement) {
    exportBox.setSelectionRange(0, exportBox.value.length);
  }

  onPerformanceModeChange(checked: boolean) {
    this.performanceModeChecked = checked;
    this.updatePerformanceModeEvent.emit(checked);
    this.saveDataToLocalStorage();
  }
}
