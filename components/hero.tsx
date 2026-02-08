"use client"

import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import { FlipWords } from "@/components/ui/flip-words"

export function Hero() {
  const [dimensions, setDimensions] = useState({ rows: 20, cols: 40 }); // Default initial size

  useEffect(() => {
    const updateDimensions = () => {
      // Calculate needed rows and cols + some buffer to ensure coverage
      const cellSize = 56; // Matching the default in BackgroundRippleEffect
      const cols = Math.ceil(window.innerWidth / cellSize);
      const rows = Math.ceil(window.innerHeight / cellSize); // Use actual window height or section height

      setDimensions({
        rows: Math.max(20, rows),
        cols: Math.max(40, cols)
      });
    };

    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden overflow-x-hidden pt-32 pb-32">
      <div className="absolute inset-0 z-0">
        <BackgroundRippleEffect rows={dimensions.rows} cols={dimensions.cols} />
      </div>

      {/* Background Liquid Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">

        <div className="absolute top-[-10%] left-[-10%] w-[80vw] sm:w-[50vw] h-[80vw] sm:h-[50vw] bg-primary/20 rounded-full blur-[120px] animate-blob mix-blend-screen" />
        <div className="absolute top-[20%] right-[-5%] sm:right-[-10%] w-[60vw] sm:w-[40vw] h-[60vw] sm:h-[40vw] bg-accent/20 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[10%] sm:left-[20%] w-[70vw] sm:w-[45vw] h-[70vw] sm:h-[45vw] bg-secondary/20 rounded-full blur-[120px] animate-blob animation-delay-4000 mix-blend-screen" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/75 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Available for new projects
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-5"
        >
          I build
          <br />
          <FlipWords words={["Software", "Solutions", "Systems", "Experiences", "Products"]} />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed"
        >
          I turn complex ideas into clear, easy-to-use digital experiences, combining design and technology to build practical solutions
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="#work"
            className="group relative px-8 py-4 bg-primary text-black rounded-full font-semibold text-lg overflow-hidden transition-all hover:scale-105 inline-block"
          >
            <span className="relative z-10 flex items-center gap-2">
              View My Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a
            href="https://t.me/MohammedShemim"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 glass rounded-full font-semibold text-lg text-foreground hover:bg-white/10 transition-all hover:scale-105 inline-block"
          >
            Contact Me
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-xs text-white/40 uppercase tracking-widest">Scroll</span>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full" />
          </div>
        </div>
      </motion.div>

    </section>
  )
}
