import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { IBM_Plex_Mono, VT323 } from 'next/font/google'
import './globals.css'
import Scanlines from './components/Scanlines'
import { profile, siteUrl } from './data/profile'

const vt323 = VT323({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-vt323',
  display: 'swap',
  // Fall back to a real monospace, not next/font's resized Arial: glyphs the
  // web fonts lack (→, ↗) and the pre-swap paint should stay terminal-like.
  adjustFontFallback: false,
  fallback: ['ui-monospace', 'Menlo', 'monospace'],
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
  adjustFontFallback: false,
  fallback: ['ui-monospace', 'Menlo', 'monospace'],
})

const title = `${profile.name} — ${profile.jobTitle}`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s — ${profile.name}` },
  description: profile.description,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  alternates: { canonical: '/' },
  // og:image comes from app/opengraph-image.tsx.
  openGraph: {
    type: 'website',
    url: '/',
    siteName: profile.name,
    title,
    description: profile.description,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: profile.description,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${vt323.variable} ${plexMono.variable}`}>
      <body>
        {children}
        <Scanlines />
        <Analytics />
      </body>
    </html>
  )
}
