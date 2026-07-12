import { Metadata } from "next"
import { useLocale, useTranslations } from "next-intl"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Privacy Policy | TechMission Rio",
  description: "Learn about how we process and protect student, educator, and donor personal data in accordance with LGPD and GDPR.",
}

export default function PrivacyPolicyPage() {
  const locale = useLocale()
  const t = useTranslations("Privacy")

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
          <h2 className="text-base font-bold text-white uppercase tracking-wider">{t("introTitle")}</h2>
          <p className="text-xs leading-relaxed">
            {t("introText")}
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">{t("collectTitle")}</h2>
          <p className="text-xs leading-relaxed">{t("collectText")}</p>
          <ul className="list-disc list-inside text-xs space-y-2 text-gray-400">
            <li>{t("collectStudent")}</li>
            <li>{t("collectEducator")}</li>
            <li>{t("collectDonor")}</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">{t("legalTitle")}</h2>
          <p className="text-xs leading-relaxed">
            {t("legalText")}
          </p>
          <ul className="list-disc list-inside text-xs space-y-2 text-gray-400">
            <li>{t("legalItem1")}</li>
            <li>{t("legalItem2")}</li>
            <li>{t("legalItem3")}</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">{t("retentionTitle")}</h2>
          <p className="text-xs leading-relaxed">{t("retentionText")}</p>
          <ul className="list-disc list-inside text-xs space-y-2 text-gray-400">
            <li>{t("retentionItem1")}</li>
            <li>{t("retentionItem2")}</li>
            <li>{t("retentionItem3")}</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-4">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">{t("rightsTitle")}</h2>
          <p className="text-xs leading-relaxed">
            {t("rightsText")}
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-4">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">{t("transferTitle")}</h2>
          <p className="text-xs leading-relaxed">
            {t("transferText")}
          </p>
        </section>

      </div>
    </div>
  )
}
