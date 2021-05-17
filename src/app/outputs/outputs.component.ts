import {Component, OnInit} from '@angular/core';
import {CraftingDataService} from '../service/crafting-data.service';
import {Recipe} from '../interface/recipe';

@Component({
  selector: 'app-outputs',
  templateUrl: './outputs.component.html',
  styleUrls: ['./outputs.component.css']
})
export class OutputsComponent implements OnInit {

  recipes: Recipe[];

  constructor(private dataService: CraftingDataService) {
    this.recipes = [];
  }

  ngOnInit(): void {
  }

}
