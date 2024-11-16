import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: any;
  private infoAPI = 'http://localhost:3000/api/users/info';
  constructor(private http: HttpClient) {}

  async fetchUser(): Promise<void> {
    return firstValueFrom(this.http.get(this.infoAPI, { withCredentials: true }))
      .then((response) => {
        this.user = response;
      })
      .catch((err) => {
        console.error("Error fetching user information", err);
      });
  }

  getUsername(): string {
    if(this.user.username) {
      return this.user.username;
    } else {
      return '';
    }
  }
}
