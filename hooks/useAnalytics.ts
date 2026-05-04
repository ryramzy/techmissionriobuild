"use client"

import { usePostHog } from 'posthog-js/react'

export function useAnalytics() {
  const posthog = usePostHog()

  return {
    // Page view tracking
    trackPageView: (page: string, properties?: Record<string, any>) => {
      try {
        posthog.capture('page_view', {
          page,
          ...properties,
        })
      } catch (error) {
        console.warn('Analytics tracking failed:', error)
      }
    },

    // Donation funnel tracking
    trackDonateClick: (source: string, properties?: Record<string, any>) => {
      try {
        posthog.capture('donate_click', {
          source,
          timestamp: new Date().toISOString(),
          ...properties,
        })
      } catch (error) {
        console.warn('Analytics tracking failed:', error)
      }
    },

    trackDonationStart: (amount: number, isMonthly: boolean, properties?: Record<string, any>) => {
      try {
        posthog.capture('donation_start', {
          amount,
          isMonthly,
          timestamp: new Date().toISOString(),
          ...properties,
        })
      } catch (error) {
        console.warn('Analytics tracking failed:', error)
      }
    },

    trackDonationComplete: (amount: number, isMonthly: boolean, sessionId: string, properties?: Record<string, any>) => {
      try {
        posthog.capture('donation_complete', {
          amount,
          isMonthly,
          sessionId,
          timestamp: new Date().toISOString(),
          ...properties,
        })
      } catch (error) {
        console.warn('Analytics tracking failed:', error)
      }
    },

    trackDonationCancel: (amount: number, reason: string, properties?: Record<string, any>) => {
      try {
        posthog.capture('donation_cancel', {
          amount,
          reason,
          timestamp: new Date().toISOString(),
          ...properties,
        })
      } catch (error) {
        console.warn('Analytics tracking failed:', error)
      }
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
