import {ChangeDetectionStrategy, Component, effect} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {CraftingComponent} from './crafting/crafting.component';
import {LocaleService} from './service/locale.service';
import {MessageService} from './service/message.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, CraftingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  constructor(private localeService: LocaleService,
              private messageService: MessageService,
              private titleService: Title) {

    effect(() => {
      this.titleService.setTitle(`Eco ${this.messageService.getMessage('navTitle')}`);

      document.head.lang = this.localeService.selectedLocale().code;
    });
  }
}
