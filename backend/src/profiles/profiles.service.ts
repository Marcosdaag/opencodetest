import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { ProfilesRepository } from './profiles.repository';
import { CreateProfileDto, UsernameCheckDto, LinkType } from './dto/profiles.dto';
import { Profile, Link, FeaturedRepo } from '@prisma/client';

export interface ProfileWithLinks extends Profile {
  links: Link[];
  githubRepos: FeaturedRepo[];
}

const DEFAULT_TITLES: Record<LinkType, string> = {
  [LinkType.GITHUB]: 'GitHub',
  [LinkType.LINKEDIN]: 'LinkedIn',
  [LinkType.CV]: 'Currículum',
  [LinkType.PORTFOLIO]: 'Portfolio',
  [LinkType.CUSTOM]: '',
};

@Injectable()
export class ProfilesService {
  constructor(private readonly profilesRepository: ProfilesRepository) {}

  async checkUsername(username: string): Promise<{ available: boolean }> {
    const exists = await this.profilesRepository.usernameExists(username);
    return { available: !exists };
  }

  async createProfile(dto: CreateProfileDto): Promise<Profile> {
    const exists = await this.profilesRepository.usernameExists(dto.username);
    if (exists) {
      throw new BadRequestException('El username ya está en uso');
    }

    const username = dto.username.toLowerCase();
    let githubUsername: string | undefined;

    if (dto.githubUrl) {
      const match = dto.githubUrl.match(/^github\.com\/([a-zA-Z0-9_-]+)\/?$/);
      if (match) {
        githubUsername = match[1];
      }
    }

    const linksData = dto.links?.map((link, index) => ({
      type: link.type,
      url: link.url,
      title: link.title || DEFAULT_TITLES[link.type] || 'Enlace',
      order: index,
    })) || [];

    const reposData = dto.featuredRepos?.map(repo => ({
      name: repo.name,
      description: repo.description,
      url: repo.url,
      stars: repo.stars || 0,
    })) || [];

    return this.profilesRepository.createProfile({
      username,
      name: dto.name,
      jobTitle: dto.jobTitle,
      bio: dto.bio,
      avatarUrl: dto.avatarUrl,
      githubUsername,
      linkedinUrl: dto.linkedinUrl,
      cvUrl: dto.cvUrl,
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
}
