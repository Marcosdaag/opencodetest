import { IsString, IsOptional, IsEnum, IsArray, ValidateNested, MaxLength, IsUrl, Matches, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum LinkType {
  CV = 'CV',
  PORTFOLIO = 'PORTFOLIO',
  LINKEDIN = 'LINKEDIN',
  GITHUB = 'GITHUB',
  CUSTOM = 'CUSTOM',
}

export class CreateLinkDto {
  @ApiProperty({ enum: LinkType, enumName: 'LinkType' })
  @IsEnum(LinkType)
  type: LinkType;

  @ApiProperty({ maxLength: 500 })
  @IsString()
  @MaxLength(500)
  url: string;

  @ApiProperty({ maxLength: 100 })
  @IsString()
  @MaxLength(100)
  title: string;
}

export class CreateFeaturedRepoDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'https://github.com/user/repo' })
  @IsString()
  @IsUrl()
  url: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  stars?: number;
}

export class CreateProfileDto {
  @ApiProperty({ example: 'marcosdev', description: 'Username único (30 caracteres máx)' })
  @IsString()
  @MaxLength(30)
  @Matches(/^[a-zA-Z0-9_-]+$/, { message: 'Username solo puede contener letras, números, guiones y guiones bajos' })
  username: string;

  @ApiProperty({ example: 'Marcos Developer', maxLength: 100 })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({ example: 'Full Stack Developer', maxLength: 100 })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  jobTitle?: string;

  @ApiPropertyOptional({ example: 'Desarrollador con 5 años de experiencia', maxLength: 800 })
  @IsOptional()
  @IsString()
  @MaxLength(800)
  bio?: string;

  @ApiPropertyOptional({ example: 'github.com/marcosdev', description: 'Debe ser URL de perfil de usuario' })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  @Matches(/^github\.com\/[a-zA-Z0-9_-]+\/?$/, { message: 'GitHub URL debe ser un perfil de usuario (ej: github.com/usuario)' })
  githubUrl?: string;

  @ApiPropertyOptional({ example: 'https://www.linkedin.com/in/marcosdev' })
  @IsOptional()
  @IsString()
  @Matches(/^https?:\/\/(www\.)?linkedin\.com\/(in|pub)\/[a-zA-Z0-9_-]+\/?$/, { message: 'LinkedIn URL debe ser un perfil válido' })
  linkedinUrl?: string;

  @ApiPropertyOptional({ description: 'URL del CV subido a Storage' })
  @IsOptional()
  @IsString()
  cvUrl?: string;

  @ApiPropertyOptional({ type: [CreateLinkDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLinkDto)
  links?: CreateLinkDto[];

  @ApiPropertyOptional({ type: [CreateFeaturedRepoDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFeaturedRepoDto)
  featuredRepos?: CreateFeaturedRepoDto[];
}

export class UsernameCheckDto {
  @ApiProperty({ example: 'marcosdev' })
  @IsString()
  @MaxLength(30)
  username: string;
}
