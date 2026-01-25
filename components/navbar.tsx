"use client"

import { useState } from "react"
import Link from "next/link"
import { Download } from "lucide-react"
import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
} from "@/components/ui/resizable-navbar"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Services", link: "#services" },
    { name: "Experience", link: "#experience" },
    { name: "Work", link: "#work" },
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
          className="relative z-20 flex items-center space-x-2 px-2 py-1 text-sm font-normal"
        >
          <span className="text-xl font-bold tracking-tighter text-foreground">
            Mohammed Shemim<span className="text-primary">.</span>
          </span>
        </Link>

        {/* Navigation Items */}
        <NavItems items={navItems} />

        {/* Resume Button */}
        <div className="relative z-20">
          <NavbarButton
            href="/resume.pdf"
            variant="primary"
            className="bg-primary text-black hover:bg-primary/90 flex items-center gap-2"
            as="a"
            target="_blank"
            rel="noopener noreferrer"
            // @ts-ignore
            download
          >
            <Download className="w-4 h-4" />
            Resume
          </NavbarButton>
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
