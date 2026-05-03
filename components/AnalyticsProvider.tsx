"use client"

import { PostHogProvider } from 'posthog-js/react'
import { ReactNode } from 'react'

interface AnalyticsProviderProps {
  children: ReactNode
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  // PostHog will be initialized lazily when needed
  return (
    <PostHogProvider 
      apiKey={process.env.NEXT_PUBLIC_POSTHOG_KEY!}
      options={{
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
        capture_pageview: true,
        capture_pageleave: true,
        autocapture: true,
      }}
    >
      {children}
    </PostHogProvider>
  )
}
