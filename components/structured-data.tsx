"use client"

export function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mohammed Shemim",
    url: "https://mohammedshemim.com",
    image: "https://mohammedshemim.com/apple-icon.png",
    sameAs: [
      "https://github.com/Msh-19",
      "https://t.me/MohammedShemim",
    ],
    jobTitle: "Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    description: "Software engineer specializing in full-stack development, AI integration, and building scalable digital experiences.",
    knowsAbout: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Python",
      "Go",
      "Cloud Computing",
      "AI Integration",
      "Full-Stack Development",
    ],
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Mohammed Shemim Portfolio",
    url: "https://mohammedshemim.com",
    description: "Software engineer specializing in full-stack development, AI integration, and building scalable digital experiences.",
    author: {
      "@type": "Person",
      name: "Mohammed Shemim",
    },
  }

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: "2024-01-01T00:00:00+00:00",
    dateModified: new Date().toISOString(),
    mainEntity: {
      "@type": "Person",
      name: "Mohammed Shemim",
      description: "Software engineer specializing in full-stack development, AI integration, and building scalable digital experiences.",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
    </>
  )
}
