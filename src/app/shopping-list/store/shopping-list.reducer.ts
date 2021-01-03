import { Action, createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface ShoppingListState {
  ingredients: Ingredient[];
  // editedIngredient: Ingredient;
  editedIndex: number;
}

const initialState: ShoppingListState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  // editedIngredient: null,
  editedIndex: -1
};

const _shoppingListReducer = createReducer(

  initialState,

  on(
    ShoppingListActions.addIngredient,
    (state, action) => ({
      ...state,
      ingredients: state.ingredients.concat(action.ingredient)
    })
  ),

  on(
    ShoppingListActions.addIngredients,
    (state, action) => ({
      ...state,
      ingredients: state.ingredients.concat(...action.ingredients)
    })
  ),

  on(
    ShoppingListActions.updateIngredient,
    (state, action) => ({
      ...state,
      editIndex: -1,
      ingredients: state.ingredients.map(
        (ingredient, index) => index === state.editedIndex ? { ...action.ingredient } : ingredient
      )
    })
  ),

  on(
    ShoppingListActions.deleteIngredient,
    (state) => ({
      ...state,
      editIndex: -1,
      ingredients: state.ingredients.filter(
        (_, index) => index !== state.editedIndex
      )
    })
  ),

  on(
    ShoppingListActions.startEdit,
    (state, action) => ({
      ...state, editIndex:
      action.index
    })
  ),

  on(
    ShoppingListActions.stopEdit,
    (state) => ({
      ...state, editIndex: -1
    })
  )

);

export function shoppingListReducer(state: ShoppingListState, action: Action) {
  return _shoppingListReducer(state, action);
}
