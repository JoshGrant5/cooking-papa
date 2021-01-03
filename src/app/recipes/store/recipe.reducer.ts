import { Recipe } from "../recipe.model";

import * as RecipesActions from './recipe.actions';

export interface RecipeState {
  recipes: Recipe[];
}

const initialState: RecipeState = {
  recipes: []
}

export function recipeReducer(state = initialState, action: RecipesActions.AllActions) {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {...state, recipes: [...action.payload]};



    default:
      return state;
  }
}
