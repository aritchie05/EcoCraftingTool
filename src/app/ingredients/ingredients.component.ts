import {Component, OnInit} from '@angular/core';
import {CraftingDataService} from '../service/crafting-data.service';
import {Item} from '../interface/item';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  itemIngredients: Item[];

  constructor(private dataService: CraftingDataService) {
    this.itemIngredients = [];
  }

  ngOnInit(): void {

  }

  onPriceChange(ingredient: Item, $event: KeyboardEvent) {

  }
}
