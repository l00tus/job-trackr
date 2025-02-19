import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Application } from '../models/application.model';
@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private applicationAPI = 'http://localhost:3000/api/applications';

  constructor(private http: HttpClient) { }

  async getApplicationsOfUser(user_id: string): Promise<Application[]> {
    try {
      const response = await firstValueFrom(this.http.get<Application[]>(this.applicationAPI + `/${user_id}`, { withCredentials: true }));
      return response;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async createApplication(applicationObject: Application): Promise<Application | null> {
    try {
      const response = await firstValueFrom(this.http.post<Application>(this.applicationAPI, applicationObject, { withCredentials: true }));
      return response;
    } catch (err) {
      console.error(err)
      return null;
    }
  }
}
