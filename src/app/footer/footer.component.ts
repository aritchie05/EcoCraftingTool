import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MessageService} from '../service/message.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  constructor(private messageService: MessageService) {
  }

  message(id: string): string {
    return this.messageService.getMessage(id);
  }
}
