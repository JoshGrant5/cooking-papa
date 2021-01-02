import { User } from "../user.model";
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: null
};

export function authReducer(state = initialState, action: AuthActions.AllActions) {
  switch (action.type) {
    case AuthActions.LOGIN:
    const user = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate);
    return {...state, user: user};

    case AuthActions.LOGOUT:
      return {...state, user: null};

    default:
      return state;
  }
}
