import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * StorageService - Servicio para gestionar archivos en Supabase Storage
 * 
 * Este servicio maneja la subida y eliminación de archivos en Supabase.
 * Se utiliza para:
 * - Subir CVs (PDF)
 * - Subir avatares de perfil (imágenes)
 * 
 * El servicio usa un único bucket configurado en las variables de entorno,
 * organizando los archivos en subcarpetas (cvs/ y avatars/).
 */

@Injectable()
export class StorageService {
  // Cliente de Supabase para operaciones de storage
  private readonly supabase: SupabaseClient;
  // Nombre del bucket configurado (por defecto: 'cv')
  private readonly bucketName: string;

  constructor(private readonly configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL')!;
    // Se usa SERVICE_KEY porque se requieren permisos de escritura
    const serviceKey = this.configService.get<string>('SUPABASE_SERVICE_KEY')!;
    this.bucketName = this.configService.get<string>('SUPABASE_STORAGE_BUCKET') || 'cv';
    
    this.supabase = createClient(supabaseUrl, serviceKey);
  }

  /**
   * Sube un archivo PDF (CV) al storage
   * 
   * Validaciones:
   * - Solo acepta archivos PDF (content-type: application/pdf)
   * - El archivo se guarda en la subcarpeta 'cvs/' dentro del bucket
   * 
   * @param file - Buffer del archivo PDF
   * @param filename - Nombre original del archivo
   * @param contentType - Tipo MIME del archivo
   * @returns URL pública del archivo guardado
   */
  async uploadCV(file: Buffer, filename: string, contentType: string): Promise<string> {
    // Validar que sea un PDF
    if (!contentType || !contentType.includes('pdf')) {
      throw new BadRequestException('Solo se permiten archivos PDF');
    }

    // Generar nombre de archivo único con timestamp para evitar colisiones
    const timestamp = Date.now();
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    // Guardar en subcarpeta 'cvs/' dentro del bucket
    const path = `cvs/${timestamp}-${sanitizedFilename}`;

    // Subir archivo a Supabase Storage
    const { data, error } = await this.supabase.storage
      .from(this.bucketName)
      .upload(path, file, {
        contentType,
        cacheControl: '3600',  // Cache de 1 hora
        upsert: false,         // No sobrescribir si existe
      });

    if (error) {
      throw new BadRequestException(`Error al subir archivo: ${error.message}`);
    }

    // Obtener URL pública del archivo
    const { data: urlData } = this.supabase.storage
      .from(this.bucketName)
      .getPublicUrl(path);

    return urlData.publicUrl;
  }

  /**
   * Elimina un archivo CV del storage
   * 
   * @param url - URL pública del archivo a eliminar
   */
  async deleteCV(url: string): Promise<void> {
    // Extraer la ruta del archivo desde la URL pública
    const path = url.replace(/.*\/storage\/v1\/object\/public\/cv\//, '');
    
    const { error } = await this.supabase.storage
      .from(this.bucketName)
      .remove([path]);

    if (error) {
      console.error('Error deleting CV:', error.message);
    }
  }

  /**
   * Sube una imagen de avatar al storage
   * 
   * Validaciones:
   * - Solo acepta JPG, PNG o WEBP
   * - El archivo se guarda en la subcarpeta 'avatars/' dentro del bucket
   * 
   * @param file - Buffer de la imagen
   * @param filename - Nombre original del archivo
   * @param contentType - Tipo MIME de la imagen
   * @returns URL pública de la imagen guardada
   */
  async uploadAvatar(file: Buffer, filename: string, contentType: string): Promise<string> {
    // Tipos de imagen permitidos
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!contentType || !allowedTypes.includes(contentType)) {
      throw new BadRequestException('Solo se permiten imágenes JPG, PNG o WEBP');
    }

    // Generar nombre de archivo único con timestamp
    const timestamp = Date.now();
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    // Guardar en subcarpeta 'avatars/' dentro del bucket
    const path = `avatars/${timestamp}-${sanitizedFilename}`;

    // Subir archivo a Supabase Storage
    const { data, error } = await this.supabase.storage
      .from(this.bucketName)
      .upload(path, file, {
        contentType,
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      throw new BadRequestException(`Error al subir avatar: ${error.message}`);
    }

    // Obtener URL pública de la imagen
    const { data: urlData } = this.supabase.storage
      .from(this.bucketName)
      .getPublicUrl(path);

    return urlData.publicUrl;
  }
}
