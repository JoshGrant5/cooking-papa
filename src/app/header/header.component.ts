import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  collapsed = true;
  private userSub: Subscription;
  authenticated: boolean = false;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.userSub = this.store.select('auth')
    // get back the authState object with a user key
      .pipe(map(authState => authState.user))
      // subscribe to the user key
      .subscribe(user => {
        this.authenticated = !user ? false : true;
      });
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
