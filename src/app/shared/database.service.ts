import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://cooking-papa-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes() {
    this.http.get<Recipe[]>('https://cooking-papa-default-rtdb.firebaseio.com/recipes.json').subscribe(response => {
      this.recipeService.setRecipes(response);
    });
  }
}
