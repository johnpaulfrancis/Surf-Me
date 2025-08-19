import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private jwtHelper = new JwtHelperService();
  private tokenKey = 'jwtKey';

  constructor() { }

  //Save JWT token after login
  setToken(token: string){
    localStorage.setItem(this.tokenKey, token);
  }

  //Get JWT token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  //Check if user is logged in
  isLoggedIn(): boolean{
    const token = this.getToken();
    return (token != null && !this.jwtHelper.isTokenExpired(token))
  }

  getLogginedUserName(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const decodedToken = this.jwtHelper.decodeToken(token);
    const loginUSerName = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    return loginUSerName || null;
  }

  //Logout user
  logoutUser(){
    localStorage.removeItem(this.tokenKey);
  }
}
