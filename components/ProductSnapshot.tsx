'use client'

import React from 'react'
import SafeImage from './SafeImage'

interface Callout {
  label: string
  top: string
  left: string
}

interface ProductSnapshotProps {
  imageSrc?: string
  imageAlt?: string
  callouts?: Callout[]
}

const defaultCallouts: Callout[] = [
  { label: 'Streak Tracker', top: '20%', left: '10%' },
  { label: 'Daily Habits', top: '50%', left: '60%' },
  { label: 'Progress Dashboard', top: '75%', left: '30%' },
]

export default function ProductSnapshot({
  imageSrc = '/product-snapshot.png',
  imageAlt = 'RepTran product interface showing habit tracking features',
  callouts = defaultCallouts,
}: ProductSnapshotProps) {
  const [hasImageError, setHasImageError] = React.useState(false)

  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8"
      aria-labelledby="product-snapshot-heading"
    >
      <div className="container mx-auto max-w-6xl">
        <h2
          id="product-snapshot-heading"
          className="text-3xl sm:text-4xl font-bold text-center text-text mb-12"
        >
          Product Snapshot
        </h2>
        <div className="relative rounded-lg overflow-hidden border border-border-light dark:border-border-dark shadow-lg min-h-[500px] flex items-center justify-center bg-neutral-100 dark:bg-black-utility">
          <SafeImage
            src={imageSrc}
            alt={imageAlt}
            width={1200}
            height={800}
            className="w-full h-auto"
            onError={() => setHasImageError(true)}
            fallback={
              <div className="w-full h-full flex items-center justify-center p-8">
                <p className="text-muted text-center">Product screenshot placeholder</p>
              </div>
            }
          />
          {/* Annotated callouts */}
          {!hasImageError && callouts.map((callout, index) => (
            <div
              key={index}
              className="absolute z-10"
              style={{
                top: callout.top,
                left: callout.left,
              }}
            >
              <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                {callout.label}
              </div>
              <div
                className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-primary"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

