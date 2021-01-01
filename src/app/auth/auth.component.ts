import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginMode: boolean = true;
  loading: boolean = false;
  error: string = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
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
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signup(email, password);
    }

    authObservable.subscribe(response => {
      console.log(response);
      this.loading = false;
    },
      errorMessage => {
        this.error = errorMessage;
        this.loading = false;
      }
    )

    form.reset();
  }

}
