import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-dm",
  display: "swap",
});

export const metadata: Metadata = {
  // ✅ PRIMARY DOMAIN (non-www)
  metadataBase: new URL("https://reptran.com"),

  title: "RepTran — Realignment, Not Restart",
  description:
    "The system built for the moment after you fall off — and what you do next.",

  // ✅ Canonical
  alternates: {
    canonical: "/",
  },

  // ✅ Open Graph (for WhatsApp, LinkedIn, etc.)
  openGraph: {
    title: "RepTran — Realignment, Not Restart",
    description:
      "The system built for the moment after you fall off — and what you do next.",
    url: "https://reptran.com",
    siteName: "RepTran",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RepTran — Build Consistency",
      },
    ],
  },

  // ✅ Twitter
  twitter: {
    card: "summary_large_image",
    title: "RepTran — Realignment, Not Restart",
    description:
      "The system built for the moment after you fall off — and what you do next.",
    images: ["/og-image.png"],
  },

  // ✅ Icons
  icons: {
    icon: [{ url: "/icon.png", sizes: "32x32", type: "image/png" }],
    apple: "/apple-icon.png",
  },

  // ✅ Google Search Console verification
  verification: {
    google: "u2ZlDTGoBa62OOxYxZeRlcfiW0OGkP-IvPZ-bl0u3II",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* ✅ Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "RepTran",
              url: "https://reptran.com", // ✅ non-www
              description:
                "Build lasting habits through streaks, feedback loops, and testable micro-tasks.",
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
