import {Component} from '@angular/core';
import {LocaleService} from '../service/locale.service';
import {MessageService} from '../service/message.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(private localeService: LocaleService, private messageService: MessageService) {
  }

  message(id: string): string {
    return this.messageService.getMessage(id, this.localeService.selectedLocale);
  }

}
