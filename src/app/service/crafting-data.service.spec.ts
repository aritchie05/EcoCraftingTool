import {TestBed} from '@angular/core/testing';

import {CraftingDataService} from './crafting-data.service';
import {ServerSkill, ServerTable} from '../model/server-api/server-recipe';
import {ServerItem} from '../model/server-api/server-item';
import {skillsArray} from '../../assets/data/skills';
import {tablesArray} from '../../assets/data/crafting-tables';
import {itemsArray} from '../../assets/data/items';
import {recipesArray} from '../../assets/data/recipes';

describe('CraftingDataService', () => {
  let service: CraftingDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CraftingDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('removeCustomData', () => {

    it('should remove custom skills added via processServerSkills', () => {
      const customSkill: ServerSkill = {Skill: 'Custom Skill', NameID: 'CustomSkillSkill', Level: 1};
      service.processServerSkills([customSkill]);

      expect(service.skills().has('CustomSkillSkill')).toBe(true);

      service.removeCustomData();

      expect(service.skills().has('CustomSkillSkill')).toBe(false);
    });

    it('should preserve all vanilla skills after removing custom data', () => {
      const customSkill: ServerSkill = {Skill: 'Custom Skill', NameID: 'CustomSkillSkill', Level: 1};
      service.processServerSkills([customSkill]);
      service.removeCustomData();

      for (const vanillaSkill of skillsArray) {
        expect(service.skills().has(vanillaSkill.nameID)).toBe(true);
      }
    });

    it('should remove custom tables added via processServerTables', () => {
      const customTable: ServerTable = {NameID: 'CustomTableObject', Name: 'Custom Table', CanUseModules: false};
      service.processServerTables([customTable]);

      expect(service.tables().has('CustomTableObject')).toBe(true);

      service.removeCustomData();

      expect(service.tables().has('CustomTableObject')).toBe(false);
    });

    it('should preserve all vanilla tables after removing custom data', () => {
      const customTable: ServerTable = {NameID: 'CustomTableObject', Name: 'Custom Table', CanUseModules: true};
      service.processServerTables([customTable]);
      service.removeCustomData();

      for (const vanillaTable of tablesArray) {
        expect(service.tables().has(vanillaTable.nameID)).toBe(true);
      }
    });

    it('should remove custom items added via processServerItems', () => {
      const customItem: ServerItem = {
        PropertyInfos: {
          Name: {String: 'CustomGadgetItem'},
          DisplayName: {LocString: 'Custom Gadget'},
          Category: {String: 'Tool'}
        },
        Tags: []
      };
      service.processServerItems([customItem]);

      expect(service.items().has('CustomGadgetItem')).toBe(true);

      service.removeCustomData();

      expect(service.items().has('CustomGadgetItem')).toBe(false);
    });

    it('should preserve all vanilla items after removing custom data', () => {
      service.removeCustomData();

      for (const vanillaItem of itemsArray) {
        expect(service.items().has(vanillaItem.nameID)).toBe(true);
      }
    });

    it('should restore recipes to vanilla baseline count', () => {
      service.removeCustomData();

      expect(service.recipes().size).toBe(recipesArray.length);
    });

    it('should be idempotent when called multiple times', () => {
      service.removeCustomData();
      const skillCount = service.skills().size;
      const tableCount = service.tables().size;
      const itemCount = service.items().size;
      const recipeCount = service.recipes().size;

      service.removeCustomData();

      expect(service.skills().size).toBe(skillCount);
      expect(service.tables().size).toBe(tableCount);
      expect(service.items().size).toBe(itemCount);
      expect(service.recipes().size).toBe(recipeCount);
    });

    it('should allow re-adding custom data after removal', () => {
      const customSkill: ServerSkill = {Skill: 'Custom Skill', NameID: 'CustomSkillSkill', Level: 1};
      service.processServerSkills([customSkill]);

      service.removeCustomData();
      expect(service.skills().has('CustomSkillSkill')).toBe(false);

      service.processServerSkills([customSkill]);
      expect(service.skills().has('CustomSkillSkill')).toBe(true);
    });
  });
});
