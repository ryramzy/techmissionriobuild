"use client"

import { usePostHog } from 'posthog-js/react'
import { useEffect, useState } from 'react'

export function useABTesting() {
  const posthog = usePostHog()
  const [activeVariants, setActiveVariants] = useState<Record<string, string>>({})

  useEffect(() => {
    // Only run A/B tests if PostHog is available
    if (!posthog) {
      console.warn('PostHog not available, A/B testing disabled')
      return
    }

export interface TestVariant {
  name: string
  weight: number
  config: Record<string, any>
}

export interface ABTest {
  name: string
  variants: TestVariant[]
  enabled: boolean
}

const AB_TESTS: ABTest[] = [
  {
    name: 'donation_default_amount',
    enabled: true,
    variants: [
      {
        name: 'control',
        weight: 50,
        config: { defaultAmount: 25 }
      },
      {
        name: 'variant_100',
        weight: 50,
        config: { defaultAmount: 100 }
      }
    ]
  },
  {
    name: 'hero_headline',
    enabled: true,
    variants: [
      {
        name: 'control',
        weight: 33,
        config: {
          headline: 'Empower Rio\'s Youth',
          subheadline: 'Through Technology'
        }
      },
      {
        name: 'variant_impact',
        weight: 33,
        config: {
          headline: 'Transform Lives in Rio',
          subheadline: 'One Donation at a Time'
        }
      },
      {
        name: 'variant_urgency',
        weight: 34,
        config: {
          headline: 'Help 50 Students Launch Tech Careers',
          subheadline: 'Your Donation Makes It Possible'
        }
      }
    ]
  },
  {
    name: 'founder_story_placement',
    enabled: true,
    variants: [
      {
        name: 'control',
        weight: 50,
        config: { placement: 'after_impact' }
      },
      {
        name: 'variant_above_fold',
        weight: 50,
        config: { placement: 'above_fold' }
      }
    ]
  },
  {
    name: 'monthly_toggle_default',
    enabled: true,
    variants: [
      {
        name: 'control',
        weight: 50,
        config: { defaultMonthly: false }
      },
      {
        name: 'variant_monthly',
        weight: 50,
        config: { defaultMonthly: true }
      }
    ]
  }
]

export function useABTesting() {
  const posthog = usePostHog()
  const [activeVariants, setActiveVariants] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const variants: Record<string, string> = {}
    
    AB_TESTS.forEach(test => {
      if (!test.enabled) {
        variants[test.name] = 'control'
        return
      }

      // Check if user is already in a test variant
      const storedVariant = localStorage.getItem(`ab_test_${test.name}`)
      if (storedVariant) {
        variants[test.name] = storedVariant
        ;(posthog as any).track('ab_test_assigned', {
          test_name: test.name,
          variant: storedVariant,
          source: 'stored'
        })
        return
      }

      // Assign new variant
      const variant = assignVariant(test)
      variants[test.name] = variant.name
      localStorage.setItem(`ab_test_${test.name}`, variant.name)
      
      // Track assignment
      (posthog as any).track('ab_test_assigned', {
        test_name: test.name,
        variant: variant.name,
        source: 'new_assignment'
      })
    })

    setActiveVariants(variants)
    setLoading(false)
  }, [posthog])

  const assignVariant = (test: ABTest): TestVariant => {
    const totalWeight = test.variants.reduce((sum, variant) => sum + variant.weight, 0)
    const random = Math.random() * totalWeight
    
    let cumulativeWeight = 0
    for (const variant of test.variants) {
      cumulativeWeight += variant.weight
      if (random <= cumulativeWeight) {
        return variant
      }
    }
    
    return test.variants[0] // Fallback
  }

  const getVariant = (testName: string): TestVariant | null => {
    const test = AB_TESTS.find(t => t.name === testName)
    const variant = test?.variants?.find(v => v.name === activeVariants[testName]) || test.variants[0]
    return variant || null
  }

  const getVariantConfig = (testName: string): Record<string, any> => {
    const variant = getVariant(testName)
    return variant?.config || {}
  }

  const getVariantConfig = (testName: string): Record<string, any> => {
    const variant = getVariant(testName)
    return variant?.config || {}
  }

  const trackConversion = (testName: string, conversionType: string, value?: number) => {
    if (posthog) {
      const variant = getVariant(testName)
      if (!variant) return
      posthog.track('ab_test_conversion', {
        test_name: testName,
        variant: variant.name,
        conversion_type: conversionType,
        value,
        timestamp: new Date().toISOString(),
      })
    }
  }

  const trackFunnelStep = (step: string, properties?: Record<string, any>) => {
    if (posthog) {
      posthog.track('funnel_step', {
        step,
        variants: activeVariants,
        timestamp: new Date().toISOString(),
        ...properties,
      })
    }
  }

  return {
    activeVariants,
    loading,
    getVariant,
    getVariantConfig,
    trackConversion,
    trackFunnelStep,
    isTestEnabled: (testName: string) => {
      const test = AB_TESTS.find(t => t.name === testName)
      return test?.enabled || false
    },
  }
}
