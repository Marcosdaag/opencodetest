import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class StorageService {
  private readonly supabase: SupabaseClient;
  private readonly bucketName: string;

  constructor(private readonly configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL')!;
    const supabaseKey = this.configService.get<string>('SUPABASE_ANON_KEY')!;
    this.bucketName = this.configService.get<string>('SUPABASE_STORAGE_BUCKET') || 'cvs';
    
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async uploadCV(file: Buffer, filename: string, contentType: string): Promise<string> {
    if (!contentType || !contentType.includes('pdf')) {
      throw new BadRequestException('Solo se permiten archivos PDF');
    }

    const timestamp = Date.now();
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    const path = `cvs/${timestamp}-${sanitizedFilename}`;

    const { data, error } = await this.supabase.storage
      .from(this.bucketName)
      .upload(path, file, {
        contentType,
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      throw new BadRequestException(`Error al subir archivo: ${error.message}`);
    }

    const { data: urlData } = this.supabase.storage
      .from(this.bucketName)
      .getPublicUrl(path);

    return urlData.publicUrl;
  }

  async deleteCV(url: string): Promise<void> {
    const path = url.replace(/.*\/storage\/v1\/object\/public\/cvs\//, '');
    
    const { error } = await this.supabase.storage
      .from(this.bucketName)
      .remove([path]);

    if (error) {
      console.error('Error deleting CV:', error.message);
    }
  }

  async uploadAvatar(file: Buffer, filename: string, contentType: string): Promise<string> {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!contentType || !allowedTypes.includes(contentType)) {
      throw new BadRequestException('Solo se permiten imágenes JPG, PNG o WEBP');
    }

    const timestamp = Date.now();
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    const path = `avatars/${timestamp}-${sanitizedFilename}`;

    const { data, error } = await this.supabase.storage
      .from('avatars')
      .upload(path, file, {
        contentType,
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      throw new BadRequestException(`Error al subir avatar: ${error.message}`);
    }

    const { data: urlData } = this.supabase.storage
      .from('avatars')
      .getPublicUrl(path);

    return urlData.publicUrl;
  }
}
