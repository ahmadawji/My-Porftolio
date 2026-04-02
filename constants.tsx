
import React from 'react';
import { ExperienceItem, SkillCategory, EducationItem, SocialLink, BlogPost } from './types';
import { Github, Linkedin, Mail, FileText, Smartphone, Terminal, Database, Palette, Layout } from 'lucide-react';

export const PERSONAL_INFO = {
  name: "Ahmed Awji",
  title: "Frontend Engineer",
  email: "ahmedawji@outlook.com",
  phone: "+961 70 948 022",
  location: "Saida, Lebanon",
  tagline: "Building scalable, accessible, and interactive web experiences.",
  summary: "Results-driven Frontend Engineer with 3+ years of specialized experience in Veeva Vault RIM administration and enterprise software development. Uniquely positioned to bridge the gap between complex pharmaceutical business requirements and technical implementation. Expert in building performant, single-page applications using React, TypeScript, and Vite, with a proven track record of architecting deep domain-specific tools like the \"Source of Information\" module."
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/ahmed-awji/",
    icon: "linkedin"
  },
  {
    name: "Email",
    url: "mailto:ahmedawji@outlook.com",
    icon: "mail"
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "cloudgate-carter",
    company: "CloudGate Consulting",
    role: "Frontend Engineer (CARTER – Vault RIM Cartography)",
    location: "Remote",
    period: "2023 — Present",
    description: [
      "Worked on the development of various modules translating complex RIM business logic into intuitive user interfaces.",
      "Diagnosed and resolved critical rendering bottlenecks. Optimized table scrolling and pagination, reducing initial load time by 40%.",
      "Implemented interactive implementations of hierarchical Tree views and Dependency tables, enabling users to visualize relationships between hundreds of Document Types and Fields.",
      "Refactored legacy table implementations into a highly reusable Table component, standardizing filtering, sorting, and pagination logic across the entire application.",
      "API Integration: Implemented robust data fetching layers using TanStack Query and Orval, minimizing payload overhead and ensuring real-time synchronization with Veeva Vault data models."
    ],
    techStack: ["React", "TypeScript", "Vite", "TanStack Query", "Orval", "Veeva Vault RIM"]
  },
  {
    id: "cloudgate-axisconnect",
    company: "CloudGate Consulting",
    role: "Frontend Engineer (AxisConnect Platform)",
    location: "Remote",
    period: "2023 — Present",
    description: [
      "Collaborated on the development of a social networking and organizational management platform featuring distinct portals for Members, Organization Admins, and Super Admins.",
      "Developed permission gates for Group Leaders and Admins to manage members, content moderation, and organization settings.",
      "Event & Job Management: Built interactive calendar views for event tracking and a comprehensive job board with application workflows and \"sticky\" job postings.",
      "Interactive Modules: Created a dynamic \"Self-Assessment\" tool with multi-stage questionnaires and instant result visualization to guide user career development."
    ],
    techStack: ["React", "TypeScript", "Zustand", "Tailwind CSS"]
  },
  {
    id: "cloudgate-sanofi",
    company: "CloudGate Consulting",
    role: "Technical Expert System Admin (Veeva Vault RIM)",
    location: "Remote",
    period: "2023 — 2025",
    description: [
      "Served as one of the primary technical experts on Veeva Vault RIM configuration, providing critical insights that drove the architectural design of the custom \"Cartography\" frontend solution.",
      "Translated business needs regarding Document Lifecycles, Field Dependencies, and configurations into technical specifications for the development team.",
      "Managed and optimized Vault configurations, ensuring compliance with pharmaceutical regulatory standards while improving system usability for end-users."
    ],
    techStack: ["Veeva Vault RIM", "System Administration", "Pharma Compliance"]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Mastering State Management with Zustand",
    excerpt: "Why I moved away from Redux and how Zustand simplified our complex social network state architecture.",
    date: "May 12, 2024",
    readTime: "5 min read",
    category: "Architecture",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
    tags: ["React", "Zustand", "State"]
  },
  {
    id: "2",
    title: "Complex Data Visualization in React",
    excerpt: "Exploring the power of React Flow and Nivo for building interactive node-based editors and dashboards.",
    date: "April 28, 2024",
    readTime: "8 min read",
    category: "Data Viz",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
    tags: ["React Flow", "Nivo", "Canvas"]
  },
  {
    id: "3",
    title: "Optimizing Performance in Large Scale Apps",
    excerpt: "Practical tips on reducing re-renders and optimizing bundle size using TanStack Query and React 19.",
    date: "March 15, 2024",
    readTime: "6 min read",
    category: "Performance",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
    tags: ["Performance", "Query", "React"]
  }
];

export const EDUCATION_DATA: EducationItem = {
  institution: "Lebanese International University",
  degree: "Bachelors in Computer Science",
  location: "Sidon",
  period: "Graduated with 3.7 GPA",
  details: "Graduated with a Bachelors in Computer Science. Excelled in coursework and earned a 50% scholarship for the duration of the program, graduating with a 3.7 GPA."
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "SQL"]
  },
  {
    title: "Frameworks & Libraries",
    skills: ["React.js (v18)", "Next.js", "TanStack Query", "Zustand", "Jest", "Vitest"]
  },
  {
    title: "UI/UX",
    skills: ["Ant Design", "Material UI", "Styled Components", "Tailwind CSS", "Responsive Design"]
  }
];

export const ICON_MAP: Record<string, React.ElementType> = {
  linkedin: Linkedin,
  github: Github,
  mail: Mail,
  file: FileText,
  code: Terminal,
  layout: Layout,
  database: Database,
  design: Palette,
  mobile: Smartphone
};
