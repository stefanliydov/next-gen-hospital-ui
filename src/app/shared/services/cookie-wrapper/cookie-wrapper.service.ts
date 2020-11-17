import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service/';

@Injectable({
  providedIn: 'root'
})
export class CookieWrapperService {

  constructor(private cookieService: CookieService) { }

  getToken(token: string) {
    return this.cookieService.get(token);
  }

  tokenExist(token: string) {
    return this.cookieService.check(token);
  }

  extractJwtToken(token: string) {

    if (this.getToken(token)) {
      token = this.getToken(token);
    }

    return JSON.parse(atob(token.split('.')[1]));
  }

  deleteToken(token: string) {
    this.cookieService.delete(token, '/');
  }

  deleteAll() {
    this.cookieService.deleteAll('/');
  }

  setToken(name: string, token: string, expire?: Date) {
    this.cookieService.set(name, token, expire, '/');
  }

}
