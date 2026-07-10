"use client"

import { useEffect } from "react"

export default function PWARegister() {
  useEffect(() => {
    if (
      process.env.NODE_ENV === "production" &&
      typeof window !== "undefined" &&
      "serviceWorker" in navigator
    ) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => {
            console.log("PWA Service Worker registered successfully:", reg.scope)
          })
          .catch((err) => {
            console.warn("PWA Service Worker registration failed:", err)
          })
      })
    }
  }, [])

  return null
}
