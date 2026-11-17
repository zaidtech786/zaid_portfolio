export const profile = {
  name: "Zaid Siddiqui",
  monogram: "ZS",
  role: "Full-Stack Software Engineer",
  email: "szaidtech@gmail.com",
  phone: "+91 8976096719",
  phoneHref: "tel:+918976096719",
  github: "https://github.com/zaidtech786",
  linkedin: "https://www.linkedin.com/in/zaid-siddiqui-73a731217/",
  resume: "/Zaid_Siddiqui_Resume.pdf",
  resumeFileName: "Zaid_Siddiqui_Resume.pdf",
  avatar: "/zaid_profile.png",
  location: "Mumbai / Remote",
  bio: "I build scalable backend APIs, multi-tenant enterprise platforms, and fast web applications using NestJS, Next.js, TypeScript, and PostgreSQL. Currently focused on clean system architecture, database performance, and practical AI integrations.",
  status: "Available for Full-Stack Roles",
} as const;

export const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export const heroTech = ["NestJS", "Next.js", "TypeScript", "PostgreSQL", "Redis", "AI/LLM"] as const;

export type Role = {
  company: string;
  title: string;
  type?: string;
  period: string;
  current?: boolean;
  bullets: string[];
  tech: string[];
};

export const experience: Role[] = [
  {
    company: "Newel Technologies Pvt. Ltd.",
    title: "Jr. Software Developer",
    period: "Sep 2025 – Present",
    current: true,
    bullets: [
      "Architected multi-tenant RBAC in NestJS and PostgreSQL using guards, decorators, and tenant-scoped queries.",
      "Cut P95 API latency by 35% with composite indexing and TypeORM query optimization, backed by Redis caching and async queues.",
      "Built Next.js and React analytics dashboards on top of the same typed API surface.",
    ],
    tech: ["NestJS", "PostgreSQL", "TypeORM", "Redis", "BullMQ", "Next.js", "React"],
  },
  {
    company: "JodeTx Technologies",
    title: "Jr. Software Developer",
    period: "June 2025 – Sep 2025",
    bullets: [
      "Implemented transactional workflows for AccountingX, keeping multi-step financial writes atomic and consistent.",
      "Delivered real-time Socket.IO streams for live updates, and Angular paginated views for large datasets.",
    ],
    tech: ["NestJS", "PostgreSQL", "Socket.IO", "Angular", "TypeScript"],
  },
  {
    company: "Nexsify Traders",
    title: "Full-Stack Developer",
    type: "Contract",
    period: "Jan 2025 – May 2025",
    bullets: [
      "Shipped real-time point redemption across web and React Native clients, with Redux Toolkit managing shared state.",
      "Fixed memory leaks and optimized polling to keep long-running sessions stable and lightweight.",
    ],
    tech: ["React", "React Native", "Redux Toolkit", "Node.js", "Express", "MongoDB"],
  },
  {
    company: "RampUp Infotech Pvt. Ltd.",
    title: "Full-Stack Developer Intern",
    period: "Oct 2024 – Jan 2025",
    bullets: [
      "Implemented stateless JWT auth and RBAC across Worker, Client, and Clerk portals for Moscare, a US healthcare platform.",
    ],
    tech: ["Node.js", "Express", "JWT", "React", "MongoDB"],
  },
];

export type Project = {
  title: string;
  kicker: string;
  problem: string;
  solution: string;
  implementation: string[];
  tech: string[];
  repo: string;
};

export const campusConnect: Project = {
  title: "Campus Connect",
  kicker: "Multi-Tenant Academic & Workflow Portal",
  problem:
    "Academic workflows such as approvals, course management, and records usually live in disconnected tools, with no clear boundary between what admins, faculty, and students can access.",
  solution:
    "A single portal with three role-specific experiences, where access is decided by the API rather than the UI, so each user only ever sees and changes what their role allows.",
  implementation: [
    "Three-portal RBAC (Admin, Faculty, Student) enforced on every API route",
    "JWT access tokens with refresh-token rotation for safer long-lived sessions",
    "Indexed MongoDB aggregation pipelines for fast, role-scoped queries",
  ],
  tech: ["Node.js", "TypeScript", "React", "MongoDB", "JWT", "RBAC"],
  repo: "https://github.com/zaidtech786",
};

export type WorkModule = {
  title: string;
  context: string;
  description: string;
  tech: string[];
};

export const workModules: WorkModule[] = [
  {
    title: "Multi-tenant RBAC",
    context: "Newel Technologies",
    description:
      "Tenant-scoped access control built with NestJS guards and PostgreSQL, so each organization's data stays isolated.",
    tech: ["NestJS", "PostgreSQL", "TypeORM"],
  },
  {
    title: "Real-time workflows",
    context: "JodeTx Technologies · Nexsify Traders",
    description:
      "Socket.IO streams for AccountingX transactional workflows, and real-time point redemption across web and React Native.",
    tech: ["Socket.IO", "React Native", "Redux Toolkit"],
  },
  {
    title: "API optimization",
    context: "Newel Technologies",
    description:
      "35% lower P95 latency through composite indexing, TypeORM query tuning, Redis caching, and async queues.",
    tech: ["PostgreSQL", "Redis", "BullMQ"],
  },
];

export type StackGroup = {
  title: string;
  items: string[];
};

export const stack: StackGroup[] = [
  {
    title: "Backend & APIs",
    items: ["TypeScript", "JavaScript", "NestJS", "Node.js", "Express", "BullMQ", "Socket.IO", "JWT", "RBAC"],
  },
  {
    title: "Frontend & Mobile",
    items: ["Next.js", "React", "React Native", "Angular", "Redux Toolkit"],
  },
  {
    title: "Databases & Caching",
    items: ["PostgreSQL", "TypeORM", "Redis", "MongoDB", "pgvector"],
  },
  {
    title: "AI Integration & DevOps",
    items: ["OpenAI API", "Gemini API", "LangChain.js", "RAG", "Docker", "AWS S3", "AWS EC2", "GitHub Actions", "Jest"],
  },
];

export const closingLine =
  "Open to full-time Full-Stack and Backend roles. If you are building something that needs to scale, I would like to hear about it.";
