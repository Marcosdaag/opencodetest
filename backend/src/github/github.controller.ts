import { Controller, Get, Param, Query } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('repos/:username')
  async getRepos(
    @Param('username') username: string,
    @Query('search') search?: string,
  ) {
    return this.githubService.getUserRepos(username, search);
  }

  @Get('user/:username')
  async getUser(@Param('username') username: string) {
    return this.githubService.getUser(username);
  }
}
