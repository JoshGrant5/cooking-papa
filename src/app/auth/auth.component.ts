import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

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
    this.loading = true;

    if (this.loginMode) {
      //...
    } else {
      this.authService.signup(email, password).subscribe(response => {
        console.log(response);
        this.loading = false;
      },
        errorMessage => {
          this.error = errorMessage;
          this.loading = false;
        }
      );
    }
    form.reset();
  }

}
