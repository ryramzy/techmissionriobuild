"use client"

import { usePostHog } from 'posthog-js/react'

export function useAnalytics() {
  const posthog = usePostHog()

  return {
    // Page view tracking
    trackPageView: (page: string, properties?: Record<string, any>) => {
      posthog.capture('page_view', {
        page,
        ...properties,
      })
    },

    // Donation funnel tracking
    trackDonateClick: (source: string, properties?: Record<string, any>) => {
      posthog.capture('donate_click', {
        source,
        timestamp: new Date().toISOString(),
        ...properties,
      })
    },

    trackDonationStart: (amount: number, isMonthly: boolean, properties?: Record<string, any>) => {
      posthog.capture('donation_start', {
        amount,
        isMonthly,
        timestamp: new Date().toISOString(),
        ...properties,
      })
    },

    trackDonationComplete: (amount: number, isMonthly: boolean, sessionId: string, properties?: Record<string, any>) => {
      posthog.capture('donation_complete', {
        amount,
        isMonthly,
        sessionId,
        timestamp: new Date().toISOString(),
        ...properties,
      })
    },

    trackDonationCancel: (amount: number, step: string, properties?: Record<string, any>) => {
      posthog.capture('donation_cancel', {
        amount,
        step,
        timestamp: new Date().toISOString(),
        ...properties,
      })
    },

    // Social sharing tracking
    trackShareClick: (platform: string, content: string, properties?: Record<string, any>) => {
      posthog.capture('share_click', {
        platform,
        content,
        timestamp: new Date().toISOString(),
        ...properties,
      })
    },

    trackShareComplete: (platform: string, content: string, properties?: Record<string, any>) => {
      posthog.capture('share_complete', {
        platform,
        content,
        timestamp: new Date().toISOString(),
        ...properties,
      })
    },

    // Email capture tracking
    trackEmailSignup: (source: string, properties?: Record<string, any>) => {
      posthog.capture('email_signup', {
        source,
        timestamp: new Date().toISOString(),
        ...properties,
      })
    },

    // User engagement tracking
    trackEngagement: (action: string, properties?: Record<string, any>) => {
      posthog.capture('user_engagement', {
        action,
        timestamp: new Date().toISOString(),
        ...properties,
      })
    },

    // Custom event tracking
    track: (eventName: string, properties?: Record<string, any>) => {
      posthog.capture(eventName, {
        timestamp: new Date().toISOString(),
        ...properties,
      })
    },

    // User identification
    identify: (userId: string, properties?: Record<string, any>) => {
      posthog.identify(userId, properties)
    },

    // Revenue tracking
    trackRevenue: (amount: number, currency: string = 'USD', properties?: Record<string, any>) => {
      posthog.capture('revenue', {
        amount,
        currency,
        timestamp: new Date().toISOString(),
        ...properties,
      })
    },

    // Funnel step completion
    trackFunnelStep: (funnelName: string, step: number, properties?: Record<string, any>) => {
      posthog.capture('funnel_step_completed', {
        funnel_name: funnelName,
        step,
        timestamp: new Date().toISOString(),
        ...properties,
      })
    },

    // A/B test tracking
    trackExperiment: (experimentName: string, variant: string, properties?: Record<string, any>) => {
      posthog.capture('experiment_started', {
        experiment_name: experimentName,
        variant,
        timestamp: new Date().toISOString(),
        ...properties,
      })
    },
  }
}
