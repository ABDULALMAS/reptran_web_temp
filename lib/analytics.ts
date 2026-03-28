type AnalyticsEvent = {
  event: string
  properties?: Record<string, any>
}

class Analytics {
  private ga4Id: string | undefined
  private posthogKey: string | undefined

  constructor() {
    this.ga4Id = process.env.NEXT_PUBLIC_GA4_ID
    this.posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  }

  track(event: string, properties?: Record<string, any>) {
    const eventData: AnalyticsEvent = {
      event,
      properties,
    }

    // Local mode - log to console
    if (!this.ga4Id && !this.posthogKey) {
      console.log('[Analytics]', eventData)
      return
    }

    // GA4
    if (this.ga4Id && typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', event, properties)
    }

    // PostHog
    if (this.posthogKey && typeof window !== 'undefined' && (window as any).posthog) {
      ;(window as any).posthog.capture(event, properties)
    }
  }

  identify(userId: string, traits?: Record<string, any>) {
    if (this.posthogKey && typeof window !== 'undefined' && (window as any).posthog) {
      ;(window as any).posthog.identify(userId, traits)
    }
  }
}

export const analytics = new Analytics()


