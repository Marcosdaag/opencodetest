import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes } from '@nestjs/swagger';
import { StorageService } from './storage.service';

@ApiTags('storage')
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Subir archivo PDF (CV)' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Archivo subido exitosamente', schema: { example: { url: 'https://xxx.supabase.co/storage/v1/object/public/cvs/123-cv.pdf' } } })
  @ApiResponse({ status: 400, description: 'No se proporcionó archivo o no es PDF' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadCV(
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No se proporcionó ningún archivo');
    }

    if (file.mimetype !== 'application/pdf') {
      throw new BadRequestException('Solo se permiten archivos PDF');
    }

    if (file.size > 10 * 1024 * 1024) {
      throw new BadRequestException('El archivo no puede superar los 10MB');
    }

    const url = await this.storageService.uploadCV(
      file.buffer,
      file.originalname,
      file.mimetype,
    );

    return { url };
  }

  @Post('avatar')
  @ApiOperation({ summary: 'Subir imagen de perfil (avatar)' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Avatar subido exitosamente', schema: { example: { url: 'https://xxx.supabase.co/storage/v1/object/public/avatars/123-avatar.png' } } })
  @ApiResponse({ status: 400, description: 'No se proporcionó archivo o formato no válido' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No se proporcionó ningún archivo');
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('Solo se permiten imágenes JPG, PNG o WEBP');
    }

    if (file.size > 4 * 1024 * 1024) {
      throw new BadRequestException('El archivo no puede superar los 4MB');
    }

    const url = await this.storageService.uploadAvatar(
      file.buffer,
      file.originalname,
      file.mimetype,
    );

    return { url };
  }
}
