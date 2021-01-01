import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {

  loginMode: boolean = true;
  loading: boolean = false;
  error: string = null;
  private closeSubscription: Subscription;

  // Look for the existence of that type in the template => finds first instance of that type in template and store it in alertHost variable
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;

  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }

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
      this.router.navigate(['/recipes']);
    },
      errorMessage => {
        // this.error = errorMessage;
        this.showError(errorMessage);
        this.loading = false;
      }
    )

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  private showError(message: string) {
    // Create a component factory of type AlertComponent
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear(); // Clear all angular components that have been rendered in that place before declaring something new

    // use the componentFactory to create a new component in the viewContainerRef place in the DOM
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    // Instance property gives access to complete instance of this component (ie. properties, etc.)
    componentRef.instance.message = message;
    this.closeSubscription = componentRef.instance.close.subscribe(() => {
      // Clear the ViewContainerRef from the DOM once again
      this.closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy() {
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }

}
