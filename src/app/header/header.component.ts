import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Locale, LocaleService} from '../service/locale.service';
import {MessageService} from '../service/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  locale: Locale;
  locales: Locale[];

  @Output() updateLocaleEvent = new EventEmitter<Locale>();

  constructor(private localeService: LocaleService, private messageService: MessageService) {
    this.locale = localeService.selectedLocale;
    this.locales = localeService.supportedLocales;
  }

  ngOnInit(): void {
  }

  message(id: string): string {
    return this.messageService.getMessage(id, this.locale);
  }

  onLocaleSelect(locale: Locale) {
    if (locale.code.localeCompare(this.localeService.selectedLocale.code) !== 0) {
      this.locale = locale;
      this.localeService.selectedLocale = locale;
      this.updateLocaleEvent.emit(locale);
    }
  }
}
