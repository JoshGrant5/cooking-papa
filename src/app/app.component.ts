import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private store: Store<fromApp.AppState>,
    @Inject(PLATFORM_ID) private platformId
  ) {}

  // With Angular Universal, our code is first rendered on the server now, not the browser. After first render on the server, then the app runs on the browser. This impacts our use of localStorage to set user data in auth.effects.ts with autoLogin, since localStorage is browser-only. As a fix, we inject a PLATFORM_ID with isPlatformBrowser. We can use this to check if our code is running on the browser, and only dispatch our autoLogin using localStorage if that is true

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(AuthActions.autoLogin());
    }
  }
}
