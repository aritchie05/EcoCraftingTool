import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CraftingDataService} from '../service/crafting-data.service';
import {Item} from '../interface/item';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  itemIngredients: Item[];
  laborCost: number;

  @Output() ingredientPriceChangedEvent = new EventEmitter<Item>();
  @Output() laborCostChangedEvent = new EventEmitter<number>();

  constructor(private dataService: CraftingDataService) {
    this.itemIngredients = [];
    this.laborCost = 0;
  }

  ngOnInit(): void {
  }


  onPriceChange(item: Item, value: string) {
    let price = parseFloat(value);
    console.log(`Parsed input to number ${price}`);
    if (price !== item.price) {
      if (isNaN(price)) {
        price = item.price;
      }
      console.log(`Price changed for ingredient item ${item.name} to price ${price}`);
      const index = this.itemIngredients.findIndex(i => i.nameID === item.nameID);
      item.price = price;
      this.itemIngredients[index] = item;
      this.ingredientPriceChangedEvent.emit(item);
    }
  }

  onLaborCostChange(value: string): void {
    this.laborCost = parseFloat(value);
    this.laborCostChangedEvent.emit(this.laborCost);
  }

  sortIngredients() {
    this.itemIngredients.sort((a, b) => a.name.localeCompare(b.name));
  }
}
