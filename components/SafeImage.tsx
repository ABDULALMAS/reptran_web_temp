'use client'

import React, { useState } from 'react'

interface SafeImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  fallback?: React.ReactNode
  onError?: () => void
}

export default function SafeImage({
  src,
  alt,
  width,
  height,
  className,
  priority,
  fallback,
  onError,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    setHasError(true)
    onError?.()
  }

  if (hasError && fallback) {
    return <>{fallback}</>
  }

  // Use regular img tag for better error handling
  // Next.js Image doesn't always fire onError reliably for missing images
  return (
    <>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
      />
    </>
  )
}

