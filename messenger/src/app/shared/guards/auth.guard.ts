import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../shared/services/authorization/auth.service';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.user$.pipe(
      take(1),
      map(user => !!user), // <-- map to boolean
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('access denied');
          this.router.navigate(['/sign-in']);
        } else {
          return true;
        }
      }));
  }
}
