/**
 * GithubService - Servicio para integrar con la API de GitHub
 * 
 * Este servicio se comunica con el backend que hace de proxy
 * hacia la API pública de GitHub.
 * 
 * Funcionalidades:
 * - Obtener repositorios de un usuario
 * - Filtrar repositorios por nombre/búsqueda
 * - Obtener información básica del usuario
 * 
 * El backend cachea las respuestas para evitar límites de rate limit.
 */

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GithubRepo, GithubUser } from '../models/github.model';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private http = inject(HttpClient);
  // URL del backend que hace de proxy hacia GitHub API
  private baseUrl = 'https://opencodetest-l0bq.onrender.com/api/github';

  /**
   * Obtiene los repositorios públicos de un usuario de GitHub
   * 
   * @param username - Usuario de GitHub (sin github.com/)
   * @param search - Término de búsqueda opcional para filtrar repositorios
   * @returns Observable con array de repositorios
   */
  getRepos(username: string, search?: string): Observable<GithubRepo[]> {
    let params = new HttpParams().set('username', username);
    if (search) {
      params = params.set('search', search);
    }
    return this.http.get<GithubRepo[]>(`${this.baseUrl}/repos/${username}`, { params });
  }

  /**
   * Obtiene información básica de un usuario de GitHub
   * 
   * @param username - Usuario de GitHub a buscar
   * @returns Observable con datos del usuario (nombre, avatar, bio, etc.)
   */
  getUser(username: string): Observable<GithubUser> {
    return this.http.get<GithubUser>(`${this.baseUrl}/user/${username}`);
  }
}
