import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { firebaseAPIKey } from "firebase";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

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

@Injectable({providedIn: 'root'})
export class AuthService {

  // Regular Subject - to which we can subscribe and get info whenever new data is emitted
  user = new BehaviorSubject<User>(null);
  // BehaviorSubject also gives subscribers immediate access to previously emitted value, even if they haven't subscribed at the time it was submitted

  // token: string;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseAPIKey}`, {email, password, returnSecureToken: true})
    .pipe(catchError(this.handleError), tap(response => {
      this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn);
    }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseAPIKey}`, {email, password, returnSecureToken: true})
    .pipe(catchError(this.handleError), tap(response => {
      this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn);
    }));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/authentication']);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expDate = new Date(new Date().getTime() + expiresIn * 1000);
      const user = new User(email, userId, token, expDate);
      this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unkown error occured';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
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
    return throwError(errorMessage);
  }

}
