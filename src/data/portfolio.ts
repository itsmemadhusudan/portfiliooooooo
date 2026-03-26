export type Project = {
  name: string;
  stack: string;
  description: string;
  highlights: string[];
};

export type PortfolioData = {
  name: string;
  designation: string;
  tagline: string;
  about: string[];
  skills: {
    backend: string[];
    frontend: string[];
    related: string[];
  };
  projects: Project[];
  contact: {
    email: string;
    linkedin: string;
    github: string;
  };
};

export const portfolioData: PortfolioData = {
  name: "Madhusudan Timalsina",
  designation: "Backend Developer",
  tagline:
    "I build reliable backend systems and scalable APIs while collaborating across full-stack teams to deliver user-focused products.",
  about: [
    "Backend-focused developer with hands-on experience building practical systems for education, commerce, and service platforms.",
    "Skilled in designing API-driven features, implementing business logic, and creating maintainable solutions that support real user outcomes.",
    "Comfortable working across frontend and backend when needed, with strong focus on clean architecture, performance, and delivery.",
  ],
  skills: {
    backend: ["Laravel", "Node.js", "Nest.js", "Python", "Express.js", "REST APIs"],
    frontend: ["React", "Next.js"],
    related: ["PostgreSQL", "MySQL", "MongoDB", "Git", "GitHub", "Docker"],
  },
  projects: [
    {
      name: "Management Information System",
      stack: "React + Node.js",
      description:
        "An online learning and examination platform that automates exam policies and certificate generation.",
      highlights: [
        "Students can study through online modules and learning content.",
        "Exam attempts are limited to three tries per learner.",
        "Certificates are generated automatically for students who pass.",
        "If a student fails, the system requires a penalty fee before re-attending the exam.",
      ],
    },
    {
      name: "Cloud Kitchen App",
      stack: "Flutter + Node.js",
      description:
        "A food delivery platform that helps housewives showcase cooking skills and earn income by serving local demand.",
      highlights: [
        "Creates opportunities for home cooks to offer meals through an app.",
        "Connects food makers with people who need quality home-cooked food.",
        "Supports ordering workflows that enable consistent earning.",
      ],
    },
    {
      name: "Yfasma",
      stack: "E-commerce Platform",
      description:
        "A premium clothing marketplace with custom order options and designer preference selection.",
      highlights: [
        "Supports buying and selling premium clothes.",
        "Includes customized cloth ordering based on customer preferences.",
        "Allows customers to choose their preferred designer for custom orders.",
      ],
    },
  ],
  contact: {
    email: "madhusudan@example.com",
    linkedin: "https://linkedin.com/in/madhusudan",
    github: "https://github.com/madhusudan",
  },
};
