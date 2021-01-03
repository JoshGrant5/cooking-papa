import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.model';

import * as RecipesActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';
import { ActivationEnd } from '@angular/router';

@Injectable()
export class RecipeEffects {

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {};

  @Effect()
  fetchRecipes = this.actions$.pipe(ofType(RecipesActions.FETCH_RECIPES), switchMap(() => {
    return this.http.get<Recipe[]>(
      'https://cooking-papa-default-rtdb.firebaseio.com/recipes.json'
    );
  }), map(recipes => {
    return recipes.map(recipe => {
      return {
        ...recipe,
        ingredients: recipe.ingredients ? recipe.ingredients : []
      };
    });
  }), map(recipes => {
    return new RecipesActions.SetRecipes(recipes);
  }));

  @Effect({dispatch: false})
  // withLatestFrom allows us to merge a value of another observable into this observable stream
  // ofType gives us back actionData (not intersted in this) and the data we receive from withLatestFrom => use array destructing to grab these
  storeRecipes = this.actions$.pipe(ofType(RecipesActions.STORE_RECIPES), withLatestFrom(this.store.select('recipes')), switchMap(([actionData, recipeState]) => {
    return this.http.put(
      'https://cooking-papa-default-rtdb.firebaseio.com/recipes.json',
      recipeState.recipes
    )
  }))

}
