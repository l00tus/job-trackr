import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerAPI = 'http://localhost:3000/api/users/register';
  private loginAPI = 'http://localhost:3000/api/users/login';

  constructor(private http: HttpClient) { }

  //TODO: HANDLE ALL HTTP REQUESTS WITH PROMISES
  register(userObj: any): Observable<any> {
    return this.http.post(this.registerAPI, userObj);
  }

  login(userObj: any): Promise<any> {
    return firstValueFrom(this.http.post(this.loginAPI, userObj, { withCredentials: true }));
  }
}
