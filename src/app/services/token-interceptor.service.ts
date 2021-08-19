import { Injectable, Injector } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { AuthService } from './auth.service';
import {CommonService} from './common.service';
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService,
              private commonService: CommonService,
              private injector: Injector,
              private router: Router,) { }

  intercept(req, next) {
    const commonService = this.injector.get(CommonService);
    const authService = this.injector.get(AuthService);
    if (commonService.getURL() !== '/login' || commonService.getURL() !== '/register'){
      const tokenizedReq = req.clone({
        setHeaders: {
          Authorization : `Bearer ${authService.getToken()}`
        }
      });
      return next.handle(tokenizedReq).pipe(catchError(err => {
        if (err.status === 401) {
          this.authService.logout();
        }
        const error = err.error.message || err.statusText;
        return throwError(err.error);
      }));

    }
  }
}
