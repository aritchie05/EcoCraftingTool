import {Component} from '@angular/core';
import {Locale, LocaleService} from '../service/locale.service';
import {MessageService} from '../service/message.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  locale: Locale;

  constructor(private localeService: LocaleService, private messageService: MessageService) {
    this.locale = localeService.selectedLocale;
  }

  message(id: string): string {
    return this.messageService.getMessage(id, this.locale);
  }

}
