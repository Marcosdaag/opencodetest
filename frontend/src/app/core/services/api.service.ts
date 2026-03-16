/**
 * ApiService - Servicio principal para comunicarse con el backend
 * 
 * Este servicio encapsula todas las llamadas HTTP a la API del backend.
 * Utiliza HttpClient de Angular para realizar peticiones REST.
 * 
 * Endpoints disponibles:
 * - Perfiles: crear, obtener, verificar disponibilidad de username
 * - QR: obtener código QR de un perfil
 * 
 * Nota: La URL base está hardcodeada para producción.
 * Para desarrollo, cambiar a 'http://localhost:3000/api'
 */

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile, CreateProfileDto } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  // URL base del backend en producción (Render)
  private baseUrl = 'https://opencodetest-l0bq.onrender.com/api';

  /**
   * Verifica si un username está disponible
   * @param username - Username a verificar
   * @returns Observable con { available: boolean }
   */
  checkUsername(username: string): Observable<{ available: boolean }> {
    return this.http.get<{ available: boolean }>(`${this.baseUrl}/profiles/check/${username}`);
  }

  /**
   * Crea un nuevo perfil
   * Los perfiles son inmutables - una vez creados no se pueden modificar
   * @param profile - Datos del perfil a crear
   * @returns Observable con el perfil creado
   */
  createProfile(profile: CreateProfileDto): Observable<Profile> {
    return this.http.post<Profile>(`${this.baseUrl}/profiles`, profile);
  }

  /**
   * Obtiene un perfil público por su username
   * @param username - Username del perfil
   * @returns Observable con los datos del perfil
   */
  getProfile(username: string): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseUrl}/profiles/${username}`);
  }

  /**
   * Obtiene solo los links de un perfil
   * @param username - Username del perfil
   * @returns Observable con array de links
   */
  getLinks(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/profiles/${username}/links`);
  }

  /**
   * Obtiene el código QR de un perfil
   * El QR apunta a la URL del perfil y puede descargarse en PNG o SVG
   * @param username - Username del perfil
   * @returns Observable con { qrCodeUrl: string }
   */
  getProfileQR(username: string): Observable<{ qrCodeUrl: string }> {
    return this.http.get<{ qrCodeUrl: string }>(`${this.baseUrl}/profiles/${username}/qr`);
  }
}
