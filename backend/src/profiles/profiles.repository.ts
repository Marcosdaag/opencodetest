import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Profile, Link, FeaturedRepo, Prisma } from '@prisma/client';

@Injectable()
export class ProfilesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUsername(username: string): Promise<Profile & { links: Link[]; githubRepos: FeaturedRepo[] } | null> {
    return this.prisma.profile.findUnique({
      where: { username: username.toLowerCase() },
      include: {
        links: {
          orderBy: { order: 'asc' },
        },
        githubRepos: true,
      },
    });
  }

  async usernameExists(username: string): Promise<boolean> {
    const count = await this.prisma.profile.count({
      where: { username: username.toLowerCase() },
    });
    return count > 0;
  }

  async createProfile(data: Prisma.ProfileCreateInput): Promise<Profile> {
    return this.prisma.profile.create({
      data,
    });
  }
}
