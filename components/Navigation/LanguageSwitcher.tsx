"use client"

import { useTransition } from "react"
import { useLocale } from "next-intl"
import { setUserLocale } from "@/lib/locale"

export function LanguageSwitcher() {
  const locale = useLocale()
  const [isPending, startTransition] = useTransition()

  const changeLocale = (nextLocale: string) => {
    if (nextLocale === locale) return
    startTransition(async () => {
      await setUserLocale(nextLocale)
      localStorage.setItem("tmr_locale", nextLocale)
      window.location.reload()
    })
  }

  return (
    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
      <button
        onClick={() => changeLocale("en")}
        disabled={isPending}
        className={`transition-colors py-1 px-1.5 rounded focus:outline-none focus:ring-1 focus:ring-green-400 ${
          locale === "en"
            ? "text-green-400 font-extrabold cursor-default"
            : "hover:text-white cursor-pointer"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="text-gray-800" aria-hidden="true">|</span>
      <button
        onClick={() => changeLocale("pt")}
        disabled={isPending}
        className={`transition-colors py-1 px-1.5 rounded focus:outline-none focus:ring-1 focus:ring-green-400 ${
          locale === "pt"
            ? "text-green-400 font-extrabold cursor-default"
            : "hover:text-white cursor-pointer"
        }`}
        aria-label="Mudar para Português"
      >
        PT
      </button>
    </div>
  )
}
