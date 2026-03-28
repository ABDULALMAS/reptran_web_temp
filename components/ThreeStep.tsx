'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface Step {
  title: string
  description: string
  icon: React.ReactNode
}

interface ThreeStepProps {
  steps?: Step[]
}

const defaultSteps: Step[] = [
  {
    title: 'Capture',
    description: 'Quickly log your daily habits and track progress in real-time.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    title: 'Systemize',
    description: 'Build feedback loops and testable micro-tasks that compound over time.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3" />
      </svg>
    ),
  },
  {
    title: 'Momentum',
    description: 'Maintain consistency through streaks that keep you moving forward.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
]

export default function ThreeStep({ steps = defaultSteps }: ThreeStepProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="how-it-works"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-100 dark:bg-neutral-900"
      aria-labelledby="how-it-works-heading"
    >
      <div className="container mx-auto max-w-6xl">
        <h2
          id="how-it-works-heading"
          className="text-3xl sm:text-4xl font-bold text-center text-text mb-12"
        >
          How RepTran Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="bg-bg p-8 rounded-lg border border-border-light dark:border-border-dark shadow-sm"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-primary mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-text mb-2">{step.title}</h3>
              <p className="text-muted">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


