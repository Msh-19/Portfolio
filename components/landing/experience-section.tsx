"use client";

import { useState, useEffect, useRef } from "react";

const roles = [
  {
    label: "AAIASC",
    period: "Jan 2026 – Present",
    title: "Software Engineer & Technical Point of Contact",
    company: "Addis Ababa Islamic Affairs Supreme Council (AAIASC) • Addis Ababa, Ethiopia",
    points: [
      "Full-time engineer and the council's technical point of contact, owning design and delivery of two internal platforms.",
      "Government service delivery platform: architected a NestJS microservices system — API Gateway plus Workflow and Apps services — in a Turborepo/Bun monorepo with low-latency NATS RPC.",
      "Built async BullMQ/Redis pipelines, automated email workflows (Nodemailer, React Email), and MinIO storage; containerized MongoDB, PostgreSQL, Redis, NATS, and MinIO with GitHub Actions CI/CD. Raised coverage from 70% to 97%+ via Jest/Supertest E2E on isolated Docker databases.",
      "Internal Slack-style communications platform: built real-time chat with NestJS, Socket.IO, Next.js, and Prisma/PostgreSQL — threads, mentions, read receipts, and LiveKit video/audio calls.",
      "Designed a zero-knowledge E2EE layer: client-encrypted key vaults from recovery mnemonics, QR cross-device key pairing, and a migration to Matrix's vodozemac/Megolm crypto; closed a key-substitution MITM risk.",
      "Shipped Tauri desktop and mobile clients, added MFA, email OTPs, and an append-only audit log, and built a secure media pipeline (ClamAV, Sharp, FFmpeg).",
    ],
  },
  {
    label: "iCog Labs",
    period: "Feb 2025 – Jun 2025",
    title: "Software Engineer, Intern",
    company: "iCog Labs • Addis Ababa, Ethiopia",
    points: [
      "Developed applied AI projects and conducted research across a 4-month machine learning internship.",
      "Participated in 10+ training sessions on neural networks, NLP, and model deployment.",
      "Engineered and maintained a biological knowledge graph (BioCypher-KG) using MeTTa and Neo4j, integrating diverse datasets with a focus on data quality.",
    ],
  },
  {
    label: "Evergreen",
    period: "May 2024 – Mar 2025",
    title: "Software Engineer, Co-founder",
    company: "Evergreen Technologies • Addis Ababa, Ethiopia",
    points: [
      "Led front-end development across 3 client projects — responsive UIs, API integration, optimized load times.",
      "Integrated Odoo ERP into two projects using Django as the backend, improving scalability and system performance.",
    ],
  },
  {
    label: "Eskalate",
    period: "Jun 2024 – Sep 2024",
    title: "Software Engineer, Intern",
    company: "Eskalate LLC • Addis Ababa, Ethiopia",
    points: [
      "Built the frontend of an online banking system with a team of five using Next.js and TypeScript.",
      "Implemented state optimization and Agile workflows, cutting project delivery time by 50%.",
      "Improved load times by 30% with partial loading and async data handling.",
      "Presented to a judging panel, securing a top-4 finish.",
    ],
  },
];

export function ExperienceSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const active = roles[activeTab];

  return (
    <section id="experience" ref={sectionRef} className="relative py-24 lg:py-32 overflow-x-clip">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Experience
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-6">
              Where I&apos;ve been building.
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Internships, a co-founded studio, and shipped client work across AI
              research, ERP integration, and fintech frontends.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-1">4 roles</h3>
                <p className="text-sm text-muted-foreground">Across gov platforms, AI, ERP, and fintech.</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Point of contact</h3>
                <p className="text-sm text-muted-foreground">Technical lead at AAIASC.</p>
              </div>
            </div>
          </div>

          {/* Right: Tabbed panel */}
          <div
            className={`lg:sticky lg:top-32 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="border border-foreground/10">
              {/* Tabs */}
              <div className="flex items-center border-b border-foreground/10 overflow-x-auto">
                {roles.map((role, idx) => (
                  <button
                    key={role.label}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`px-6 py-4 text-sm font-mono whitespace-nowrap transition-colors relative ${
                      activeTab === idx ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {role.label}
                    {activeTab === idx && <span className="absolute bottom-0 left-0 right-0 h-px bg-foreground" />}
                  </button>
                ))}
              </div>

              {/* Panel */}
              <div className="p-8 min-h-[320px]">
                <div className="font-mono text-xs text-muted-foreground mb-2">{active.period}</div>
                <h3 className="text-2xl font-display mb-1">{active.title}</h3>
                <p className="text-sm text-muted-foreground mb-6">{active.company}</p>
                <ul className="space-y-4">
                  {active.points.map((point, i) => (
                    <li key={i} className="flex gap-3 text-foreground/80 leading-relaxed">
                      <span className="text-foreground/40 mt-1.5 shrink-0">—</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
