import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import {CommonService} from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private  _commonService: CommonService
  ) { }

  canActivate(): boolean {
    if (this._authService.isLoggedIn()){
      return true;
    }else {
      this._commonService.navigateTo('auth');
      return false;
    }
  }
}
