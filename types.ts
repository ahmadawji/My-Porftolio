
export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  description: string[];
  techStack: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  location: string;
  period: string;
  details: string;
}

export interface BoardItem {
  id: string;
  title: string;
  description: string;
  type: 'work' | 'personal';
  tags: string[];
}

export interface BoardColumn {
  id: string;
  title: string;
  items: BoardItem[];
}
