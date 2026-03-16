import { IsString, IsOptional, IsEnum, IsArray, ValidateNested, MaxLength, IsUrl, Matches, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export enum LinkType {
  CV = 'CV',
  PORTFOLIO = 'PORTFOLIO',
  LINKEDIN = 'LINKEDIN',
  GITHUB = 'GITHUB',
  CUSTOM = 'CUSTOM',
}

export class CreateLinkDto {
  @IsEnum(LinkType)
  type: LinkType;

  @IsString()
  @MaxLength(500)
  url: string;

  @IsString()
  @MaxLength(100)
  title: string;
}

export class CreateFeaturedRepoDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @IsUrl()
  url: string;

  @IsOptional()
  @IsNumber()
  stars?: number;
}

export class CreateProfileDto {
  @IsString()
  @MaxLength(30)
  @Matches(/^[a-zA-Z0-9_-]+$/, { message: 'Username solo puede contener letras, números, guiones y guiones bajos' })
  username: string;

  @IsString()
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  jobTitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(800)
  bio?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  @Matches(/^github\.com\/[a-zA-Z0-9_-]+\/?$/, { message: 'GitHub URL debe ser un perfil de usuario (ej: github.com/usuario)' })
  githubUrl?: string;

  @IsOptional()
  @IsString()
  @Matches(/^https?:\/\/(www\.)?linkedin\.com\/(in|pub)\/[a-zA-Z0-9_-]+\/?$/, { message: 'LinkedIn URL debe ser un perfil válido' })
  linkedinUrl?: string;

  @IsOptional()
  @IsString()
  cvUrl?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLinkDto)
  links?: CreateLinkDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFeaturedRepoDto)
  featuredRepos?: CreateFeaturedRepoDto[];
}

export class UsernameCheckDto {
  @IsString()
  @MaxLength(30)
  username: string;
}
