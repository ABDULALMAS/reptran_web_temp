'use client'

import React from 'react'

interface CtaBannerProps {
  headline?: string
  subline?: string
  ctaText?: string
  onCtaClick?: () => void
}

export default function CtaBanner({
  headline = 'Ready to build consistency?',
  subline = 'Join thousands of users building lasting habits with RepTran.',
  ctaText = 'Create account — it\'s free',
  onCtaClick,
}: CtaBannerProps) {
  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-secondary"
      aria-labelledby="cta-heading"
    >
      <div className="container mx-auto max-w-4xl text-center">
        <h2
          id="cta-heading"
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          {headline}
        </h2>
        <p className="text-lg text-white/90 mb-8">{subline}</p>
        <button
          onClick={onCtaClick}
          className="bg-white text-primary px-8 py-3 rounded-lg font-semibold text-lg hover:bg-neutral-100 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4"
        >
          {ctaText}
        </button>
        <p className="text-sm text-white/80 mt-4">
          We respect your privacy. No spam, unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}


