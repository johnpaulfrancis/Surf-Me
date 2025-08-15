import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  //private loginUri = "https://localhost:7138/api/user/login";
  private loginUri = `${environment.apiBaseUrl}/user/login`;

  loginUserFunction(credentials : {UserName: string, Password: string}): Observable<any>{
    return this.http.post<any>(this.loginUri, credentials);
  }
}
