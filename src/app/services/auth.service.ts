import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getToken(): string{
    return localStorage.getItem('token');
  }
  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }
}

