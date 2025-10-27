export interface ServerRecipesResponse {
  Recipes: ServerRecipe[];
}

export interface ServerRecipe {
  Key: string;
  BaseLaborCost: number;
  CraftingTable: string;
  CraftingTableCanUseModules: boolean;
  DefaultVariant: string;
  NumberOfVariants: number;
  SkillNeeds: ServerSkill[];
  Variants: ServerRecipeVariant[];
}

export interface ServerSkill {
  Skill: string;
  Level: number;
}

export interface ServerRecipeVariant {
  Key: string;
  Name: string;
  Ingredients: ServerIngredient[];
  Products: ServerOutput[];
}

export interface ServerIngredient {
  IsSpecificItem: boolean;
  Tag: string | null;
  Name: string;
  Ammount: number; //This is a typo in the api response! Don't fix it
  IsStatic: boolean;
}

export interface ServerOutput {
  Name: string;
  Ammount: number; //This is a typo in the api response! Don't fix it
  IsStatic: boolean;
}
