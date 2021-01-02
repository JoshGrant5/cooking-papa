import { Actions, ofType } from '@ngrx/effects';

import * as AuthActions from './auth.actions';

export class AuthEffects {

  // Actions effects are an obvservable that differ from the observables we use in the reducers => we do not change any state, but execute any other code (side effects) when the reducer actions are done
  constructor(private actions$: Actions) {}

  // ofType to specify to only continue in this observable chain if the action that we are reacting to is of type LOGIN_START (could add multiple here, but only specified the one)
  authLogin = this.actions$.pipe(ofType(AuthActions.LOGIN_START))
}
