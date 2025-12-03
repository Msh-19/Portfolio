"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { Menu, X } from 'lucide-react'
import { cn } from "@/lib/utils"
import Link from "next/link"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const navLinks = [
    { name: "Work", href: "#work" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "py-4" : "py-6"
      )}
    >
      <div
        className={cn(
          "max-w-7xl mx-auto rounded-full transition-all duration-300 flex items-center justify-between px-6 py-3",
          isMobileMenuOpen ? "bg-transparent" : "glass bg-black/40"
        )}
      >
        <Link href="/" className="text-2xl font-bold tracking-tighter relative z-50">
          Mohammed Shemim<span className="text-blue-400">.</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <a 
            href="/resume.pdf" 
            download
            className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors"
          >
            Resume
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden relative z-50 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#000000] z-40 flex items-center justify-center md:hidden"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-light text-white hover:text-blue-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <a 
                href="/resume.pdf"
                download
                className="mt-4 bg-white text-black px-8 py-3 rounded-full text-lg font-semibold"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
