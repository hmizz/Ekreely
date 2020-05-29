// what does guard mean: angular adds some interfaces your classes
// can implement which forces the classes to add cetrain methods which
// the angular router can execute before it loads a route to check wether it
// should procede or do something else "exp of interface: canActivate"

import { CanActivate,
   ActivatedRouteSnapshot,
    RouterStateSnapshot,
     UrlTree,
      Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | import('rxjs').Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isAuth = this.authService.getIsAuth();
    if (!isAuth) {
      this.router.navigate(['/login']);
    }
    return isAuth;
  }
}
