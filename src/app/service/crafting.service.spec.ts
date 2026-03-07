import {TestBed} from '@angular/core/testing';

import {CraftingService} from './crafting.service';
import {CraftingDataService} from './crafting-data.service';
import {Recipe} from '../model/recipe';
import {ServerRecipe} from '../model/server-api/server-recipe';

describe('CraftingService', () => {
  let service: CraftingService;
  let dataService: CraftingDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CraftingService);
    dataService = TestBed.inject(CraftingDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('refreshSelectedData', () => {
    let originalRecipe: Recipe;

    beforeEach(async () => {
      originalRecipe = dataService.recipes().get('AgoutiEnchiladas')!;
      expect(originalRecipe).toBeTruthy();
      await service.selectRecipe(originalRecipe);
    });

    it('should update selected recipe references after removeCustomData rebuilds recipes', () => {
      const selectedBefore = service.selectedRecipes()[0];
      expect(selectedBefore).toBe(originalRecipe);

      // Simulate server switch: removeCustomData creates new Recipe objects
      dataService.removeCustomData();

      // Selected recipe is now orphaned — different object than what's in the Map
      const mapRecipe = dataService.recipes().get('AgoutiEnchiladas')!;
      expect(service.selectedRecipes()[0]).not.toBe(mapRecipe);

      // After refresh, selected recipe should point to the Map's current object
      service.refreshSelectedData();
      expect(service.selectedRecipes()[0]).toBe(mapRecipe);
    });

    it('should update selected recipe references after processServerRecipes replaces a recipe', () => {
      const modifiedRecipe: ServerRecipe = {
        Key: 'Agouti Enchiladas',
        NameID: 'AgoutiEnchiladas',
        BaseLaborCost: 65,
        CraftingTable: 'Stove',
        CraftingTableNameID: 'StoveObject',
        CraftingTableCanUseModules: true,
        DefaultVariant: '',
        NumberOfVariants: 1,
        SkillNeeds: [],
        Variants: [],
        SkillNameID: 'AdvancedCookingSkill',
        SkillLevel: 4,
        IsNew: false,
        Ingredients: [
          {IsSpecificItem: true, Tag: null, Name: 'Cornmeal', NameID: 'CornmealItem', Ammount: 4, IsStatic: false},
          {IsSpecificItem: true, Tag: null, Name: 'Papaya', NameID: 'PapayaItem', Ammount: 2, IsStatic: false},
          {IsSpecificItem: true, Tag: null, Name: 'Prime Cut', NameID: 'PrimeCutItem', Ammount: 2, IsStatic: false},
          {IsSpecificItem: true, Tag: null, Name: 'Sun Cheese', NameID: 'SunCheeseItem', Ammount: 2, IsStatic: false},
          {IsSpecificItem: true, Tag: null, Name: 'Tomato', NameID: 'TomatoItem', Ammount: 2, IsStatic: false}
        ],
        Outputs: [
          {Name: 'Agouti Enchiladas', NameID: 'AgoutiEnchiladasItem', Ammount: 2, IsStatic: true}
        ]
      };

      dataService.removeCustomData();
      dataService.processServerRecipes([modifiedRecipe]);
      service.refreshSelectedData();

      const refreshedRecipe = service.selectedRecipes()[0];
      const mapRecipe = dataService.recipes().get('AgoutiEnchiladas')!;
      expect(refreshedRecipe).toBe(mapRecipe);

      // Verify the refreshed recipe has the modified ingredient quantity
      const sunCheese = refreshedRecipe.ingredients.find(i => i.item.nameID === 'SunCheeseItem');
      expect(sunCheese?.quantity).toBe(2);
    });

    it('should update selected skill and table references after refresh', async () => {
      // Manually add skill and table to ensure they're in selected lists
      const skill = dataService.skills().get('AdvancedCookingSkill')!;
      const table = dataService.tables().get('StoveObject')!;
      if (!service.selectedSkills().some(s => s.nameID === skill.nameID)) {
        service.selectedSkills.update(skills => [...skills, skill]);
      }
      if (!service.selectedTables().some(t => t.nameID === table.nameID)) {
        service.selectedTables.update(tables => [...tables, table]);
      }

      dataService.removeCustomData();
      service.refreshSelectedData();

      const refreshedSkill = service.selectedSkills().find(s => s.nameID === 'AdvancedCookingSkill');
      const refreshedTable = service.selectedTables().find(t => t.nameID === 'StoveObject');
      expect(refreshedSkill).toBe(dataService.skills().get('AdvancedCookingSkill'));
      expect(refreshedTable).toBe(dataService.tables().get('StoveObject'));
    });

    it('should preserve skill level and lavish settings after refresh', () => {
      const skill = dataService.skills().get('AdvancedCookingSkill')!;
      if (!service.selectedSkills().some(s => s.nameID === skill.nameID)) {
        service.selectedSkills.update(skills => [...skills, skill]);
      }
      skill.level.set(7);
      skill.lavishChecked.set(true);

      dataService.removeCustomData();
      service.refreshSelectedData();

      const refreshedSkill = service.selectedSkills().find(s => s.nameID === 'AdvancedCookingSkill')!;
      expect(refreshedSkill.level()).toBe(7);
      expect(refreshedSkill.lavishChecked()).toBe(true);
    });

    it('should preserve table upgrade selection after refresh', () => {
      const table = dataService.tables().get('StoveObject')!;
      if (!service.selectedTables().some(t => t.nameID === table.nameID)) {
        service.selectedTables.update(tables => [...tables, table]);
      }
      const upgrades = table.availableUpgrades;
      if (upgrades && upgrades.length > 1) {
        table.selectedUpgrade.set(upgrades[1]);

        dataService.removeCustomData();
        service.refreshSelectedData();

        const refreshedTable = service.selectedTables().find(t => t.nameID === 'StoveObject')!;
        expect(refreshedTable.selectedUpgrade()).toBe(upgrades[1]);
      }
    });

    it('should preserve recipe profit override after refresh', () => {
      service.selectedRecipes()[0].profitOverride.set(15);

      dataService.removeCustomData();
      service.refreshSelectedData();

      expect(service.selectedRecipes()[0].profitOverride()).toBe(15);
    });

    it('should preserve input prices after refresh', () => {
      const sunCheese = service.selectedInputs().find(i => i.nameID === 'SunCheeseItem');
      expect(sunCheese).toBeTruthy();
      sunCheese!.price.set(10);

      dataService.removeCustomData();
      service.refreshSelectedData();

      const refreshedSunCheese = service.selectedInputs().find(i => i.nameID === 'SunCheeseItem');
      expect(refreshedSunCheese).toBeTruthy();
      expect(refreshedSunCheese!.price()).toBe(10);
    });

    it('should remove selected recipes that no longer exist in the Map', () => {
      expect(service.selectedRecipes().length).toBe(1);

      // Clear all recipes from the Map
      dataService.recipes().clear();
      dataService.recipes.set(new Map());

      service.refreshSelectedData();

      expect(service.selectedRecipes().length).toBe(0);
    });
  });
});
