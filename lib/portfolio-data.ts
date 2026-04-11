export type FeaturedProject = {
  title: string
  category: string
  description: string
  tags: string[]
  image: string
  imageAlt: string
  link?: string
}

export const featuredProjects: FeaturedProject[] = [
  {
    title: "ChatApp",
    category: "Realtime Communication",
    description:
      "A realtime chat application with Google authentication and an AI chat feature.",
    tags: ["Realtime", "Socket.io", "AI", "Google Auth"],
    link: "https://chat-app-mvp.vercel.app",
    image: "/ChatAPP.png",
    imageAlt:
      "ChatApp interface showing real-time messaging with Google authentication and AI chat tools",
  },
  {
    title: "InXtract",
    category: "AI Document Summarizer",
    description:
      "A research paper summarizer where my work focused on integration and project delivery.",
    tags: ["Integration", "Project Management"],
    link: "https://inxtract.vercel.app",
    image: "/inxtractLanding.png",
    imageAlt:
      "InXtract landing page for AI-powered research paper summarization",
  },
  {
    title: "Triage it",
    category: "AI Sentiment Analysis",
    description:
      "A sentiment analysis tool that helps teams assess complaint criticality and draft responses.",
    tags: ["AI", "Sentiment Analysis", "Team Productivity"],
    link: "https://triage-it.vercel.app",
    image: "/Triage_it.png",
    imageAlt:
      "Triage it dashboard for sentiment analysis and complaint prioritization",
  },
  {
    title: "BankDash",
    category: "Banking Dashboard",
    description: "A virtual credit card tracker and expense management dashboard.",
    tags: ["Frontend Implementation", "UI/UX"],
    image: "/BankDashLanding.png",
    imageAlt:
      "BankDash banking dashboard with virtual credit cards and expense management",
  },
] 

export type FaqItem = {
  question: string
  answer: string
}

export const faqItems: FaqItem[] = [
  {
    question: "What does Mohammed Shemim specialize in?",
    answer:
      "Mohammed Shemim is a software engineer focused on full-stack web development, AI integration, product implementation, and internal tools that solve operational problems.",
  },
  {
    question: "What technologies does Mohammed Shemim use most often?",
    answer:
      "His work is centered on TypeScript, React, Next.js, Node.js, Python, Go, cloud tooling, and AI-enabled application workflows.",
  },
  {
    question: "Is Mohammed Shemim available for freelance or contract work?",
    answer:
      "Yes. The portfolio indicates he is available for new projects and open to discussing product builds, platform work, and technical collaboration.",
  },
  {
    question: "What kinds of projects are featured on this portfolio?",
    answer:
      "The featured work includes real-time communication software, AI document summarization, AI sentiment analysis, and dashboard-style product interfaces.",
  },
]
