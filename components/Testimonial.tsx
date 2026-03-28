'use client'

import React from 'react'
import SafeImage from './SafeImage'

interface TestimonialProps {
  name: string
  role: string
  quote: string
  avatar?: string
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export default function Testimonial({ name, role, quote, avatar }: TestimonialProps) {
  const initials = getInitials(name)
  const avatarFallback = (
    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
      {initials}
    </div>
  )

  return (
    <div className="bg-bg p-6 rounded-lg border border-border-light dark:border-border-dark">
      <p className="text-text mb-4 italic">&quot;{quote}&quot;</p>
      <div className="flex items-center gap-4">
        {avatar ? (
          <SafeImage
            src={avatar}
            alt={`${name} avatar`}
            width={48}
            height={48}
            className="rounded-full"
            fallback={avatarFallback}
          />
        ) : (
          avatarFallback
        )}
        <div>
          <div className="font-semibold text-text">{name}</div>
          <div className="text-sm text-muted">{role}</div>
        </div>
      </div>
    </div>
  )
}

