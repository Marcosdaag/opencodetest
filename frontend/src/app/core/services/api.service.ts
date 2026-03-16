import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile, CreateProfileDto } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api';

  checkUsername(username: string): Observable<{ available: boolean }> {
    return this.http.get<{ available: boolean }>(`${this.baseUrl}/profiles/check/${username}`);
  }

  createProfile(profile: CreateProfileDto): Observable<Profile> {
    return this.http.post<Profile>(`${this.baseUrl}/profiles`, profile);
  }

  getProfile(username: string): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseUrl}/profiles/${username}`);
  }

  getLinks(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/profiles/${username}/links`);
  }
}
