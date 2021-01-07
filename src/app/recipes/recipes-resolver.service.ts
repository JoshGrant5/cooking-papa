import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Recipe } from './recipe.model';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';
import { map, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<{recipes: Recipe[]}> {
  constructor(private store: Store<fromApp.AppState>, private actions$: Actions) {}

  // Resolver loads the data before the page is loaded
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Select our recipes from the store
    return this.store.select('recipes').pipe(take(1), map(recipesState => {
      // This will be either an empty array or a filled array
      return recipesState.recipes;
    }),
    switchMap(recipes => {
      this.store.dispatch(RecipesActions.fetchRecipes());
      return this.actions$.pipe(ofType(RecipesActions.setRecipes), take(1));
    }));
  }
}

