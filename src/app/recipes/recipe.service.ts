import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Egg-selent Breakfast',
      'This breakfast tastes even better than it looks, and will get you feeling great to start your day.',
      'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=953&q=80',
      [
        new Ingredient('Egg', 2),
        new Ingredient('Sourdough Bread', 2),
        new Ingredient('Arugula', 5),
        new Ingredient('Avocado', 1)
      ]
    ),
    new Recipe(
      'Soy Salmon',
      'Seared salmon served on a bed of fresh veggies and soaked in a delicious soy glaze.',
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=934&q=80',
      [
        new Ingredient('Salmon Filet', 1),
        new Ingredient('Carrot', 1),
        new Ingredient('Celery', 1),
        new Ingredient('Spinach', 1),
        new Ingredient('Soy Sauce', 1),
        new Ingredient('Sesame Oil', 1),
        new Ingredient('Olive Oil', 1),
        new Ingredient('Potatoe', 1)
      ]
    )
  ];

  getRecipes() {
    // Slice the recipes array so we do not get the original, but only a copy
    return this.recipes.slice();
  }
}
