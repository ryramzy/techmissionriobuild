"use client"

import { useState, useEffect } from 'react'

interface AIRecommendation {
  recommendedAmount: number
  reasoning: string
  impact: string
  confidence: number
  upsellMessage?: string
}

interface UserContext {
  previousDonations?: number[]
  visitCount?: number
  timeOnPage?: number
  source?: string
}

export function useAIRecommendation(
  currentAmount: number,
  isMonthly: boolean,
  userContext?: UserContext
) {
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getRecommendation = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/ai/recommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userContext,
          currentAmount,
          isMonthly,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get recommendation')
      }

      const data: AIRecommendation = await response.json()
      setRecommendation(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      // Set fallback recommendation
      setRecommendation({
        recommendedAmount: 100,
        reasoning: "Our most popular option that provides significant impact",
        impact: "Supports one month of mentorship for a Rio fellow",
        confidence: 0.6,
        upsellMessage: "Consider $500 to fund a complete student program"
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Get recommendation when component mounts or amount changes
    getRecommendation()
  }, [currentAmount, isMonthly])

  return {
    recommendation,
    loading,
    error,
    refetch: getRecommendation,
  }
}
