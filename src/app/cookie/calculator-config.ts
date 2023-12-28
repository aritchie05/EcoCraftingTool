import {SkillCookie} from './skill-cookie';
import {TableCookie} from './table-cookie';
import {IngredientCookie} from './ingredient-cookie';
import {OutputCookie} from './output-cookie';

export class CalculatorConfig {
  skills: SkillCookie[];
  tables: TableCookie[];
  ingredients: IngredientCookie[];
  outputs: OutputCookie[];
  resourceCostMultiplier: number;
  expensiveEndgameCost: boolean;
  whiteTigerRecipes: boolean;
  laborCost?: number;
  profitPercent?: number;
}
