"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { motion } from "motion/react"
import Image from "next/image"
import { featuredProjects } from "@/lib/portfolio-data"

const projectColors = [
  "from-blue-500/20 to-cyan-500/20",
  "from-purple-500/20 to-pink-500/20",
  "from-orange-500/20 to-red-500/20",
  "from-emerald-500/20 to-teal-500/20",
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
          {featuredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard className="p-0 overflow-hidden group">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative flex flex-col justify-center overflow-hidden p-12">
                    <div className={`absolute inset-0 bg-gradient-to-br ${projectColors[index % projectColors.length]} opacity-0 transition-opacity duration-700 group-hover:opacity-100`} />
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
                  <div className="relative min-h-[500px] overflow-hidden">
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
                          sizes="(max-width: 768px) 100vw, 50vw"
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
                          sizes="(max-width: 768px) 100vw, 50vw"
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
