import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Locale, LocaleService} from './service/locale.service';
import {HeaderComponent} from './header/header.component';
import {CraftingParentComponent} from './crafting-parent/crafting-parent.component';
import {FooterComponent} from './footer/footer.component';
import {MessageService} from './service/message.service';
import {environment} from '../environments/environment';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {CalculatorConfig} from './cookie/calculator-config';
import {CraftingDataService} from './service/crafting-data.service';
import {SkillCookie} from './cookie/skill-cookie';
import {TableCookie} from './cookie/table-cookie';
import {IngredientCookie} from './cookie/ingredient-cookie';
import {OutputCookie} from './cookie/output-cookie';

//Expiration days for local storage
export const EXP_DAYS = 60;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //Images pulled directly from GitHub repository to save bandwidth for hosted site
  imageBaseUrl = environment.imageBaseUrl;
  imageTemplateUrl = this.imageBaseUrl + '32px-template.png';

  locale: Locale;
  calcConfig: CalculatorConfig;
  calcConfigJson: string;
  performanceModeEnabled: boolean;

  @ViewChild(HeaderComponent)
  private headerComponent: HeaderComponent;
  @ViewChild(CraftingParentComponent)
  private craftingParentComponent: CraftingParentComponent;
  @ViewChild(FooterComponent)
  private footerComponent: FooterComponent;

  constructor(private localeService: LocaleService, private messageService: MessageService,
              @Inject(LOCAL_STORAGE) private storageService: StorageService) {
    this.locale = localeService.selectedLocale;
    this.performanceModeEnabled = true;
    document.getElementById('page-title').innerText = 'Eco ' + messageService.getMessage('navTitle', this.locale);
    document.head.lang = this.locale.langCode();
  }

  ngOnInit(): void {
    this.calcConfig = this.readLocalStorageToCalcConfig();
    this.calcConfigJson = JSON.stringify(this.calcConfig);
    let performanceMode = this.storageService.get('performanceMode');
    if (performanceMode != null) {
      this.performanceModeEnabled = performanceMode === 'true';
    }
  }

  readLocalStorageToCalcConfig(): CalculatorConfig {
    let calcConfig = new CalculatorConfig();

    let expensiveEndgame = this.storageService.get('expensiveEndgameCost');
    calcConfig.expensiveEndgameCost = expensiveEndgame === 'true';

    let whiteTigerRecipes = this.storageService.get('whiteTigerRecipes');
    calcConfig.whiteTigerRecipes = whiteTigerRecipes === 'true';

    calcConfig.resourceCostMultiplier = 1;
    let multiplier = this.storageService.get('resourceCostMultiplier');
    if (multiplier != null) {
      calcConfig.resourceCostMultiplier = Number.parseFloat(multiplier);
    }

    calcConfig.laborCost = 0;
    let laborCost = this.storageService.get('laborCost');
    if (laborCost != null) {
      calcConfig.laborCost = Number.parseFloat(laborCost);
    }

    calcConfig.profitPercent = 0;
    let profit = this.storageService.get('profitPercent');
    if (profit != null) {
      calcConfig.profitPercent = Number.parseFloat(profit);
    }

    calcConfig.skills = this.storageService.get('skills');
    calcConfig.tables = this.storageService.get('tables');
    calcConfig.ingredients = this.storageService.get('ingredients');
    calcConfig.outputs = this.storageService.get('recipes');

    return calcConfig;
  }

  onUpdateLocale(locale: Locale): void {
    this.locale = locale;
    document.getElementById('page-title').innerText = 'Eco ' +
      this.messageService.getMessage('navTitle', this.locale);
    document.head.lang = this.locale.langCode();
    this.localeService.selectedLocale = locale;
    this.craftingParentComponent.updateLocale(locale);
  }

  onUpdateEndgameCost(isExpensive: boolean): void {
    this.craftingParentComponent.updateEndgameCost(isExpensive);
  }

  onUpdateWhiteTigerRecipes(isEnabled: boolean): void {
    this.craftingParentComponent.updateWhiteTigerRecipes(isEnabled);
  }

  onUpdateResourceCostMultiplier(newMultiplier: number): void {
    this.craftingParentComponent.updateResourceCostMultiplier(newMultiplier);
  }

  onImportCalcConfig(calcConfig: CalculatorConfig): void {
    this.saveCalcConfigToLocalStorage(calcConfig);
    window.location.reload();
  }

  saveCalcConfigToLocalStorage(calcConfig: CalculatorConfig): void {
    this.storageService.set('expensiveEndgameCost', '' + calcConfig.expensiveEndgameCost);
    this.storageService.set('whiteTigerRecipes', '' + calcConfig.whiteTigerRecipes);
    this.storageService.set('resourceCostMultiplier', calcConfig.resourceCostMultiplier.toFixed(2));
    this.storageService.set('laborCost', calcConfig.laborCost.toLocaleString(this.localeService.selectedLocale.code,
      {minimumFractionDigits: 0, maximumFractionDigits: 2}));
    this.storageService.set('profitPercent', calcConfig.profitPercent.toLocaleString(
      this.localeService.selectedLocale.code, {minimumFractionDigits: 0, maximumFractionDigits: 2}));

    this.storageService.set('skills', calcConfig.skills);
    this.storageService.set('tables', calcConfig.tables);
    this.storageService.set('ingredients', calcConfig.ingredients);
    this.storageService.set('recipes', calcConfig.outputs);
  }

  onExportCalcConfig() {
    this.calcConfig = this.readLocalStorageToCalcConfig();
    this.calcConfigJson = JSON.stringify(this.calcConfig);
  }

  onUpdatePerformanceMode(performanceMode: boolean) {
    this.craftingParentComponent.performanceModeEnabled = performanceMode;
  }
}
