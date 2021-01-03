import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import * as AuthActions from './auth.actions';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

// Define what our response object we get back from Firebase will look like
export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

 // At this stage we have a successfully logged in user, so we want to return an observable that holds our login action
const handleAuthentication = (email: string, userId: string, token: string, expiresIn: number) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return AuthActions.authenticated({email, userId, token, expirationDate, redirect: true});
}

const handleError = (errorRes: any) => {
  let errorMessage = 'An unkown error occured';
  if (!errorRes.error || !errorRes.error.error) {
    // of is utility funciton for creating a new observable
    return of(AuthActions.authenticateFail({errorMessage}));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email already exists';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is incorrect';
      break;
  }
  // Return a new action (return a new observable)
  return of(AuthActions.authenticateFail({errorMessage}));
}

@Injectable()
export class AuthEffects {

  // Actions effects are an obvservable that differ from the observables we use in the reducers => we do not change any state, but execute any other code (side effects) when the reducer actions are done
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  authSignup$ = createEffect(() =>
    this.actions$.pipe(ofType(AuthActions.signupStart), switchMap(action => {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`, {
      email: action.email,
      password: action.password,
      returnSecureToken: true
    })
    .pipe(
      tap(resData => {
        this.authService.setLogoutTimer(+resData.expiresIn * 1000);
      }),
      map(resData => {
        return handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }),
      catchError(errorRes => {
        return handleError(errorRes);
      })
    );
  })));

  // ofType to specify to only continue in this observable chain if the action that we are reacting to is of type LOGIN_START (could add multiple here, but only specified the one)
  authLogin$ = createEffect(() =>
    this.actions$.pipe(ofType(AuthActions.loginStart),
    // use switchMap to create a new observable which takes another observable's data (AuthActions.LoginStart)
    switchMap(action => {
      return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`, {
        email: action.email,
        password: action.password,
        returnSecureToken: true
      })
      // Call pipe on inner observable (not on overall chain). With catchError, we must return a non-error observable so that our overall stream does not die => since switchMap returns a result of the inner observable stream as a new observable to the outer chain, returning a non-error observable in catchError is crucial so that we still yeild a non-error observable to be picked up by switchMap and returned to the overall stream
      .pipe(
        tap(resData => {
          this.authService.setLogoutTimer(+resData.expiresIn * 1000);
        }),
        map(resData => {
          return handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }),
        catchError(errorRes => {
          return handleError(errorRes);
        })
      );
    })
  ));

  authRedirect$ = createEffect(() =>
    this.actions$.pipe(ofType(AuthActions.authenticated), tap(action =>
      action.redirect && this.router.navigate(['/']))
    ), { dispatch: false }
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(ofType(AuthActions.autoLogin), map(() => {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
      const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
      if (loadedUser.token) {
        const timeTillAutoLogout = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.authService.setLogoutTimer(timeTillAutoLogout);
        return AuthActions.authenticated({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate),
          redirect: false
        });
      }
      return { type: 'No Effect' };
    } else {
      return { type: 'No Effect' };
    }
  })));

  authLogout$ = createEffect(() =>
    this.actions$.pipe(ofType(AuthActions.logout), tap(() => {
    this.authService.clearLogoutTimer();
    localStorage.removeItem('userData');
    this.router.navigate(['/authentication']);
  })));

}
