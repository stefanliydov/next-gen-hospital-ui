import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthKeywords } from 'src/app/shared/contants/contants';
import { IUserLogin } from 'src/app/shared/model/IUserLogin';
import { AuthorizationService } from 'src/app/shared/services/authorization/authorization.service';
import { CookieWrapperService } from 'src/app/shared/services/cookie-wrapper/cookie-wrapper.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
    private authorizationService: AuthorizationService,
    private cookieService: CookieWrapperService,
    private router: Router,
    private userService: UserService) { }

  onSubmit() {
    const user: IUserLogin = this.extractUserFromForm();
    this.authorizationService.login(user).pipe(take(1)).subscribe(
      data => this.handleSuccessfullLogin(data),
      error => this.handleErrors(error));
  }

  private extractUserFromForm(): IUserLogin {
    return {
      username: this.loginForm.get("username").value,
      password: this.loginForm.get("password").value
    }
  }

  private handleSuccessfullLogin(response) {
    if (response[AuthKeywords.JWT]) {
      const extracted = this.cookieService.extractJwtToken(response[AuthKeywords.JWT]);
      const date = this.setExpireData(extracted.exp);
      this.cookieService.setToken(AuthKeywords.AUTH_TOKEN, response[AuthKeywords.JWT], date);
      this.setStorageProperty(AuthKeywords.USERNAME, extracted.sub);
      this.setStorageProperty(AuthKeywords.ROLES, extracted.roles);
      this.router.navigate(['/']);
    }
  }

  private handleErrors(err: HttpErrorResponse) {
    if (err.status == 401) {
      alert(err.error.error);
    }
  }

  private setExpireData(extractedDate: number): Date {
    const time = new Date(0);
    time.setUTCSeconds(extractedDate);
    return time;
  }

  private setStorageProperty(key: string, value: any): void {
    this.userService.setLocalProperty(key, value);
  }

}
