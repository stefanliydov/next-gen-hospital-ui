import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIUrl, AuthKeywords } from '../../contants/contants';
import { IUserLogin } from '../../model/IUserLogin';
import { IUserRegister } from '../../model/IUserRegister';
import { CookieWrapperService } from '../cookie-wrapper/cookie-wrapper.service';
import { StorageService } from '../storage-service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {



  constructor(private http: HttpClient,
    private cookieService: CookieWrapperService,
    private storageService: StorageService) { }

  login(user: IUserLogin) {
    return this.http.post(`${APIUrl.BACK_END_URL}/login`, user);

  };

  register(user: IUserRegister) {
    return this.http.post(`${APIUrl.BACK_END_URL}/register`, user);
  }


  logout(): void {
    this.cookieService.deleteToken(AuthKeywords.AUTH_TOKEN);
    this.storageService.removeUser();
  }

}
