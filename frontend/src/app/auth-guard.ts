import { Injectable, inject} from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  router=inject(Router)
  authService=inject(AuthenticationService)
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const username = localStorage.getItem('username');
    if (username) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
