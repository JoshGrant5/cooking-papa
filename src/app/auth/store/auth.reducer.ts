import { User } from "../user.model";
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

export function authReducer(state = initialState, action: AuthActions.AllActions) {
  switch (action.type) {
    case AuthActions.AUTHENTICATED:
    const user = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate);
    return {...state, user: user, authError: null, loading: false};

    case AuthActions.LOGOUT:
      return {...state, user: null};

    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {...state, authError: null, loading: true};

    case AuthActions.AUTHENTICATE_FAIL:
      return {...state, user: null, authError: action.payload, loading: false};

    case AuthActions.CLEAR_ERROR:
      return {...state, authError: null};

    default:
      return state;
  }
}
