export interface Topic {
  id: string;
  title: string;
  summary: string;
  sourceUrl: string;
  relevanceScore: number;
  createdAt: string;
}

export interface ContentDraft {
  id: string;
  topicId: string;
  newsletter: string;
  twitter: string;
  linkedin: string;
  instagram: string;
  status: 'draft' | 'scheduled' | 'published';
  scheduledAt?: string;
  createdAt: string;
}

export interface PlatformConfig {
  email: boolean;
  twitter: boolean;
  linkedin: boolean;
  instagram: boolean;
}

export interface UserSettings {
  niche: string;
  audienceDescription: string;
  tone: string;
  platforms: PlatformConfig;
}
