import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"

// ✅ Fixed: Metadata (NO viewport or themeColor here anymore)
export const metadata: Metadata = {
  title: "Ashish Suryawanshi - Full Stack Developer | MERN Stack Specialist",
  description:
    "SIH 2024 Winner | Full Stack Developer specializing in MERN Stack, Flutter, and modern web technologies. ACM Treasurer at PCCOE with 15+ projects and 500+ problems solved.",
  keywords:
    "Full Stack Developer, MERN Stack, React, Node.js, Flutter, JavaScript, Web Development, Software Engineer, SIH Winner, ACM, PCCOE",
  authors: [{ name: "Ashish Suryawanshi" }],
  creator: "Ashish Suryawanshi",
  publisher: "Ashish Suryawanshi",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://simplyashish10.vercel.app",
    title: "Ashish Suryawanshi - Full Stack Developer",
    description:
      "SIH 2024 Winner | Full Stack Developer specializing in MERN Stack, Flutter, and modern web technologies.",
    siteName: "Ashish Suryawanshi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashish Suryawanshi - Full Stack Developer",
    description:
      "SIH 2024 Winner | Full Stack Developer specializing in MERN Stack, Flutter, and modern web technologies.",
  },
}

// ✅ NEW → Next.js requires viewport as **separate export**
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

// ✅ NEW → themeColor as **separate export**
export const themeColor = "#dc2626"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
