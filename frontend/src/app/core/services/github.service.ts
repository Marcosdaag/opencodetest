import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GithubRepo, GithubUser } from '../models/github.model';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api/github';

  getRepos(username: string, search?: string): Observable<GithubRepo[]> {
    let params = new HttpParams().set('username', username);
    if (search) {
      params = params.set('search', search);
    }
    return this.http.get<GithubRepo[]>(`${this.baseUrl}/repos/${username}`, { params });
  }

  getUser(username: string): Observable<GithubUser> {
    return this.http.get<GithubUser>(`${this.baseUrl}/user/${username}`);
  }
}
