/**
 * StorageService - Servicio para subir archivos al storage
 * 
 * Este servicio permite subir archivos al backend que los guarda
 * en Supabase Storage.
 * 
 * Tipos de archivos soportados:
 * - CV: Solo PDF, máximo 10MB
 * - Avatar: JPG, PNG, WEBP, máximo 4MB
 * 
 * El backend valida el tipo y tamaño de archivo antes de guardar.
 */

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private http = inject(HttpClient);
  // URL del backend para endpoints de storage
  private baseUrl = 'https://opencodetest-l0bq.onrender.com/api/storage';

  /**
   * Sube un archivo PDF (CV) al storage
   * 
   * Validaciones del backend:
   * - Solo acepta archivos PDF
   - Tamaño máximo: 10MB
   * 
   * @param file - Archivo PDF a subir
   * @returns Observable con { url: string } - URL pública del archivo
   */
  uploadCV(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string }>(`${this.baseUrl}/upload`, formData);
  }

  /**
   * Sube una imagen de avatar al storage
   * 
   * Validaciones del backend:
   * - Solo acepta JPG, PNG, WEBP
   * - Tamaño máximo: 4MB
   * 
   * @param file - Imagen de perfil a subir
   * @returns Observable con { url: string } - URL pública de la imagen
   */
  uploadAvatar(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string }>(`${this.baseUrl}/avatar`, formData);
  }
}
