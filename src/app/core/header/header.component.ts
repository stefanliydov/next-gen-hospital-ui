import { Component } from '@angular/core';
import { AuthKeywords } from 'src/app/shared/contants/contants';
import { AuthorizationService } from 'src/app/shared/services/authorization/authorization.service';
import { CookieWrapperService } from 'src/app/shared/services/cookie-wrapper/cookie-wrapper.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  username: string

  constructor(
    private cookieService: CookieWrapperService,
    private userService: UserService,
  ) { }

  isLoggedIn() {
    if (this.cookieService.tokenExist(AuthKeywords.AUTH_TOKEN)) {
      this.username = this.userService.getLocalProperty(AuthKeywords.USERNAME);
      return true;
    }
    return false;
  }
  isPhysician(): boolean {
    return this.userService.isPhysician();
  }

}
