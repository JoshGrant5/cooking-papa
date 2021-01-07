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
    return this.store.select('shoppingList').pipe(take(1), map(ingredientsState => {
      return ingredientsState.ingredients;
    }),
    switchMap(ingredients => {
      this.store.dispatch(ShoppingListActions.fetchIngredients());
      return this.actions$.pipe(ofType(ShoppingListActions.setIngredients), take(1));
    }));
  }
}

