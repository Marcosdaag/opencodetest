export type LinkType = 'CV' | 'PORTFOLIO' | 'LINKEDIN' | 'GITHUB' | 'CUSTOM';

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
  githubUsername: string | null;
  linkedinUrl: string | null;
  cvUrl: string | null;
  createdAt: string;
  links: Link[];
  githubRepos: FeaturedRepo[];
}

export interface CreateProfileDto {
  username: string;
  name: string;
  jobTitle?: string;
  bio?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  cvUrl?: string;
  links: CreateLinkDto[];
  featuredRepos: CreateFeaturedRepoDto[];
}

export interface CreateLinkDto {
  type: LinkType;
  url: string;
  title: string;
}

export interface CreateFeaturedRepoDto {
  name: string;
  description?: string;
  url: string;
  stars: number;
}
