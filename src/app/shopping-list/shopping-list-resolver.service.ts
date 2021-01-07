import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import * as fromApp from '../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';
import { map, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({ providedIn: 'root' })
export class ShoppingListResolverService implements Resolve<{ingredients: Ingredient[]}> {
  constructor(private store: Store<fromApp.AppState>, private actions$: Actions) {}

  // Resolver loads the data before the page is loaded
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Select our recipes from the store

    return this.store.select('shoppingList').pipe(take(1), map(ingredientsState => {
      return ingredientsState.ingredients;
    }),
    switchMap(ingredients => {
      if (ingredients.length === 0) {
        console.log('inside the resolver')
        console.log(ingredients)
      // This will be either an empty array or a filled array
        this.store.dispatch(ShoppingListActions.fetchIngredients());
        // We listen to SET_RECIPES, because if that is called, we know we need to resolve our recipes
        return this.actions$.pipe(ofType(ShoppingListActions.setIngredients), take(1));
      } else {
        // Our recipes length is greater than 0, so we return a new observable of just our current recipes
        return of({ingredients});
      }
    }));
  }
}

