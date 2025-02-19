import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userObject: User | null = null;
  private infoAPI = 'http://localhost:3000/api/users/info';
  private authCheckAPI = 'http://localhost:3000/api/users/auth-check';
  constructor(private http: HttpClient) {}

  async userLoggedIn(): Promise<boolean> {
    try {
      const response = await firstValueFrom(this.http.get<{ isLoggedIn: boolean }>(this.authCheckAPI, { withCredentials: true }));
      return response.isLoggedIn;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async fetchUser(): Promise<User | null> {
    if(this.userObject) {
      return this.userObject;
    }

    try {
      const response = await firstValueFrom(this.http.get<User>(this.infoAPI, { withCredentials: true }));
      this.userObject = response;
      return response;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
