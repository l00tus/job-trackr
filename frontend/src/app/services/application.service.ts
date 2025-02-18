import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

interface Application {
  user_id: string;
  job_title: string;
  company: string;
  location: string;
  job_link?: string;
  status: string;
  date?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private applicationAPI = 'http://localhost:3000/api/applications';

  constructor(private http: HttpClient) { }

  async createApplication(applicationObject: Application): Promise<any> {
    try {
      const response = await firstValueFrom(this.http.post(this.applicationAPI, applicationObject, {withCredentials: true}));
      return response;
    } catch (err) {
      console.error(err)
      return null;
    }
  }
}
