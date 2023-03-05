import {Component, Input, ViewChild} from '@angular/core';
import {Locale, LocaleService} from './service/locale.service';
import {HeaderComponent} from './header/header.component';
import {CraftingParentComponent} from './crafting-parent/crafting-parent.component';
import {FooterComponent} from './footer/footer.component';
import {MessageService} from './service/message.service';
import {environment} from '../environments/environment';

//Expiration days for local storage
export const EXP_DAYS = 60;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //Images pulled directly from GitHub repository to save bandwidth for hosted site
  imageBaseUrl = environment.imageBaseUrl;
  imageTemplateUrl = this.imageBaseUrl + '32px-template.png';

  locale: Locale;
  @ViewChild(HeaderComponent)
  private headerComponent: HeaderComponent;
  @ViewChild(CraftingParentComponent)
  private craftingParentComponent: CraftingParentComponent;
  @ViewChild(FooterComponent)
  private footerComponent: FooterComponent;

  constructor(private localeService: LocaleService, private messageService: MessageService) {
    this.locale = localeService.selectedLocale;
    document.getElementById('page-title').innerText = 'Eco ' + messageService.getMessage('navTitle', this.locale);
    document.head.lang = this.locale.langCode();
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

  onUpdateResourceCostMultiplier(newMultiplier: number): void {
    this.craftingParentComponent.updateResourceCostMultiplier(newMultiplier);
  }
}
