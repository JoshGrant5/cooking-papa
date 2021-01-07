import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';

import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  user_id: string;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.store.select('recipes').pipe(map(recipesState => {
          return recipesState.recipes.find((recipe, index) => {
            return index === this.id;
          });
        })).subscribe(recipe => {
          this.recipe = recipe;
        });
      }
    );

    this.store.select('auth').subscribe(authState => {
      if (authState.user) {
        this.user_id = authState.user.id;
      }
    });
  }

  onAddToShoppingList() {
    const editedIngredients = this.recipe.ingredients.map(ingredient => {
      return {name: ingredient.name, quantity: ingredient.quantity, owner_id: this.user_id}
    });
    this.store.dispatch(ShoppingListActions.addIngredients({ingredients: editedIngredients}));
    this.store.dispatch(ShoppingListActions.storeIngredients());
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.store.dispatch(RecipesActions.deleteRecipe({index: this.id}));
    this.store.dispatch(RecipesActions.storeRecipes());
    this.router.navigate(['/recipes']);
  }

}
