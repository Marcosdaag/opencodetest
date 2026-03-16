import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/profiles.dto';

@ApiTags('profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get('check/:username')
  @ApiOperation({ summary: 'Verificar disponibilidad de username' })
  @ApiParam({ name: 'username', description: 'Username a verificar' })
  @ApiResponse({ status: 200, description: 'Retorna si el username está disponible' })
  async checkUsername(@Param('username') username: string) {
    return this.profilesService.checkUsername(username);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo perfil (inmutable)' })
  @ApiBody({ type: CreateProfileDto })
  @ApiResponse({ status: 201, description: 'Perfil creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Username ya en uso o datos inválidos' })
  async createProfile(@Body() dto: CreateProfileDto) {
    return this.profilesService.createProfile(dto);
  }

  @Get(':username')
  @ApiOperation({ summary: 'Obtener perfil público por username' })
  @ApiParam({ name: 'username', description: 'Username del perfil' })
  @ApiResponse({ status: 200, description: 'Perfil encontrado' })
  @ApiResponse({ status: 404, description: 'Perfil no encontrado' })
  async getProfile(@Param('username') username: string) {
    return this.profilesService.getProfileByUsername(username);
  }

  @Get(':username/links')
  @ApiOperation({ summary: 'Obtener solo los links de un perfil' })
  @ApiParam({ name: 'username', description: 'Username del perfil' })
  @ApiResponse({ status: 200, description: 'Links del perfil' })
  @ApiResponse({ status: 404, description: 'Perfil no encontrado' })
  async getLinks(@Param('username') username: string) {
    return this.profilesService.getLinksByUsername(username);
  }

  @Get(':username/qr')
  @ApiOperation({ summary: 'Obtener código QR del perfil' })
  @ApiParam({ name: 'username', description: 'Username del perfil' })
  @ApiResponse({ status: 200, description: 'QR del perfil' })
  @ApiResponse({ status: 404, description: 'QR no encontrado' })
  async getProfileQR(@Param('username') username: string) {
    return this.profilesService.getProfileQR(username);
  }
}
