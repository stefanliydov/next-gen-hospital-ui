import { Injectable } from '@angular/core';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';
import { AuthKeywords, Roles } from '../../contants/contants';
import { CookieWrapperService } from '../cookie-wrapper/cookie-wrapper.service';
import { StorageService } from '../storage-service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private storageService: StorageService,
    private cookieService: CookieWrapperService
  ) { }

  setLocalProperty(key: string, value: any): void {
    this.storageService.saveProperty(key, value);
  }

  getLocalProperty(key: string): string {
    return this.storageService.getProperty(key);
  }

  isPhysician(): boolean {
    if (this.cookieService.tokenExist(AuthKeywords.AUTH_TOKEN) && this.getLocalProperty(AuthKeywords.ROLES)) {
      return this.getLocalProperty(AuthKeywords.ROLES).indexOf(Roles.MEDICAL_PHYSICIAN) !== -1;
    }
    return false;
  }
}
