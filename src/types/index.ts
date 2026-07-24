// Shared data models for the DeployNXT website content.

export interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  experience: string[];
  linkedinUrl: string;
  initials: string;
  avatarUrl?: string;
}

export interface SpaceProduct {
  id: string;
  name: string;
  caption: string;
  description: string;
  badges: string[];
  specs: Record<string, string>;
  details: string[];
}

export interface BlogArticle {
  title: string;
  category: string;
  date: string;
  readTime: string;
  snippet: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  org: string;
  interest: string;
  message: string;
}
