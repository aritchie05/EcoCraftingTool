import {RecipeIngredient} from './recipe-ingredient';

export interface Recipe {
  name: string;
  levelReq: number;
  labor: number;
  skill: string;
  products: Array<RecipeIngredient>;
  ingredients: Array<RecipeIngredient>;
}
