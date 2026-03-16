import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
}

@Injectable()
export class GithubService {
  private readonly client: AxiosInstance;
  private readonly token: string | undefined;

  constructor(private readonly configService: ConfigService) {
    this.token = this.configService.get<string>('GITHUB_TOKEN');
    
    this.client = axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        ...(this.token ? { 'Authorization': `token ${this.token}` } : {}),
      },
    });
  }

  async getUserRepos(username: string, search?: string): Promise<GithubRepo[]> {
    try {
      const response = await this.client.get(`/users/${username}/repos`, {
        params: {
          sort: 'updated',
          per_page: 100,
          direction: 'desc',
        },
      });

      let repos: GithubRepo[] = response.data;

      if (search && search.trim()) {
        const searchLower = search.toLowerCase();
        repos = repos.filter(
          repo =>
            repo.name.toLowerCase().includes(searchLower) ||
            (repo.description && repo.description.toLowerCase().includes(searchLower)) ||
            (repo.language && repo.language.toLowerCase().includes(searchLower))
        );
      }

      return repos.map(repo => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        stargazers_count: repo.stargazers_count,
        language: repo.language,
        updated_at: repo.updated_at,
      }));
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new BadRequestException('Usuario de GitHub no encontrado');
      }
      if (error.response?.status === 403) {
        throw new BadRequestException('Límite de solicitudes a GitHub alcanzado. Intenta más tarde.');
      }
      throw new BadRequestException('Error al obtener repositorios de GitHub');
    }
  }

  async getUser(username: string): Promise<any> {
    try {
      const response = await this.client.get(`/users/${username}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new BadRequestException('Usuario de GitHub no encontrado');
      }
      throw new BadRequestException('Error al obtener usuario de GitHub');
    }
  }

  validateGithubUrl(url: string): { valid: boolean; username?: string } {
    const match = url.match(/^github\.com\/([a-zA-Z0-9_-]+)\/?$/);
    if (match) {
      return { valid: true, username: match[1] };
    }
    return { valid: false };
  }
}
