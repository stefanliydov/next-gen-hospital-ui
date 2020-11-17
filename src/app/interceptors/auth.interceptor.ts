import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieWrapperService } from '../shared/services/cookie-wrapper/cookie-wrapper.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookeService: CookieWrapperService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.cookeService.getToken('auth_token');
    let headers = token
      ? {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
      : {};

    request = request.clone({
      url: `${request.url}`,
      setHeaders: headers,
    })
    return next.handle(request);
  }
}
