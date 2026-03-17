export type LinkType = 'PORTFOLIO' | 'LINKEDIN' | 'GITHUB';

export interface Link {
  id: string;
  type: LinkType;
  url: string;
  title: string;
  order: number;
  profileId: string;
}

export interface FeaturedRepo {
  id: string;
  name: string;
  description: string | null;
  url: string;
  stars: number;
  profileId: string;
}

export interface Profile {
  id: string;
  username: string;
  name: string;
  jobTitle: string | null;
  bio: string | null;
  avatarUrl: string | null;
  githubUsername: string | null;
  linkedinUrl: string | null;
  cvUrl: string | null;
  qrCodeUrl: string | null;
  createdAt: string;
  links: Link[];
  githubRepos: FeaturedRepo[];
}

export interface CreateProfileDto {
  username: string;
  name: string;
  jobTitle?: string;
  bio?: string;
  avatarUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  links: CreateLinkDto[];
  featuredRepos: CreateFeaturedRepoDto[];
}

export interface CreateLinkDto {
  type: LinkType;
  url: string;
}

export interface CreateFeaturedRepoDto {
  name: string;
  description?: string;
  url: string;
  stars: number;
}
