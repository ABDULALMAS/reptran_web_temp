import React from 'react'

interface StatCardProps {
  label: string
  value: string | number
  delta?: {
    value: string | number
    isPositive: boolean
  }
}

export default function StatCard({ label, value, delta }: StatCardProps) {
  return (
    <div className="bg-bg p-6 rounded-lg border border-border-light dark:border-border-dark text-center">
      <div className="text-3xl font-bold text-primary mb-2">{value}</div>
      <div className="text-sm text-muted mb-2">{label}</div>
      {delta && (
        <div
          className={`text-xs flex items-center justify-center gap-1 ${
            delta.isPositive ? 'text-positive' : 'text-accent'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`w-4 h-4 ${delta.isPositive ? '' : 'rotate-180'}`}
            aria-hidden="true"
          >
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
          {delta.value}
        </div>
      )}
    </div>
  )
}


