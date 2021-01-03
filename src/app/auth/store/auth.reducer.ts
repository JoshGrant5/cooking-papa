import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  authError: null,
  loading: false
};

const _authReducer = createReducer(

  initialState,

  on(
    AuthActions.loginStart,
    AuthActions.signupStart,
    (state) => ({
      ...state,
      authError: null,
      loading: true
    })
  ),

  on(
    AuthActions.authenticated,
    (state, action) => ({
      ...state,
      authError: null,
      loading: false,
      user: new User(
        action.email,
        action.userId,
        action.token,
        action.expirationDate
      )
    })
  ),

  on(
    AuthActions.authenticateFail,
    (state, action) => ({
      ...state,
      user: null,
      authError: action.errorMessage,
      loading: false
    })
  ),

  on(
    AuthActions.logout,
    (state) => ({
      ...state,
      user: null
    })
  ),

  on(
    AuthActions.clearError,
    (state) => ({
      ...state,
      authError: null
    })
  ),

);

export function authReducer(state: AuthState, action: Action) {
  return _authReducer(state, action);
}
