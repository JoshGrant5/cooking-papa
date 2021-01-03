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
  }

  onAddToShoppingList() {
    this.store.dispatch(ShoppingListActions.addIngredients({ingredients: this.recipe.ingredients}));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.store.dispatch(RecipesActions.deleteRecipe({index: this.id}));
    this.router.navigate(['/recipes']);
  }

}
