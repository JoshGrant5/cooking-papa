import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DatabaseService } from "../shared/database.service";
import { Recipe } from "./recipe.model";

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private databaseService: DatabaseService) {}

  // Resolver loads the data before the page is loaded
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.databaseService.fetchRecipes();
  }
}
