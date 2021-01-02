import { Ingredient } from "src/app/shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface ShoppingListState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIndex: number;
}

const initialState: ShoppingListState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editedIngredient: null,
  editedIndex: -1
};

export function shoppingListReducer(state: ShoppingListState = initialState, action: ShoppingListActions.AllActions) {
  switch(action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {...state, ingredients: [...state.ingredients, action.payload]};

    case ShoppingListActions.ADD_INGREDIENTS:
      return {...state, ingredients: [...state.ingredients, ...action.payload]};

    case ShoppingListActions.UPDATE_INGREDIENT:
      const updatedIngredient = {...action.payload};
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIndex] = updatedIngredient;
      return {...state, ingredients: updatedIngredients, editedIndex: -1, editedIngredient: null}

    case ShoppingListActions.DELETE_INGREDIENT:
      return {...state, ingredients: state.ingredients.filter((ingredient, index) => {
        return index !== state.editedIndex;
      }),
      editedIndex: -1,
      editedIngredient: null
    };

    case ShoppingListActions.START_EDIT:
      return {...state, editedIndex: action.payload, editedIngredient: {...state.ingredients[action.payload]}};

    case ShoppingListActions.STOP_EDIT:
      return {...state, editedIngredient: null, editedIndex: -1};

    default:
      return state;
  }
}
