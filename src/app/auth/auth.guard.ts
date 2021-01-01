import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.authService.user.pipe(take(1), map(user => {
      // !! converts a truthy value to true, and a falsey value to false
      const isAuth = !!user;
      if (isAuth) {
        return true;
      }
      return this.router.createUrlTree(['/authentication']);
    }));
  }
}
