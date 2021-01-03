import { Action } from "@ngrx/store";

export const LOGIN_START = 'LOGIN_START';
export const AUTHENTICATED = 'AUTHENTICATED';
export const AUTHENTICATE_FAIL = 'AUTHENTICATE_FAIL';
export const SIGNUP_START = 'SIGNUP_START';
export const LOGOUT = 'LOGOUT';

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: {email: string, password: string}) {}
}

export class Authenticated implements Action {
  readonly type = AUTHENTICATED;
  constructor(public payload: {
    email: string,
    userId: string,
    token: string,
    expirationDate: Date
  }) {}
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;
  constructor(public payload: string) {}
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;
  constructor(public payload: {email: string, password: string}) {};
}

export class Logout implements Action {
  readonly type = LOGOUT;
}


export type AllActions =
  Authenticated
  | Logout
  | LoginStart
  | AuthenticateFail
  | SignupStart;