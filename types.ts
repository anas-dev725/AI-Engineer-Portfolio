import React from 'react';

export interface Project {
  title: string;
  description: string;
  tags: string[];
  icon: string;
  link: string;
  category: string;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
}
