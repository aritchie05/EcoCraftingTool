import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../interface/recipe';
import {ImageService} from '../service/image.service';
import {Locale, LocaleService} from '../service/locale.service';
import {MessageService} from '../service/message.service';

@Component({
  selector: 'app-recipe-modal',
  templateUrl: './recipe-modal.component.html',
  styleUrls: ['./recipe-modal.component.css']
})
export class RecipeModalComponent implements OnInit {

  @Input() recipe: Recipe;
  visible: boolean = false;

  constructor(public imageService: ImageService, private localeService: LocaleService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  message(id: string): string {
    return this.messageService.getMessage(id, this.localeService.selectedLocale);
  }

  show(): void {
    this.visible = true;
  }
}
