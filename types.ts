import React from 'react';

export interface Project {
  title: string;
  description: string;
  tags: string[];
  icon: string;
  link: string;
  category: string;
  audioUrl?: string;
  audioDuration?: string;
  audioSampleTitle?: string;
  previewImage?: string;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
  technologies?: string[];
  metrics?: { label: string; value: string }[];
  summary?: string;
}
