import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto, UsernameCheckDto } from './dto/profiles.dto';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get('check/:username')
  async checkUsername(@Param('username') username: string) {
    return this.profilesService.checkUsername(username);
  }

  @Post()
  async createProfile(@Body() dto: CreateProfileDto) {
    return this.profilesService.createProfile(dto);
  }

  @Get(':username')
  async getProfile(@Param('username') username: string) {
    return this.profilesService.getProfileByUsername(username);
  }

  @Get(':username/links')
  async getLinks(@Param('username') username: string) {
    return this.profilesService.getLinksByUsername(username);
  }
}
