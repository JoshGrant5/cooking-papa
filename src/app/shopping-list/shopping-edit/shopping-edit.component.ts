import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', {static: false}) slForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      const index = stateData.editedIndex;
        if (index > -1) {
        this.editMode = true;
        this.editedItem = stateData.ingredients[index];
        // Whenever we select a new item, populate the form with the right values
        this.slForm.setValue({
          name: this.editedItem.name,
          quantity: this.editedItem.quantity
        });
      } else {
        this.editMode = false;
      }
    });
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    let user_id;
    this.store.select('auth').subscribe(authState => {
      if (authState.user) {
        user_id = authState.user.id;
      }
    });
    const newIngredient = new Ingredient(user_id, value.name, value.quantity);
    if (this.editMode) {
      this.store.dispatch(ShoppingListActions.updateIngredient({ingredient: newIngredient}));
      this.store.dispatch(ShoppingListActions.storeIngredients());
    } else {
      this.store.dispatch(ShoppingListActions.addIngredient({ingredient: newIngredient}));
      this.store.dispatch(ShoppingListActions.storeIngredients());
    }
    // Clear input fields regardless of whether an item was added or edited
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(ShoppingListActions.stopEdit());
  }

  onDelete() {
    this.store.dispatch(ShoppingListActions.deleteIngredient());
    this.store.dispatch(ShoppingListActions.storeIngredients());
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(ShoppingListActions.stopEdit());
  }

}
