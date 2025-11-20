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

  //Fields added in processing
  NameID?: string;
  CraftingTableNameID?: string;
  SkillNameID?: string;
  SkillLevel?: number;
  Ingredients?: ServerIngredient[];
  Outputs?: ServerOutput[];
  IsNew?: boolean;

  //Flags to track modified fields
  UpdatedSkill?: boolean;
  UpdatedSkillLevel?: boolean;
  UpdatedLaborCost?: boolean;
  UpdatedCraftingTable?: boolean;
  UpdatedIngredients?: boolean;
  UpdatedOutputs?: boolean;
}

export interface ServerTable {
  Name: string;
  NameID: string;
}

export interface ServerSkill {
  Skill: string;
  Level: number;
  NameID?: string;
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
  NameID: string;
  Ammount: number; //This is a typo in the api response! Don't fix it
  IsStatic: boolean;

  //Flags to track modified fields
  NewItem?: boolean;
  UpdatedAmount?: boolean;
  UpdatedStatic?: boolean;
}

export interface ServerOutput {
  Name: string;
  NameID: string;
  Ammount: number; //This is a typo in the api response! Don't fix it
  IsStatic: boolean;

  //Flags to track modified fields
  NewItem?: boolean;
  UpdatedAmount?: boolean;
  UpdatedStatic?: boolean;
}
