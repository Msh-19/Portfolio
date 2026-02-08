"use client"

import { Timeline } from "@/components/ui/timeline"

const experienceData = [
  {
    title: "Feb 2025 - Jun 2025",
    content: (
      <div className="space-y-4">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Software Engineer, Intern
          </h3>
          <p className="text-primary text-lg mb-4">
            Icog labs • Addis Ababa, Ethiopia
          </p>
        </div>
        <ul className="space-y-3 text-white text-base md:text-lg">
          <li className="flex gap-3">
            <span className="text-primary mt-1.5 flex-shrink-0">•</span>
            <span>
              Developed applied AI projects and conducted research tasks during a 4-month machine learning internship at iCog Labs, enhancing AI technology understanding and application.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary mt-1.5 flex-shrink-0">•</span>
            <span>
              Participated in 10+ training sessions on advanced machine learning topics including neural networks, natural language processing, and model deployment.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary mt-1.5 flex-shrink-0">•</span>
            <span>
              Engineered and maintained a biological knowledge graph (BioCypher-KG) using meTTa and Neo4j, integrating diverse datasets with a focus on data quality and consistency.
            </span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "May 2024 - Mar 2025",
    content: (
      <div className="space-y-4">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Software Engineer, Co-founder
          </h3>
          <p className="text-accent text-lg mb-4">
            Evergreen Technologies • Addis Ababa, Ethiopia
          </p>
        </div>
        <ul className="space-y-3 text-white text-base md:text-lg">
          <li className="flex gap-3">
            <span className="text-accent mt-1.5 flex-shrink-0">•</span>
            <span>
              Led front-end development in 3 client projects, delivering responsive UIs, integrating APIs, and optimizing page load times.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent mt-1.5 flex-shrink-0">•</span>
            <span>
              Integrated Odoo ERP into two projects using Django as the backend, leading to improved scalability and robust system performance.
            </span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Jun 2024 - Sep 2024",
    content: (
      <div className="space-y-4">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Software Engineer, Intern
          </h3>
          <p className="text-primary text-lg mb-4">
            Eskalate LLC • Addis Ababa, Ethiopia
          </p>
        </div>
        <ul className="space-y-3 text-white text-base md:text-lg">
          <li className="flex gap-3">
            <span className="text-primary mt-1.5 flex-shrink-0">•</span>
            <span>
              Collaborated with a team of five engineers to build the frontend of an online banking system using Next.js and TypeScript.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary mt-1.5 flex-shrink-0">•</span>
            <span>
              Implemented a robust state management solution with Next.js state optimization to streamline workflows, and leveraged Agile methodologies, resulting in a 50% reduction in project delivery time.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary mt-1.5 flex-shrink-0">•</span>
            <span>
              Achieved a 30% improvement in load times by combining partial loading with asynchronous data handling.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary mt-1.5 flex-shrink-0">•</span>
            <span>
              Presented the project to a panel of judges, securing a top 4 finish in the evaluation.
            </span>
          </li>
        </ul>
      </div>
    ),
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-32 relative bg-background">
      <div className="container mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Professional Experience
          </h2>
          <div className="h-1 bg-gradient-to-r from-primary to-accent rounded-full w-[100px]" />
        </div>

        <Timeline data={experienceData} />
      </div>
    </section>
  )
}
