import {Component, HostListener, Input, OnInit, ElementRef} from '@angular/core';
import {Recipe} from '../interface/recipe';
import {ImageService} from '../service/image.service';
import {OutputDisplay, SubRecipe} from '../interface/output-display';
import {Locale, LocaleService} from '../service/locale.service';
import {MessageService} from '../service/message.service';

@Component({
  selector: 'app-recipe-modal',
  templateUrl: './recipe-modal.component.html',
  styleUrls: ['./recipe-modal.component.css']
})
export class RecipeModalComponent implements OnInit {

  @Input() recipe: Recipe;
  @Input() outputDisplay: OutputDisplay;
  @Input() recipeToggleButton: HTMLElement;
  @Input() dropUp: boolean;
  showRecipe: boolean;
  locale: Locale;

  constructor(public imageService: ImageService, private localeService: LocaleService,
              private messageService: MessageService, private elementRef: ElementRef) {
    this.showRecipe = false;
    this.locale = localeService.selectedLocale;
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    //Only handle outside click if this modal is being shown
    if (this.showRecipe) {
      //Check if the click event target is outside the modal
      if (!this.elementRef.nativeElement.contains(event.target)) {
        //Check if the click is on the toggle button for this component
        if (this.recipeToggleButton != event.target) {
          this.closeModal();
        }
      }
    }
  }

  ngOnInit(): void {
  }

  toggleShowRecipe() {
    this.showRecipe = !this.showRecipe;
  }

  closeModal() {
    this.showRecipe = false;
  }

  showModal() {
    this.showRecipe = true;
  }

  message(id: string): string {
    return this.messageService.getMessage(id, this.locale);
  }
}
