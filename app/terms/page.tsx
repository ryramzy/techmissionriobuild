import { Metadata } from "next"
import { useLocale, useTranslations } from "next-intl"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Terms of Service | TechMission Rio",
  description: "Terms of Service, platform usage rules, donations, and volunteer agreements for TechMission Rio.",
}

export default function TermsOfServicePage() {
  const locale = useLocale()
  const t = useTranslations("Terms")

  const dateStr = new Date().toLocaleDateString(locale === "pt" ? "pt-BR" : "en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <div className="bg-black text-white min-h-screen pt-24 pb-16">
      <div className="max-w-[720px] mx-auto px-6 space-y-12 leading-relaxed text-gray-300">
        
        {/* Header */}
        <div className="border-b border-gray-900 pb-6 text-center lg:text-left">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">{t("title")}</h1>
          <p className="text-xs text-gray-500 mt-2">
            {t("lastUpdated", { date: dateStr })}
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">{t("sec1Title")}</h2>
          <p className="text-xs leading-relaxed">
            {t("sec1Text")}
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">{t("sec2Title")}</h2>
          <p className="text-xs leading-relaxed">
            {t("sec2Text")}
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">{t("sec3Title")}</h2>
          <p className="text-xs leading-relaxed">
            {t("sec3Text")}
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">{t("sec4Title")}</h2>
          <p className="text-xs leading-relaxed">
            {t("sec4Text")}
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-4">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">{t("sec5Title")}</h2>
          <p className="text-xs leading-relaxed">
            {t("sec5Text")}
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-4">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">{t("sec6Title")}</h2>
          <p className="text-xs leading-relaxed">
            {t("sec6Text")}
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-4">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">{t("sec7Title")}</h2>
          <p className="text-xs leading-relaxed">
            {t("sec7Text")}
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-4">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">{t("sec8Title")}</h2>
          <p className="text-xs leading-relaxed">
            {t("sec8Text")}
          </p>
        </section>

      </div>
    </div>
  )
}
