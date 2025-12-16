export interface Project {
  title: string;
  description: string;
  tags: string[];
  icon: string;
  link?: string;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
}

export interface SkillData {
  name: string;
  level: number; // 0-100
  // Updated to include new categories used in the application
  category: 'Automation' | 'AI/ML' | 'Development' | 'Data' | 'Frontend' | 'Backend' | 'Tools' | 'AI Tools' | 'GenAI' | 'Voice AI' | 'ML';
}