import {ChangeDetectionStrategy, Component, Signal, signal, WritableSignal} from '@angular/core';
import {Item} from '../../model/item';
import {CraftingService} from '../../service/crafting.service';
import {ImageService} from '../../service/image.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTooltip} from '@angular/material/tooltip';
import {MessageService} from '../../service/message.service';

@Component({
  selector: 'app-inputs',
  imports: [MatFormFieldModule, MatInputModule, MatTooltip],
  templateUrl: './inputs.component.html',
  styleUrl: './inputs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputsComponent {
  pricePerThousandCals: Signal<number>;
  defaultProfitPercent: Signal<number>;

  selectedItems: Signal<Item[]>;
  selectedByproducts: Signal<Item[]>;

  // Signals to track touched state for each input type
  itemPricesTouched: WritableSignal<Set<number>> = signal(new Set());
  byproductPricesTouched: WritableSignal<Set<number>> = signal(new Set());

  constructor(private craftingService: CraftingService, protected imageService: ImageService,
              private messageService: MessageService) {
    this.pricePerThousandCals = craftingService.pricePerThousandCals;
    this.defaultProfitPercent = craftingService.defaultProfitPercent;

    this.selectedItems = craftingService.selectedInputs;
    this.selectedByproducts = craftingService.selectedByproducts;
  }

  message(id: string): string {
    return this.messageService.getMessage(id);
  }

  /**
   * Check if an input should be highlighted (untouched and value is 0)
   */
  shouldHighlightItemPrice(index: number, item: Item): boolean {
    return !this.itemPricesTouched().has(index) && item.price() === 0;
  }

  shouldHighlightByproductPrice(index: number, byproduct: Item): boolean {
    return !this.byproductPricesTouched().has(index) && byproduct.price() === 0;
  }

  onItemPriceInputFocus(index: number): void {
    const touched = new Set(this.itemPricesTouched());
    touched.add(index);
    this.itemPricesTouched.set(touched);
  }

  onByproductPriceInputFocus(index: number): void {
    const touched = new Set(this.byproductPricesTouched());
    touched.add(index);
    this.byproductPricesTouched.set(touched);
  }

  onCalorieCostChange(value: string) {
    let number = Number.parseFloat(value);
    if (isNaN(number)) {
      number = 0;
    }

    this.craftingService.updatePricePerThousandCals(number);
  }

  onProfitPercentChange(value: string) {
    let number = Number.parseFloat(value);
    if (isNaN(number)) {
      number = 0;
    }

    this.craftingService.updateDefaultProfitPercent(number);
  }

  onInputPriceChange(index: number, value: string) {
    let number = Number.parseFloat(value);
    if (isNaN(number)) {
      number = 0;
    }

    this.craftingService.updateInputPrice(index, number);
  }

  onByproductPriceChange(index: number, value: string) {
    const number = Number.parseFloat(value);

    this.craftingService.updateByproductPrice(index, number);
  }
}
