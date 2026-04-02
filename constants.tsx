
import React from 'react';
import { ExperienceItem, SkillCategory, EducationItem, SocialLink, BoardColumn } from './types';
import { Github, Linkedin, Mail, FileText, Smartphone, Terminal, Database, Palette, Layout } from 'lucide-react';

export const PERSONAL_INFO = {
  name: "Ahmed Awji",
  title: "Frontend Engineer",
  email: "ahmedawji@outlook.com",
  phone: "+96170948022",
  location: "Beirut, Lebanon",
  tagline: "Building scalable, accessible, and interactive web experiences.",
  summary: "Dynamic Frontend Engineer with over 4 years of experience in crafting innovative web applications and enhancing user experiences. Expertise in utilizing modern JavaScript frameworks, particularly React, to build scalable and responsive user interfaces, ensuring optimal performance and accessibility. Proficient in collaborating with cross-functional teams to deliver complex projects, while maintaining rigorous documentation standards and code quality through comprehensive testing practices."
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
    id: "cloudgate",
    company: "Cloudgate Consulting",
    role: "Frontend Engineer",
    location: "Dubai",
    period: "Aug 2022 — Present",
    description: [
      "Social Network Architecture: Collaborated with cross-functional teams to engineer and deploy a scalable social networking platform using React JS and Zustand for complex state management.",
      "Data Visualization & Analytics: Utilized React Flow for a building node-based editor and Vault RIM object monitoring. Implemented interactive dashboards using Nivo, handling complex object dependencies efficiently with RESTful APIs and TanStack React Query.",
      "Responsive UI Implementation: Translated high-fidelity Figma mockups into pixel-perfect interfaces using Ant Design (Antd) components and modern layout techniques, ensuring cross-browser compatibility.",
      "Technical Documentation: Authored comprehensive documentation outlining system architecture, API endpoints, and component usage to streamline onboarding."
    ],
    techStack: ["React", "TypeScript", "Zustand", "React Flow", "Nivo", "TanStack Query", "Ant Design", "Figma"]
  },
  {
    id: "hks",
    company: "HKS Services",
    role: "Frontend Engineer",
    location: "Dubai",
    period: "Jan 2023 — May 2024",
    description: [
      "Reusable Component Library: Developed reusable components using Storybook, enabling isolated development while maintaining high-quality standards.",
      "Quality Assurance: Conducted detailed code reviews and utilized testing tools such as Jest and React Testing Library to guarantee reliability in a Fintech environment where compliance and trust are paramount.",
      "UI Consistency: Validated designs and incorporated feedback to align the final product with user expectations."
    ],
    techStack: ["React", "Storybook", "Jest", "React Testing Library", "Fintech"]
  }
];

export const EDUCATION_DATA: EducationItem = {
  institution: "Lebanese International University",
  degree: "Bachelors in Computer Sciences",
  location: "Sidon",
  period: "Oct 2018 — Jul 2022",
  details: "Graduated with a CS degree. Excelled in coursework and earned a 50% scholarship for the duration of the program, graduating with a 3.7 GPA."
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend Core",
    skills: ["React JS", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "RTL Support"]
  },
  {
    title: "State & Data",
    skills: ["Zustand", "TanStack Query", "Redux", "RESTful APIs", "Axios"]
  },
  {
    title: "UI & Design",
    skills: ["Tailwind CSS", "Ant Design", "MUI (Material UI)", "Figma", "Responsive Design", "Flexbox/Grid"]
  },
  {
    title: "Testing & Tools",
    skills: ["Jest", "React Testing Library", "Storybook", "Git/GitHub", "Bitbucket", "Postman", "Technical Documentation"]
  },
  {
    title: "Backend & Misc",
    skills: ["NodeJS", "ExpressJS", "PostgreSQL", "AI Prompting", "Scrum/Agile"]
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

export const BOARD_DATA: BoardColumn[] = [
  {
    id: "planned",
    title: "Planned",
    items: [
      {
        id: "p1",
        title: "Learn Next.js 14",
        description: "Explore App Router, Server Actions, and partial prerendering.",
        type: "personal",
        tags: ["Next.js", "React"]
      },
      {
        id: "p2",
        title: "Advanced WebGL",
        description: "Deep dive into Three.js and custom shaders.",
        type: "personal",
        tags: ["WebGL", "Three.js"]
      }
    ]
  },
  {
    id: "in-progress",
    title: "In Progress",
    items: [
      {
        id: "ip1",
        title: "Zustand Architecture",
        description: "Implementing complex state management for social network features.",
        type: "work",
        tags: ["Zustand", "Architecture"]
      },
      {
        id: "ip2",
        title: "Performance Optimization",
        description: "Reducing re-renders and bundle size using React 19 features.",
        type: "work",
        tags: ["Performance", "React"]
      }
    ]
  },
  {
    id: "completed",
    title: "Completed",
    items: [
      {
        id: "c1",
        title: "React Flow Dashboard",
        description: "Built a node-based editor and interactive dashboard.",
        type: "work",
        tags: ["React Flow", "Nivo"]
      },
      {
        id: "c2",
        title: "Storybook Component Library",
        description: "Developed reusable components with isolated testing.",
        type: "work",
        tags: ["Storybook", "Design System"]
      },
      {
        id: "c3",
        title: "Mastering Tailwind CSS",
        description: "Learned advanced utility classes and custom configurations.",
        type: "personal",
        tags: ["Tailwind", "CSS"]
      }
    ]
  }
];
