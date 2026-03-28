import React from 'react'

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="bg-bg p-6 rounded-lg border border-border-light dark:border-border-dark">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
      <p className="text-muted text-sm">{description}</p>
    </div>
  )
}

