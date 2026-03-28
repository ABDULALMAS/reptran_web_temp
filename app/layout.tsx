import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-dm',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'RepTran — Realignment, Not Restart',
  description:
    'The system built for the moment after you fall off — and what you do next.',

  openGraph: {
    title: 'RepTran — Realignment, Not Restart',
    description:
      'The system built for the moment after you fall off — and what you do next.',
    url: 'https://reptran.com',
    siteName: 'RepTran',
    type: 'website',

    // 👇 ADD THIS
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RepTran — Build Consistency',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'RepTran — Realignment, Not Restart',
    description:
      'The system built for the moment after you fall off — and what you do next.',

    // 👇 ADD THIS (important for Twitter/X)
    images: ['/og-image.png'],
  },

  metadataBase: new URL('https://reptran.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'RepTran',
              url: 'https://reptran.com',
              description:
                'Build lasting habits through streaks, feedback loops, and testable micro-tasks.',
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}