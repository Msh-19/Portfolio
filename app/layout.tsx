import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { cn } from "@/lib/utils"
import { Analytics } from '@vercel/analytics/react'
import { ScheduleCard } from "@/components/schedule-card"
import { StructuredData } from "@/components/structured-data"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://mohammedshemim.com'),
  title: {
    default: "Mohammed Shemim - Software Engineer | Full-Stack Developer",
    template: "%s | Mohammed Shemim",
  },
  description: "Software engineer specializing in full-stack development, AI integration, and building scalable digital experiences. Expertise in React, Next.js, Node.js, Python, Go, and cloud technologies.",
  keywords: [
    "Mohammed Shemim",
    "Software Engineer",
    "Full-Stack Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "AI Integration",
    "Cloud Computing",
    "TypeScript",
    "JavaScript",
    "Python",
    "Go",
    "Node.js",
    "Portfolio",
  ],
  authors: [{ name: "Mohammed Shemim" }],
  creator: "Mohammed Shemim",
  publisher: "Mohammed Shemim",
  generator: 'Next.js',
  applicationName: 'Mohammed Shemim Portfolio',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mohammedshemim.com',
    siteName: 'Mohammed Shemim Portfolio',
    title: "Mohammed Shemim - Software Engineer | Full-Stack Developer",
    description: "Software engineer specializing in full-stack development, AI integration, and building scalable digital experiences. Expertise in React, Next.js, Node.js, Python, Go, and cloud technologies.",
    images: [
      {
        url: '/Portfolio.png',
        width: 1200,
        height: 630,
        alt: 'Mohammed Shemim Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mohammed Shemim - Software Engineer",
    description: "Software engineer specializing in full-stack development, AI integration, and building scalable digital experiences.",
    creator: '@mohammedshemim',
    images: ['/Portfolio.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
        <StructuredData />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased selection:bg-primary/20")}>
        {children}
        <ScheduleCard />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "hsl(0 0% 8%)",
              border: "1px solid hsl(0 0% 15%)",
              color: "hsl(0 0% 100%)",
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  )
}
