import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerAPI = 'http://localhost:3000/api/users/register';
  private loginAPI = 'http://localhost:3000/api/users/login';
  private checkAuthAPI = 'http://localhost:3000/api/users/check-auth'

  constructor(private http: HttpClient) { }

  register(userObj: any): Observable<any> {
    return this.http.post(this.registerAPI, userObj);
  }

  login(userObj: any): Observable<any> {
    return this.http.post(this.loginAPI, userObj, { withCredentials: true});
  }

  isLoggedIn(): Observable<any> {
    return this.http.get(this.checkAuthAPI, {withCredentials: true});
  }  
}
