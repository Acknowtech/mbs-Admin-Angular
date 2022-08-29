import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
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

  // canActivate(): boolean {
  //   if (this._authService.isLoggedIn()){
  //     return true;
  //   }else {
  //     this._commonService.navigateTo('login');
  //     return false;
  //   }
  // }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this._authService.isLoggedIn()){
      return true;
    }
    this._commonService.navigateTo('');
    return false;
  }
}
