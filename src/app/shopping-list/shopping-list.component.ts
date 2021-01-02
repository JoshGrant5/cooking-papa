import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from './../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  // The data type of the reducer in our store
  ingredients: Observable<{ingredients: Ingredient[]}>;

  private subscription: Subscription;

  constructor(
    private slService: ShoppingListService,
    // Must declare the type of our store (the reducer and its return value). In this case, our store is of type our application state as seen inside the shopping list reducer
    private store: Store<fromShoppingList.AppState>
    ) {}

  ngOnInit() {
    // .select returns a slice of the state stored in store
    this.ingredients = this.store.select('shoppingList');

  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
