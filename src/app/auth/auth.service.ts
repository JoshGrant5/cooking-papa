import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

// Define what our response object we get back from Firebase will look like
interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${process.env.FIREBASE_KEY}`, {email, password, returnSecureToken: true});
  }
}
