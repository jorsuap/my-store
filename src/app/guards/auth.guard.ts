import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { TokenService } from '../services/token/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private tokenService:TokenService,
    private authService:AuthService,
    private router:Router,

  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user$
    .pipe(
      map(user => {
        if(!user){
          this.router.navigate(['/home']);
          return false;
        }
        return true;
      })
    )

      // const token = this.tokenService.getToken();
    // if(!token){
    //   this.router.navigate(['/home']);
    //   return false;
    // }
    // return token ? true : false;
  }

}
