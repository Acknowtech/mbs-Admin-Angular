import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import {CommonService} from './common.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector) { }

  intercept(req, next) {
    const commonService = this.injector.get(CommonService);
    const authService = this.injector.get(AuthService);
    if (commonService.getURL() !== '/login' || commonService.getURL() !== '/register'){
      const tokenizedReq = req.clone({
        setHeaders: {
          Authorization : `Bearer ${authService.getToken()}`
        }
      });
      return next.handle(tokenizedReq);
    }
  }
}
