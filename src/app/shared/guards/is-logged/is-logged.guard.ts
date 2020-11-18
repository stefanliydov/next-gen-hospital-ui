import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthKeywords } from '../../contants/contants';
import { CookieWrapperService } from '../../services/cookie-wrapper/cookie-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate {

  constructor(private cookieService: CookieWrapperService,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.cookieService.tokenExist(AuthKeywords.AUTH_TOKEN)) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}
