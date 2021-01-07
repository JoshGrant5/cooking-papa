import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import * as RecipesActions from './recipe.actions';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {};

  fetchRecipes$ = createEffect(() =>
    this.actions$.pipe(ofType(RecipesActions.fetchRecipes), switchMap(() => {
      console.log('inside fetch recipes')
    let token;
    this.store.select('auth').subscribe(authState => {
      if (authState.user) {
        token = authState.user.token;
      }
    });
    return this.http.get<Recipe[]>(
      `https://cooking-papa-default-rtdb.firebaseio.com/recipes.json?owner_id=${token}`
    );
  }), map(recipes => {
    return recipes.map(recipe => {
      return {
        ...recipe,
        ingredients: recipe.ingredients ? recipe.ingredients : []
      };
    });
  }), map(recipes => {
    return RecipesActions.setRecipes({recipes});
  })));

  // withLatestFrom allows us to merge a value of another observable into this observable stream
  // ofType gives us back actionData (not intersted in this) and the data we receive from withLatestFrom => use array destructing to grab these
  storeRecipes$ = createEffect(() =>
    this.actions$.pipe(ofType(RecipesActions.storeRecipes), withLatestFrom(this.store.select('recipes')), switchMap(([actionData, recipeState]) => {
    return this.http.put(
      'https://cooking-papa-default-rtdb.firebaseio.com/recipes.json',
      recipeState.recipes
    )
  })),
    {dispatch: false}
  );

}
