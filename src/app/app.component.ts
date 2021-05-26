import {Component, ViewChild} from '@angular/core';
import {Locale, LocaleService} from './service/locale.service';
import {HeaderComponent} from './header/header.component';
import {CraftingParentComponent} from './crafting-parent/crafting-parent.component';
import {FooterComponent} from './footer/footer.component';
import {MessageService} from './service/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

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

  onUpdateLocale(locale: Locale) {
    this.locale = locale;
    document.getElementById('page-title').innerText = 'Eco ' +
      this.messageService.getMessage('navTitle', this.locale);
    document.head.lang = this.locale.langCode();
    this.craftingParentComponent.updateLocale(locale);
    this.footerComponent.locale = locale;
  }
}
