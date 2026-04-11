"use client"

import { useState } from "react"
import Link from "next/link"
import { Download } from "lucide-react"
import {
  Navbar as ResizableNavbar,
  NavBody,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "@/components/ui/resizable-navbar"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Services", link: "#services" },
    { name: "Work", link: "#work" },
    { name: "Experience", link: "#experience" },
    { name: "FAQ", link: "#faq" },
    { name: "Contact", link: "#contact" },
  ]

  const handleItemClick = () => {
    setIsOpen(false)
  }

  return (
    <ResizableNavbar className="fixed top-0 pt-4 px-6">
      {/* Desktop Navigation */}
      <NavBody className="border border-white/10">
        {/* Logo */}
        <Link
          href="#hero"
          className="relative z-20 flex shrink-0 items-center space-x-2 px-2 py-1 text-sm font-normal"
        >
          <span className="text-lg font-bold tracking-tighter text-foreground xl:text-xl">
            <span className="hidden xl:inline">Mohammed Shemim</span>
            <span className="xl:hidden">M. Shemim</span>
            <span className="text-primary">.</span>
          </span>
        </Link>

        {/* Navigation Items */}
        <nav className="mx-auto hidden min-w-0 items-center justify-center gap-1 text-sm font-medium text-white/70 lg:flex xl:gap-2">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="rounded-full px-3 py-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Resume Button */}
        <div className="relative z-20 shrink-0">
          <a
            href="/resume.pdf"
            className="relative inline-flex cursor-pointer items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-bold text-black text-center transition duration-200 hover:-translate-y-0.5 hover:bg-primary/90 xl:px-4"
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            <Download className="w-4 h-4" />
            <span className="hidden xl:inline">Resume</span>
          </a>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav className="border border-white/10">
        <MobileNavHeader>
          {/* Mobile Logo */}
          <Link
            href="#hero"
            className="relative z-20 flex items-center space-x-2 px-2 py-1"
          >
            <span className="text-xl font-bold tracking-tighter text-foreground">
              Mohammed Shemim<span className="text-primary">.</span>
            </span>
          </Link>

          {/* Mobile Toggle */}
          <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </MobileNavHeader>

        {/* Mobile Menu */}
        <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={handleItemClick}
              className="text-2xl font-light text-foreground hover:text-primary transition-colors"
            >
              {item.name}
            </a>
          ))}
          <a
            href="/resume.pdf"
            download
            className="mt-4 bg-primary text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2 justify-center"
          >
            <Download className="w-5 h-5" />
            Resume
          </a>
        </MobileNavMenu>
      </MobileNav>
    </ResizableNavbar>
  )
}
