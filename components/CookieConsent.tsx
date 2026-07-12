"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

const CONSENT_KEY = "tmr_cookie_consent"

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY)
    if (!consent) setVisible(true)

    // Gate PostHog: only init after consent
    if (consent === "accepted" && typeof window !== "undefined") {
      import("posthog-js").then(({ default: posthog }) => {
        if (!posthog.__loaded) {
          posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
            api_host: "https://app.posthog.com",
          })
        }
      })
    }
  }, [])

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted")
    setVisible(false)
    // Init PostHog now that consent is given
    import("posthog-js").then(({ default: posthog }) => {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: "https://app.posthog.com",
      })
    })
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, "declined")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-[#0c1017] border-t border-[#1f2937] text-gray-200 px-6 py-4 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-sm text-center md:text-left max-w-4xl leading-relaxed">
        We use cookies to improve your experience and measure site usage. See our{" "}
        <Link href="/privacy" className="text-green-400 underline hover:text-green-300">
          Privacy Policy
        </Link>
        . For Brazilian users: isso também se aplica sob a{" "}
        <Link href="/terms" className="text-green-400 underline hover:text-green-300">
          LGPD / Terms of Service
        </Link>
        .
      </div>
      <div className="flex gap-3">
        <button
          onClick={accept}
          className="bg-green-500 hover:bg-green-400 text-black font-bold px-5 py-2 rounded-lg text-sm transition-all"
        >
          Accept
        </button>
        <button
          onClick={decline}
          className="bg-transparent hover:bg-gray-800 border border-gray-700 text-gray-400 px-5 py-2 rounded-lg text-sm transition-all"
        >
          Decline
        </button>
      </div>
    </div>
  )
}
