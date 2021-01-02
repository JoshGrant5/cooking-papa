import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginMode: boolean = true;
  loading: boolean = false;
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.store.select('auth').subscribe(authState => {
      this.loading = authState.loading;
      this.error = authState.authError;
    });
  }

  onSwitchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    // Create observable that we can subscribe to so we do not have to have the same code in the if/else block below
    let authObservable: Observable<AuthResponseData>;
    this.loading = true;

    if (this.loginMode) {
      this.store.dispatch(new AuthActions.LoginStart({email, password}));
    } else {
      authObservable = this.authService.signup(email, password);
    }



    // authObservable.subscribe(response => {
    //   console.log(response);
    //   this.loading = false;
    //   this.router.navigate(['/recipes']);
    // },
    //   errorMessage => {
    //     this.error = errorMessage;
    //     this.loading = false;
    //   }
    // )

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

}
