"use client"

import { motion } from "motion/react"

import { faqItems } from "@/lib/portfolio-data"

export function FAQ() {
  return (
    <section id="faq" className="relative overflow-hidden py-32">
      <div className="container mx-auto px-6">
        <div className="mb-16 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 text-4xl font-bold md:text-6xl"
          >
            Quick Answers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground md:text-xl"
          >
            A short summary of the work I do, the technologies I use, and the kinds
            of projects I help build.
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {faqItems.map((item, index) => (
            <motion.article
              key={item.question}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.08 }}
              className="glass rounded-3xl p-8"
            >
              <h3 className="mb-4 text-xl font-semibold text-foreground">
                {item.question}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {item.answer}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
