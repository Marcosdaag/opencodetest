import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { GithubService } from './github.service';

@ApiTags('github')
@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('repos/:username')
  @ApiOperation({ summary: 'Obtener repositorios de un usuario de GitHub' })
  @ApiParam({ name: 'username', description: 'Username de GitHub' })
  @ApiQuery({ name: 'search', required: false, description: 'Filtrar repositorios por nombre/descripción' })
  @ApiResponse({ status: 200, description: 'Lista de repositorios' })
  @ApiResponse({ status: 400, description: 'Usuario no encontrado' })
  async getRepos(
    @Param('username') username: string,
    @Query('search') search?: string,
  ) {
    return this.githubService.getUserRepos(username, search);
  }

  @Get('user/:username')
  @ApiOperation({ summary: 'Obtener información de un usuario de GitHub' })
  @ApiParam({ name: 'username', description: 'Username de GitHub' })
  @ApiResponse({ status: 200, description: 'Información del usuario' })
  @ApiResponse({ status: 400, description: 'Usuario no encontrado' })
  async getUser(@Param('username') username: string) {
    return this.githubService.getUser(username);
  }
}
