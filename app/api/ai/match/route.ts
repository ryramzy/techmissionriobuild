import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"
import { FieldValue } from "firebase-admin/firestore"

interface MentorProfile {
  name: string
  specialization: string
  background: string
}

export async function POST(req: NextRequest) {
  try {
    const { fellowId, mentorProfile } = (await req.json()) as {
      fellowId: string
      mentorProfile: MentorProfile
    }

    if (!fellowId || !mentorProfile || !mentorProfile.name || !mentorProfile.specialization) {
      return NextResponse.json(
        { error: "Missing required parameters (fellowId, mentorProfile)" },
        { status: 400 }
      )
    }

    let fellowData: any = null

    if (adminDb) {
      const fellowSnap = await adminDb.collection("fellows").doc(fellowId).get()
      if (fellowSnap.exists) {
        fellowData = fellowSnap.data()
      }
    }

    // Fallback if fellow doc not found or adminDb missing (for development previews)
    if (!fellowData) {
      fellowData = {
        name: "Simulated Student",
        schoolCampus: "FAETEC Santa Cruz",
        itTracks: ["Web Development"],
        skills: ["HTML", "CSS", "JavaScript", "React"],
        goal: "Become a Full-Stack Developer",
      }
    }

    const openaiApiKey = process.env.OPENAI_API_KEY
    let matchResult: {
      score: number
      reasoning: string
      alignmentFactors: string[]
      recommendations: string[]
    }

    if (openaiApiKey) {
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiApiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            response_format: { type: "json_object" },
            messages: [
              {
                role: "system",
                content:
                  "You are an AI matching agent for TechMission Rio aligning Brazilian tech students with global mentors. Output a valid JSON object only containing: score (number 0-100), reasoning (string), alignmentFactors (array of strings), recommendations (array of strings).",
              },
              {
                role: "user",
                content: `Please evaluate the compatibility between the following student fellow and mentor profile.
                
                STUDENT FELLOW:
                - Name: ${fellowData.name}
                - Campus: ${fellowData.schoolCampus}
                - Specialized Track: ${fellowData.itTracks?.join(", ") || "General IT"}
                - Key Skills: ${fellowData.skills?.join(", ") || "Coding"}
                - Target Goal: ${fellowData.goal}
                
                MENTOR PROFILE:
                - Name: ${mentorProfile.name}
                - Specialization: ${mentorProfile.specialization}
                - Professional Background: ${mentorProfile.background}`,
              },
            ],
          }),
        })

        if (!response.ok) {
          throw new Error(`OpenAI API returned status ${response.status}`)
        }

        const data = await response.json()
        const textContent = data.choices?.[0]?.message?.content
        matchResult = JSON.parse(textContent)
      } catch (err) {
        console.warn("OpenAI call failed, falling back to heuristic matching:", err)
        matchResult = runHeuristicMatch(fellowData, mentorProfile)
      }
    } else {
      console.warn("OPENAI_API_KEY is unconfigured. Running heuristic matcher.")
      matchResult = runHeuristicMatch(fellowData, mentorProfile)
    }

    // Save match to Firestore
    let matchId = "simulated-match-id"
    if (adminDb) {
      const matchDoc = await adminDb.collection("matches").add({
        fellowId,
        fellowName: fellowData.name,
        mentorName: mentorProfile.name,
        mentorSpecialization: mentorProfile.specialization,
        score: matchResult.score,
        reasoning: matchResult.reasoning,
        alignmentFactors: matchResult.alignmentFactors,
        recommendations: matchResult.recommendations,
        createdAt: FieldValue.serverTimestamp(),
      })
      matchId = matchDoc.id
    }

    return NextResponse.json({
      success: true,
      matchId,
      match: matchResult,
      simulated: !openaiApiKey,
    })
  } catch (error: any) {
    console.error("AI matching route error:", error)
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}

function runHeuristicMatch(fellow: any, mentor: MentorProfile) {
  // Simple heuristic algorithm comparing tech alignment
  const fellowTracksStr = (fellow.itTracks || []).join(" ").toLowerCase()
  const fellowSkillsStr = (fellow.skills || []).join(" ").toLowerCase()
  const mentorSpec = mentor.specialization.toLowerCase()
  const mentorBg = mentor.background.toLowerCase()

  let score = 50 // Base score
  const alignmentFactors: string[] = []

  // Check Track Alignment
  if (
    (fellowTracksStr.includes("web") && (mentorSpec.includes("web") || mentorSpec.includes("react") || mentorSpec.includes("front"))) ||
    (fellowTracksStr.includes("mobile") && (mentorSpec.includes("mobile") || mentorSpec.includes("ios") || mentorSpec.includes("android") || mentorSpec.includes("react native"))) ||
    (fellowTracksStr.includes("data") && (mentorSpec.includes("data") || mentorSpec.includes("python") || mentorSpec.includes("sql") || mentorSpec.includes("ml"))) ||
    (fellowTracksStr.includes("design") && (mentorSpec.includes("design") || mentorSpec.includes("figma") || mentorSpec.includes("ui") || mentorSpec.includes("ux")))
  ) {
    score += 25
    alignmentFactors.push("Direct specialisation track alignment")
  }

  // Check Skills alignment
  let matchedSkillsCount = 0
  const skillsList = fellow.skills || ["javascript", "react", "html", "css", "python", "figma"]
  skillsList.forEach((skill: string) => {
    const s = skill.toLowerCase()
    if (mentorSpec.includes(s) || mentorBg.includes(s)) {
      matchedSkillsCount++
    }
  })

  if (matchedSkillsCount > 0) {
    score += Math.min(matchedSkillsCount * 5, 20)
    alignmentFactors.push(`Matched key tech stack skills (${matchedSkillsCount} overlap)`)
  } else {
    alignmentFactors.push("Complementary background skills matching")
  }

  if (score > 95) score = 95 // Cap heuristic match

  // Reasoning and recommendations
  const reasoning = `Based on our heuristic evaluation, ${fellow.name} shows a strong ${score}% compatibility score with ${mentor.name}. The mentor's background in ${mentor.specialization} aligns well with the student's training in ${fellow.itTracks?.[0] || "IT"} at ${fellow.schoolCampus}.`
  
  const recommendations = [
    "Schedule a 15-minute introductory technical pairing session.",
    "Align on GitHub project reviews for the student's next bootcamp project.",
    "Formulate an industry career map pointing out keys to entry-level tech roles.",
  ]

  return {
    score,
    reasoning,
    alignmentFactors,
    recommendations,
  }
}
