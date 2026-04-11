import { siteConfig } from "@/lib/site"
import { faqItems, featuredProjects } from "@/lib/portfolio-data"

export function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.personName,
    url: siteConfig.url,
    image: `${siteConfig.url}/apple-icon.png`,
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.telegram,
    ],
    jobTitle: "Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    description: siteConfig.description,
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
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: siteConfig.personName,
    },
  }

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: "2024-01-01T00:00:00+00:00",
    mainEntity: {
      "@type": "Person",
      name: siteConfig.personName,
      description: siteConfig.description,
    },
  }

  const projectsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured Software Projects",
    itemListElement: featuredProjects.map((project, index) => ({
      "@type": "CreativeWork",
      position: index + 1,
      name: project.title,
      description: project.description,
      genre: project.category,
      keywords: project.tags.join(", "),
      image: `${siteConfig.url}${project.image}`,
      url: project.link,
    })),
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
