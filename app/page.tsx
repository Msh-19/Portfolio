import { Navigation } from "@/components/landing/navigation"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { ProcessSection } from "@/components/landing/process-section"
import { WorkSection } from "@/components/landing/work-section"
import { TechStackSection } from "@/components/landing/tech-stack-section"
import { ExperienceSection } from "@/components/landing/experience-section"
import { FaqSection } from "@/components/landing/faq-section"
import { ContactSection } from "@/components/landing/contact-section"
import { FooterSection } from "@/components/landing/footer-section"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <ProcessSection />
      <WorkSection />
      <TechStackSection />
      <ExperienceSection />
      <FaqSection />
      <ContactSection />
      <FooterSection />
    </main>
  )
}
