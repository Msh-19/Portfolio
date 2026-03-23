import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { cn } from "@/lib/utils"
import { Analytics } from '@vercel/analytics/react'
import { ScheduleCard } from "@/components/schedule-card"
import { StructuredData } from "@/components/structured-data"
import { Toaster } from "sonner"
import { siteConfig } from "@/lib/site"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.personName}`,
  },
  description: siteConfig.description,
  keywords: [
    siteConfig.personName,
    "Ethiopia",
    "Data Structures and Algorithms",
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
  authors: [{ name: siteConfig.personName }],
  creator: siteConfig.personName,
  publisher: siteConfig.personName,
  generator: 'Next.js',
  applicationName: siteConfig.name,
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
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
    title: siteConfig.shortTitle,
    description: siteConfig.description,
    creator: siteConfig.social.twitter,
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
      <body className={cn(inter.variable, "min-h-screen overflow-x-clip bg-background font-sans antialiased selection:bg-primary/20")}>
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
