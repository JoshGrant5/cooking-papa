import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.AllActions) {
  switch(action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {...state, ingredients: [...state.ingredients, action.payload]};

    case ShoppingListActions.ADD_INGREDIENTS:
      return {...state, ingredients: [...state.ingredients, ...action.payload]};

    case ShoppingListActions.UPDATE_INGREDIENT:
      const updatedIngredient = {...action.payload.ingredient};
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[action.payload.index] = updatedIngredient;
      return {...state, ingredients: updatedIngredients}

    case ShoppingListActions.DELETE_INGREDIENT:
      return {...state, ingredients: state.ingredients.filter((ingredient, index) => {
        return index !== action.payload;
      })};

    default:
      return state;
  }
}
