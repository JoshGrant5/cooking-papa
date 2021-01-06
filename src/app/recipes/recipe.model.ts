import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];
  public user_id: string;

  constructor(name: string, description: string, imagePath: string, ingredients: Ingredient[], user_id: string) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
    this.user_id = user_id;
  }
}
