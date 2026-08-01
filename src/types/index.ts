// Shared data models for the DeployNXT website content.

export interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
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
  /** Local product image paths shown in the right-column slideshow */
  images: string[];
}

export interface BlogArticle {
  title: string;
  category: string;
  date: string;
  readTime: string;
  snippet: string;
  /** Cover image URL; falls back to a category-themed placeholder when absent */
  image?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  org: string;
  interest: string;
  message: string;
}
