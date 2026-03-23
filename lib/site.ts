export const siteConfig = {
  name: "Mohammed Shemim Portfolio",
  personName: "Mohammed Shemim",
  title: "Mohammed Shemim - Software Engineer | Full-Stack Developer",
  shortTitle: "Mohammed Shemim - Software Engineer",
  description:
    "Software engineer specializing in full-stack development, AI integration, and building scalable digital experiences.",
  url: (process.env.NEXT_PUBLIC_APP_URL || "https://mohammedshemim.com").replace(
    /\/$/,
    "",
  ),
  social: {
    github: "https://github.com/Msh-19",
    telegram: "https://t.me/MohammedShemim",
    twitter: "@mohammedshemim",
  },
} as const;
