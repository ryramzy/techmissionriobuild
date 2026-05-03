import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

interface RecommendationRequest {
  userContext?: {
    previousDonations?: number[]
    visitCount?: number
    timeOnPage?: number
    source?: string
  }
  currentAmount?: number
  isMonthly?: boolean
}

export async function POST(request: NextRequest) {
  try {
    const body: RecommendationRequest = await request.json()
    
    const prompt = `
You are an AI donation advisor for TechMission Rio, a non-profit that provides technology education to youth in Rio de Janeiro.

CONTEXT:
- Mission: Empower Rio's youth through technology education
- Current donation tiers: $25 (materials), $100 (mentorship), $500 (full program)
- User context: ${JSON.stringify(body.userContext || {})}
- Current selected amount: $${body.currentAmount || 0}
- Monthly vs one-time: ${body.isMonthly ? 'Monthly' : 'One-time'}

TASK: Provide a personalized donation recommendation with reasoning.

RESPONSE FORMAT (JSON):
{
  "recommendedAmount": 25|100|500|custom,
  "customAmount": number (if recommendedAmount is "custom"),
  "reasoning": "Brief explanation of why this amount is recommended",
  "impact": "Specific impact this donation will make",
  "confidence": 0.8 (how confident you are in this recommendation),
  "upsellMessage": "Short message encouraging the higher amount if appropriate"
}

RULES:
- Recommend amounts that make sense for the user context
- If user has donated before, consider suggesting a slight increase
- If first-time visitor, recommend the most popular tier ($100)
- Always provide specific, tangible impact
- Keep reasoning concise and motivational
- Be encouraging but not pushy
- Consider monthly vs one-time in your recommendation
`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful donation advisor for a non-profit organization. Always respond with valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 300,
      temperature: 0.7,
    })

    const response = completion.choices[0]?.message?.content
    
    if (!response) {
      throw new Error('No response from AI')
    }

    try {
      const recommendation = JSON.parse(response)
      return NextResponse.json(recommendation)
    } catch (parseError) {
      // Fallback if JSON parsing fails
      return NextResponse.json({
        recommendedAmount: 100,
        reasoning: "Based on our analysis, $100 provides the best balance of impact and accessibility",
        impact: "Funds one month of mentorship for a Rio youth, including 1:1 guidance and career coaching",
        confidence: 0.7,
        upsellMessage: "Consider $500 to fund a complete tech education program for one student"
      })
    }

  } catch (error) {
    console.error('AI recommendation error:', error)
    
    // Fallback recommendation
    return NextResponse.json({
      recommendedAmount: 100,
      reasoning: "Our most popular option that provides significant impact",
      impact: "Supports one month of mentorship for a Rio fellow",
      confidence: 0.6,
      upsellMessage: "Upgrade to $500 to fund a complete student program"
    })
  }
}
