import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {CommonService} from '../services/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private  _commonService: CommonService
  ) { }

  canActivate(): boolean {
    if (this._authService.isLoggedIn()){
      return true;
    }else {
      this._commonService.navigateTo('login');
      return false;
    }
  }
}
