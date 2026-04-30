export type Project = {
  id: number;
  name: string;
  stack: string;
  description: string;
  highlights: string[];
};

export type EducationEntry = {
  id: number;
  degree: string;
  institution: string;
  duration: string;
};

export type ExperienceEntry = {
  id: number;
  role: string;
  duration: string;
  points: string[];
};

export type PageHeaderEntry = {
  slug: string;
  title: string;
  description: string;
};

export type NavLinkEntry = {
  id: number;
  label: string;
  href: string;
};

export type PortfolioData = {
  name: string;
  designation: string;
  tagline: string;
  summary: string;
  about: string[];
  education: EducationEntry[];
  skills: {
    backend: string[];
    frontend: string[];
    related: string[];
    soft: string[];
  };
  projects: Project[];
  experiences: ExperienceEntry[];
  achievements: string[];
  focusAreas: string[];
  currentlyLearning: string[];
  currentWork: {
    company: string;
    role: string;
    status: string;
    highlights: string[];
  };
  contact: {
    phone: string;
    email: string;
    linkedin: string;
    github: string;
    location: string;
  };
  availability: string;
  services: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  strengths: {
    id: number;
    title: string;
    description: string;
  }[];
  languages: string[];
  interests: string[];
  /** Shown in Projects section (e.g. "23+") */
  totalProjectsLabel: string;
  /** Hero + home metrics area */
  heroEyebrow: string;
  heroImageSrc: string;
  heroImageAlt: string;
  heroStackLine: string;
  /** Root layout metadata & Open Graph */
  siteTitle: string;
  siteDescription: string;
  ogTitle: string | null;
  ogDescription: string | null;
  /** Eyebrow on inner pages (PageHeader) */
  sectionEyebrow: string;
  pageHeaders: PageHeaderEntry[];
  /** Visible nav links only, sorted */
  navLinks: NavLinkEntry[];
};

export function getPageCopy(data: PortfolioData, slug: string): { title: string; description: string } {
  const h = data.pageHeaders.find((x) => x.slug === slug);
  return {
    title: h?.title ?? slug,
    description: h?.description ?? "",
  };
}
