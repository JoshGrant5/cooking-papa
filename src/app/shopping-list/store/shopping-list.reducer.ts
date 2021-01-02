import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ADD_INGREDIENT, ADD_INGREDIENTS, ShoppingListActions } from "./shopping-list.actions";

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions) {
  switch(action.type) {
    case ADD_INGREDIENT:
      return {...state, ingredients: [...state.ingredients, action.payload]};
    case ADD_INGREDIENTS:
      return {...state, ingredients: [...state.ingredients, ...action.payload]};
    default:
      return state;
  }
}
