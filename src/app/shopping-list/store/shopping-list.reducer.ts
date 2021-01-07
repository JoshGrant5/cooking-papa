import { Action, createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface ShoppingListState {
  ingredients: Ingredient[];
  editedIndex: number;
}

const initialState: ShoppingListState = {
  ingredients: [],
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
      editedIndex: -1,
      ingredients: state.ingredients.map(
        (ingredient, index) => index === state.editedIndex ? { ...action.ingredient } : ingredient
      )
    })
  ),

  on(
    ShoppingListActions.deleteIngredient,
    (state) => ({
      ...state,
      editedIndex: -1,
      ingredients: state.ingredients.filter(
        (_, index) => index !== state.editedIndex
      )
    })
  ),

  on(
    ShoppingListActions.startEdit,
    (state, action) => ({
      ...state, editedIndex:
      action.index
    })
  ),

  on(
    ShoppingListActions.stopEdit,
    (state) => ({
      ...state, editedIndex: -1
    })
  ),

  on(
    ShoppingListActions.setIngredients,
    (state, action) => ({
      ...state,
      ingredients: [ ...action.ingredients ],
      editedIndex: -1
    })
  )

);

export function shoppingListReducer(state: ShoppingListState, action: Action) {
  return _shoppingListReducer(state, action);
}
