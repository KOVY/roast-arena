import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'RoastArena - AI-Powered Roast Battles',
  description: 'Create, share, and compete in hilarious AI-generated roast battles',
  manifest: '/manifest.json',
  themeColor: '#000000',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://roastarena.com',
    siteName: 'RoastArena',
    title: 'RoastArena - AI-Powered Roast Battles 🔥',
    description: 'Create, share, and compete in hilarious AI-generated roast battles',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RoastArena - AI-Powered Roast Battles',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RoastArena - AI-Powered Roast Battles 🔥',
    description: 'Create, share, and compete in hilarious AI-generated roast battles',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  )
}
