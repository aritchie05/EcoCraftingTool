import {StoredSkill} from './stored-skill';
import {StoredTable} from './stored-table';
import {StoredItem} from './stored-item';
import {StoredRecipe} from './stored-recipe';
import {Locale} from '../../service/locale.service';
import {ServerRecipe, ServerSkill, ServerTable} from '../server-api/server-recipe';
import {ServerItem} from '../server-api/server-item';

export interface CalculatorConfig {
  skills: StoredSkill[];
  tables: StoredTable[];
  ingredients: StoredItem[];
  outputs: StoredRecipe[];
  byproducts: StoredItem[];
  resourceCostMultiplier: number;
  expensiveEndgameCost: boolean;
  laborCost: number;
  profitPercent: number;
  locale: Locale;
  customSkills: ServerSkill[];
  customTables: ServerTable[];
  customItems: ServerItem[];
  customRecipes: ServerRecipe[];
}
