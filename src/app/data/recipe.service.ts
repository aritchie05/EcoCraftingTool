import {Injectable} from '@angular/core';
import {Recipe} from '../interface/recipe';
import storedRecipes from '../../assets/data/recipes.json';
import {Skill} from '../interface/skill';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipes: Array<Recipe>;

  constructor() {
    this.recipes = storedRecipes;
  }


  public getAllRecipes(): Array<Recipe> {
    return this.recipes;
  }

  public getRecipesBySkillName(skillName: string): Array<Recipe> {
    return this.recipes.filter(recipe => recipe.name === skillName);
  }

  public getRecipesBySkillNames(skillNames: Array<string>): Array<Recipe> {
    return this.recipes.filter(recipe => skillNames.includes(recipe.name));
  }

  public getRecipesBySkill(skill: Skill): Array<Recipe> {
    return this.recipes.filter(recipe => recipe.name === skill.name && recipe.levelReq >= skill.level);
  }

  public getRecipesBySkills(skills: Array<Skill>): Array<Recipe> {
    const recipes = new Array<Recipe>();
    skills.forEach(skill => {
      let filteredRecipes = this.recipes.filter(recipe => recipe.name === skill.name && recipe.levelReq >= skill.level);
      filteredRecipes.forEach(filteredRecipe => recipes.push(filteredRecipe));
    });
    return recipes;
  }
}
