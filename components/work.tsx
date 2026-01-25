"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { motion } from "framer-motion"
import Image from "next/image"

const projects = [
  {
    title: "Triage it",
    category: "AI Sentiment Analysis",
    description: "Reading text and understanding the sentiment in them for teams to quickly assess the criticality of a complaint, and suggest proper responses.",
    tags: ["AI", "Sentiment Analysis", "Team Productivity"],
    link: "https://triage-it.vercel.app",
    image: "/Triage_it.png",
    imageAlt: "Triage it - AI Sentiment Analysis dashboard showing customer complaint analysis and sentiment detection interface",
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    title: "ChatApp",
    category: "Realtime Communication",
    description: "A safe realtime socket based chat app that connects users through their google account. It also includes an ai chat feature.",
    tags: ["Realtime", "Socket.io", "AI", "Google Auth"],
    link: "https://chat-app-mvp.vercel.app",
    image: "/ChatAPP.png",
    imageAlt: "ChatApp - Real-time messaging application interface with Google authentication and AI chat features",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "InXtract",
    category: "AI Document Summarizer",
    description: "A summarizer of text from research papers. My role focused on integration and project management.",
    tags: ["Integration", "Project Management"],
    image: "/inxtractLanding.png",
    imageAlt: "InXtract - AI-powered research paper summarization tool landing page showing document upload and summary generation",
    link: "https://inxtract.vercel.app",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "BankDash",
    category: "Banking Dashboard",
    description: "A virtual credit card tracker and expense manager.",
    tags: ["Frontend Implementation", "UI/UX"],
    image: "/BankDashLanding.png",
    imageAlt: "BankDash - Modern banking dashboard displaying virtual credit cards and expense management interface",
    color: "from-emerald-500/20 to-teal-500/20",
  },
]

export function Work() {
  return (
    <section id="work" className="py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Selected Work
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground max-w-md"
            >
              A showcase of my most recent projects.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "100px" }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-8"
            />
          </div>
          <motion.a
            href="https://github.com/Msh-19"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            
            className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-sm font-medium inline-block"
          >
            View All Projects
          </motion.a>
        </div>

        <div className="space-y-20">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard className="p-0 overflow-hidden group">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className={`p-12 flex flex-col justify-center relative overflow-hidden`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                    <div className="relative z-10">
                      <span className="text-sm font-medium text-white/50 mb-4 block uppercase tracking-wider">
                        {project.category}
                      </span>
                      <h3 className="text-4xl md:text-5xl font-bold mb-6 group-hover:translate-x-2 transition-transform duration-500">
                        {project.link ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-400 transition-colors"
                          >
                            {project.title}
                          </a>
                        ) : (
                          project.title
                        )}
                      </h3>
                      <p className="text-white/70 mb-8 max-w-md">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                        {project.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-4 py-2 rounded-full bg-white/5 border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="relative h-[400px] md:h-auto overflow-hidden">
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full"
                      >
                         <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.imageAlt || project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                         <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                      </a>
                    ) : ( 
                      <>
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.imageAlt || project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                      </>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
