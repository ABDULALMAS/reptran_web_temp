'use client'

import { useEffect, useRef } from 'react'
import SafeImage from './SafeImage'
import { motion, useReducedMotion } from 'framer-motion'

interface HeroProps {
  headline?: string
  sub?: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
}

export default function Hero({ headline, sub, onPrimaryClick, onSecondaryClick }: HeroProps) {
  const shouldReduceMotion = useReducedMotion()
  const streakRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (shouldReduceMotion || !streakRef.current) return

    const interval = setInterval(() => {
      if (streakRef.current) {
        streakRef.current.style.opacity = streakRef.current.style.opacity === '1' ? '0.5' : '1'
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [shouldReduceMotion])

  const defaultHeadline = 'RepTran — build consistency, not chaos.'
  const defaultSub =
    'Build lasting habits through streaks, feedback loops, and testable micro-tasks that maintain momentum when motivation fades.'

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-12"
      aria-labelledby="hero-heading"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <motion.h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text mb-6"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {headline || defaultHeadline}
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl text-muted mb-8 max-w-2xl mx-auto lg:mx-0"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {sub || defaultSub}
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <button
                onClick={onPrimaryClick}
                className="btn-primary text-lg px-8 py-3"
              >
                Create account — it&apos;s free.
              </button>
              <button
                onClick={onSecondaryClick}
                className="btn-secondary text-lg px-8 py-3"
              >
                See how it works
              </button>
            </motion.div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden border border-border-light dark:border-border-dark shadow-2xl min-h-[400px] flex items-center justify-center bg-neutral-100 dark:bg-black-utility">
              <SafeImage
                src="/hero-screenshot.png"
                alt="RepTran app interface showing habit tracking dashboard"
                width={600}
                height={400}
                className="w-full h-auto"
                priority
                fallback={
                  <div className="w-full h-full flex items-center justify-center p-8">
                    <p className="text-muted text-center">Product screenshot placeholder</p>
                  </div>
                }
              />
            </div>
            {/* Animated streak micro-visual */}
            {!shouldReduceMotion && (
              <motion.div
                ref={streakRef}
                className="absolute -top-4 -right-4 w-16 h-16 bg-accent rounded-full opacity-75"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.75, 1, 0.75],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

