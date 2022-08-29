import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public router: Router) { }

  getToken(): string{
    return localStorage.getItem('token');
  }
  isLoggedIn()
  {
    let token=localStorage.getItem("token");
    if(token==undefined || token==='' ||  token==null)
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  logout() {

    localStorage.clear();
    // @ts-ignore
    // window.location.reload();
  }
}

