import { Action, createReducer, on } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import * as RecipesActions from '../store/recipe.actions';

export interface RecipeState {
  recipes: Recipe[];
}

const initialState: RecipeState = {
  recipes: []
}

const _recipeReducer = createReducer(

  initialState,

  on(
    RecipesActions.addRecipe,
    (state, action) => ({
      ...state,
      recipes: state.recipes.concat({ ...action.recipe })
    })
  ),

  on(
    RecipesActions.updateRecipe,
    (state, action) => ({
      ...state,
      recipes: state.recipes.map(
        (recipe, index) => index === action.index ? { ...action.recipe } : recipe
      )
    })
  ),

  on(
    RecipesActions.deleteRecipe,
    (state, action) => ({
      ...state,
      recipes: state.recipes.filter(
        (_, index) => index !== action.index
      )
    })
  ),

  on(
    RecipesActions.setRecipes,
    (state, action) => ({
      ...state,
      recipes: [ ...action.recipes ]
    })
  )

);

export function recipeReducer(state: RecipeState, action: Action) {
  return _recipeReducer(state, action);
}
