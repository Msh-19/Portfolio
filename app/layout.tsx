import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { cn } from "@/lib/utils"
import { Analytics } from '@vercel/analytics/react'
import { ScheduleCard } from "@/components/schedule-card"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://mohammedshemim.com'), // Fallback to assumed domain if env var not set, but best effort
  title: {
    default: "Mohammed Shemim",
    template: "%s | Mohammed Shemim",
  },
  description: "Shaping the future of digital experiences.",
  generator: 'v0.app',
  icons: {
    icon: '/favicon.ico',
    // apple: '/apple-icon.png',
  },
  openGraph: {
    title: "Mohammed Shemim",
    description: "Shaping the future of digital experiences.",
    url: 'https://mohammedshemim.com',
    siteName: 'Mohammed Shemim',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mohammed Shemim",
    description: "Shaping the future of digital experiences.",
    creator: '@mohammedshemim', // Assuming handle, can be updated later
  },
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
        <ScheduleCard />
        <Analytics />
      </body>
    </html>
  )
}
