import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];
  public owner_id: string;

  constructor(name: string, description: string, imagePath: string, ingredients: Ingredient[], owner_id: string) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
    this.owner_id = owner_id;
  }
}
