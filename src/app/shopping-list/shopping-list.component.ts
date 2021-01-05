import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from './../shared/ingredient.model';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit {

  // The data type of the reducer in our store
  ingredients: Observable<{ingredients: Ingredient[]}>;

  private subscription: Subscription;

  constructor(
    // Must declare the type of our store (the reducer and its return value). In this case, our store is of type our application state as seen inside the shopping list reducer
    private store: Store<fromApp.AppState>
    ) {}

  ngOnInit() {
    // .select returns a slice of the state stored in store
    this.ingredients = this.store.select('shoppingList');

  }

  onEditItem(index: number) {
    this.store.dispatch(ShoppingListActions.startEdit({index}));
  }
}
