import type { ExperienceEntry, PortfolioData, Project } from "@/data/portfolio";

type SeedShape = Omit<
  PortfolioData,
  | "education"
  | "projects"
  | "experiences"
  | "strengths"
  | "heroEyebrow"
  | "heroImageSrc"
  | "heroImageAlt"
  | "heroStackLine"
  | "siteTitle"
  | "siteDescription"
  | "ogTitle"
  | "ogDescription"
  | "sectionEyebrow"
  | "pageHeaders"
  | "navLinks"
> & {
  education: Omit<PortfolioData["education"][number], "id">[];
  projects: Omit<Project, "id">[];
  experiences: Omit<ExperienceEntry, "id">[];
  strengths: Omit<PortfolioData["strengths"][number], "id">[];
};

/** Static snapshot used only by `npm run db:seed`. Public site reads SQLite. */
export const portfolioSeedData: SeedShape = {
  name: "Madhusudan Timalsina",
  designation: "Backend & Full-Stack Developer",
  tagline:
    "I build reliable backend systems and scalable APIs while collaborating across full-stack teams to deliver user-focused products.",
  summary:
    "Detail-oriented BCIS student and developer with a strong interest in building web and mobile products that solve real problems through practical, user-focused technology.",
  about: [
    "Backend-focused developer with hands-on experience building practical systems for education, commerce, and service platforms.",
    "Skilled in designing API-driven features, implementing business logic, and creating maintainable solutions that support real user outcomes.",
    "Comfortable working across frontend and backend when needed, with strong focus on clean architecture, performance, and delivery.",
    "Recent work includes a Management Information System for online learning and exams (attempt limits, pass/fail rules, and automatic certificates) and marketplace-style products such as Yfasma (fashion) and Thrift Books (second-hand books), where database design and full-stack delivery mattered end to end.",
    "Mobile experience spans Flutter and React Native—for example a cloud-kitchen style flow connecting home kitchens with customers (Swaad Sathi) and tools for personal fitness tracking (Gym App with SQLite).",
  ],
  education: [
    {
      degree: "Bachelor in Computer Information System",
      institution: "Apex College",
      duration: "2020 - 2026",
    },
    {
      degree: "Secondary Level",
      institution: "Advance Academy",
      duration: "2015 - 2017",
    },
  ],
  skills: {
    backend: ["Laravel", "Node.js", "Nest.js", "Python", "Express.js", "REST APIs"],
    frontend: ["React", "Next.js", "Flutter", "React Native", "HTML", "CSS"],
    related: [
      "Web Design",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "SQLite",
      "Git",
      "GitHub",
      "Docker",
      "Backend Tech",
      "Frontend Coding",
      "Database",
      "Database Administration",
      "AI Chatbot Manual Training",
      "API integration (web & mobile)",
      "Authentication & session flows",
    ],
    soft: [
      "Design Thinking",
      "Problem-Solving",
      "Project Management Tools",
      "Strong Communication",
      "Team Collaboration",
      "Leadership",
      "Computer Literacy",
    ],
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
      stack: "Laravel + Web",
      description:
        "A premium clothing marketplace with custom order options and designer preference selection.",
      highlights: [
        "Supports buying and selling premium clothes.",
        "Includes customized cloth ordering based on customer preferences.",
        "Allows customers to choose their preferred designer for custom orders.",
      ],
    },
    {
      name: "Thrift Books",
      stack: "Web + Database",
      description:
        "A college project for buying and selling second-hand books with dynamic frontend and backend support.",
      highlights: [
        "Focused on database administration and website design.",
        "Enabled listing and discovery for second-hand books.",
        "Implemented both frontend and backend features in one flow.",
      ],
    },
    {
      name: "Gym App",
      stack: "Flutter + SQLite",
      description:
        "A personal fitness tracker app to monitor daily activities and maintain progress records.",
      highlights: [
        "Built using Flutter for frontend experience.",
        "Used SQLite for local data persistence.",
        "Designed for practical personal use and habit tracking.",
      ],
    },
  ],
  experiences: [
    {
      role: "Smartsarks",
      duration: "Current",
      points: [
        "Working as a developer on real-world application tasks.",
        "Supporting feature implementation and overall product improvement.",
        "Growing practical industry experience through active team collaboration.",
      ],
    },
    {
      role: "Thrift Books (College Project)",
      duration: "July - September 2023",
      points: [
        "Worked on database administration and website design.",
        "Built features for buying and selling second-hand books.",
        "Contributed to dynamic frontend and backend development.",
      ],
    },
    {
      role: "Yfasma",
      duration: "May - July",
      points: [
        "Handled database administration and website design tasks.",
        "Built a clothing platform for affordable designer wear.",
        "Learned practical Laravel website development.",
      ],
    },
    {
      role: "Swaad Sathi",
      duration: "May - July",
      points: [
        "Worked on frontend design and development for a food app.",
        "Connected tenants with home kitchens through a cloud kitchen model.",
        "Gained experience in Flutter, React Native, and AI chatbot training.",
      ],
    },
    {
      role: "Gym App",
      duration: "September - October",
      points: [
        "Built the frontend with Flutter and stored data using SQLite.",
        "Created the app as a personal activity tracking tool.",
      ],
    },
  ],
  achievements: [
    "Maintained strong grades in key IT courses.",
    "Helped organize tech events and workshops in college.",
    "Self-learned web development and databases through continuous study.",
    "Served as class representative of 42 students.",
    "Mentored a full section in SMART and received Best Team recognition twice.",
    "Worked as a judge in the SMART program.",
    "Shipped end-to-end features across Laravel, Node, and mobile stacks for real clients and college projects.",
    "Contributed to production-style delivery while studying BCIS at Apex College.",
  ],
  focusAreas: [
    "Backend API architecture and business logic",
    "Database-oriented problem solving",
    "Education and commerce platform workflows",
    "Cross-functional teamwork and delivery",
  ],
  currentlyLearning: [
    "Advanced Laravel patterns",
    "Scalable Nest.js architecture",
    "System design fundamentals",
    "AI-powered assistant workflows",
  ],
  currentWork: {
    company: "Smartsarks",
    role: "Developer",
    status: "Currently Working",
    highlights: [
      "Contributing to practical software development tasks and feature implementation.",
      "Collaborating with team members on web-focused solutions and delivery timelines.",
      "Strengthening hands-on experience in backend and full-stack workflows.",
    ],
  },
  contact: {
    phone: "+977-9861333037",
    email: "madhusudantimalsina607@gmail.com",
    linkedin: "https://www.linkedin.com/in/madhusudan-timalsina-75a910183/",
    github: "https://github.com/itsmemadhusudan",
    location: "Kathmandu, Nepal",
  },
  availability:
    "Open to internships, junior developer roles, freelance work, and team projects—remote-friendly from Kathmandu or hybrid when it fits.",
  services: [
    "Backend API development (Laravel, Node.js, Nest.js)",
    "Full-stack college and startup-style project builds",
    "Database design, administration, and integration",
    "Web and mobile feature implementation (React, Next.js, Flutter, React Native)",
    "Exam, certificate, and policy-driven workflows (educational platforms)",
    "AI chatbot training and integration support where manual tuning is required",
  ],
  metrics: [
    { value: "23+", label: "Completed Projects" },
    { value: "6+", label: "Core Technologies" },
    { value: "100%", label: "Client-Focused Delivery" },
  ],
  strengths: [
    {
      title: "API-first, product-minded backend",
      description:
        "I focus on clean REST-style APIs, sensible data models, and endpoints that are easy for web and mobile teams to integrate.",
    },
    {
      title: "Real systems, not demo code",
      description:
        "From exam rules and certificates to orders and cloud-kitchen flows, I implement business logic that matches how users actually behave.",
    },
    {
      title: "Reliable delivery & teamwork",
      description:
        "I communicate clearly, iterate with feedback, and ship readable, maintainable code—currently growing this further as a developer at Smartsarks.",
    },
  ],
  languages: ["English", "Nepali"],
  interests: [
    "EdTech and exam / certification workflows",
    "Marketplace and e-commerce backends",
    "Food-tech and service platforms (ordering, cloud-kitchen models)",
    "Clean APIs for web and mobile clients",
    "Mentoring and peer learning (SMART, class rep)",
  ],
  totalProjectsLabel: "23+",
};
