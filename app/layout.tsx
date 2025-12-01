import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Mohammed Shemim | Digital Agency",
  description: "Shaping the future of digital experiences.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-jetski-tab-id="2114578642">
      <body className={cn("min-h-screen bg-black font-sans antialiased selection:bg-white/20")}>
        {children}
      </body>
    </html>
  )
}
