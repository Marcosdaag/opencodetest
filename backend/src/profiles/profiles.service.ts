import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProfilesRepository } from './profiles.repository';
import { CreateProfileDto, UsernameCheckDto, LinkType } from './dto/profiles.dto';
import { Profile, Link, FeaturedRepo } from '@prisma/client';
import * as QRCode from 'qrcode';

/**
 * Interfaz que extiende Profile para incluir las relaciones
 * Se utiliza cuando necesitamos acceder a los links y repositorios del perfil
 */
export interface ProfileWithLinks extends Profile {
  links: Link[];
  githubRepos: FeaturedRepo[];
}

/**
 * Títulos por defecto para cada tipo de link
 * Se usan cuando el usuario no proporciona un título personalizado
 */
const DEFAULT_TITLES: Record<LinkType, string> = {
  [LinkType.GITHUB]: 'GitHub',
  [LinkType.LINKEDIN]: 'LinkedIn',
  [LinkType.PORTFOLIO]: 'Portfolio',
};

@Injectable()
export class ProfilesService {
  constructor(
    private readonly profilesRepository: ProfilesRepository,
    private readonly configService: ConfigService
  ) {}

  /**
   * Verifica si un username está disponible
   * @param username - Username a verificar
   * @returns Objeto con propiedad available (boolean)
   */
  async checkUsername(username: string): Promise<{ available: boolean }> {
    const exists = await this.profilesRepository.usernameExists(username);
    return { available: !exists };
  }

  /**
   * Crea un nuevo perfil de usuario
   * 
   * Proceso:
   * 1. Verifica que el username no esté en uso
   * 2. Valida que no haya links duplicados (excepto CUSTOM)
   * 3. Extrae el username de GitHub de la URL proporcionada
   * 4. Genera el código QR con la URL del perfil
   * 5. Guarda todo en la base de datos
   * 
   * @param dto - Datos del perfil a crear
   * @returns Perfil creado
   */
  async createProfile(dto: CreateProfileDto): Promise<Profile> {
    // Verificar que el username no exista
    const exists = await this.profilesRepository.usernameExists(dto.username);
    if (exists) {
      throw new BadRequestException('El username ya está en uso');
    }

    // Validar links duplicados: solo se permite 1 de cada tipo
    if (dto.links && dto.links.length > 0) {
      const types = dto.links.map(l => l.type);
      const uniqueTypes = new Set(types);
      if (uniqueTypes.size !== types.length) {
        throw new BadRequestException('Solo puedes agregar un link de cada tipo (Portfolio, LinkedIn, GitHub).');
      }
    }

    const username = dto.username.toLowerCase();
    let githubUsername: string | undefined;

    // Extraer username de GitHub de la URL (si se proporciona)
    if (dto.githubUrl) {
      const match = dto.githubUrl.match(/^github\.com\/([a-zA-Z0-9_-]+)\/?$/);
      if (match) {
        githubUsername = match[1];
      }
    }

    // Mapear los links del DTO al formato de la base de datos
    const linksData = dto.links?.map((link, index) => ({
      type: link.type,
      url: link.url,
      title: DEFAULT_TITLES[link.type] || 'Enlace',
      order: index,
    })) || [];

    // Mapear los repositorios destacados
    const reposData = dto.featuredRepos?.map(repo => ({
      name: repo.name,
      description: repo.description,
      url: repo.url,
      stars: repo.stars || 0,
    })) || [];

    // Obtener la URL del frontend desde variables de entorno
    const frontendUrl = this.configService.get<string>('FRONTEND_URL') || 'https://devtreekz.vercel.app';
    const profileUrl = `${frontendUrl}/${username}`;
    
    // Generar código QR con la URL del perfil
    // El QR se genera como DataURL (imagen base64) y se guarda en la BD
    const qrCodeDataUrl = await QRCode.toDataURL(profileUrl, {
      width: 400,
      margin: 2,
      color: {
        dark: '#0f172a',  // Color de los módulos oscuros
        light: '#ffffff'  // Color del fondo
      },
      errorCorrectionLevel: 'M'  // Nivel de corrección de errores medio
    });

    return this.profilesRepository.createProfile({
      username,
      name: dto.name,
      jobTitle: dto.jobTitle,
      bio: dto.bio,
      avatarUrl: dto.avatarUrl,
      githubUsername,
      linkedinUrl: dto.linkedinUrl,
      qrCodeUrl: qrCodeDataUrl,
      links: {
        create: linksData,
      },
      githubRepos: {
        create: reposData,
      },
    });
  }

  async getProfileByUsername(username: string): Promise<ProfileWithLinks> {
    const profile = await this.profilesRepository.findByUsername(username);
    if (!profile) {
      throw new NotFoundException('Perfil no encontrado');
    }
    return profile;
  }

  async getLinksByUsername(username: string): Promise<Link[]> {
    const profile = await this.profilesRepository.findByUsername(username);
    if (!profile) {
      throw new NotFoundException('Perfil no encontrado');
    }
    return profile.links;
  }

  async getProfileQR(username: string): Promise<{ qrCodeUrl: string }> {
    const profile = await this.profilesRepository.findByUsername(username);
    if (!profile) {
      throw new NotFoundException('Perfil no encontrado');
    }
    if (!profile.qrCodeUrl) {
      throw new NotFoundException('QR no encontrado');
    }
    return { qrCodeUrl: profile.qrCodeUrl };
  }
}
