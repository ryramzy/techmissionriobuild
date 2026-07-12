import { Metadata } from "next"
import Link from "next/link"
import ContactForm from "./ContactForm"
import { useTranslations } from "next-intl"

/** Force static; form is client component */
export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Contact | TechMission Rio",
  description:
    "Get in touch with us for information about our programs, partnerships, volunteering, and how to support our mission.",
};

export default function ContactPage() {
  const t = useTranslations("Contact")

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold">{t("title")}</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            {t("subtitle")}
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-5">
          {/* Left: Form */}
          <section className="md:col-span-3">
            <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
              <h2 className="mb-4 text-2xl font-semibold">{t("getInTouch")}</h2>
              <ContactForm />
            </div>
          </section>

          {/* Right: Info / Trust */}
          <aside className="space-y-8 md:col-span-2">
            {/* Quick contact */}
            <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
              <h3 className="mb-3 text-xl font-semibold">{t("infoTitle")}</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                <li>
                  <span className="block text-sm font-medium text-gray-600 dark:text-gray-300">{t("generalLabel")}</span>
                  <a className="text-blue-600 hover:underline dark:text-blue-400" href="mailto:info@techmissionrio.org">
                    info@techmissionrio.org
                  </a>
                </li>
                <li>
                  <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">{t("adminLabel")}</span>
                  <a className="text-blue-600 hover:underline dark:text-blue-400" href="mailto:admin@techmissionrio.org">
                    admin@techmissionrio.org
                  </a>
                </li>
                <li>
                  <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">{t("locationLabel")}</span>
                  {t("locationValue")}
                </li>
              </ul>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <a
                  href="https://www.instagram.com/techmissionrio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 px-3.5 py-2 text-xs font-bold text-white transition-transform hover:scale-105"
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/techmissionrio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-[#1877F2] hover:bg-[#166FE5] px-3.5 py-2 text-xs font-bold text-white transition-transform hover:scale-105"
                >
                  Facebook
                </a>
                <a
                  href="https://www.tiktok.com/@techmissionrio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-black hover:bg-[#111111] border border-gray-700 px-3.5 py-2 text-xs font-bold text-white transition-transform hover:scale-105"
                >
                  TikTok
                </a>
                <Link
                  href="/donate"
                  className="rounded-lg bg-blue-950 hover:bg-blue-800 px-3.5 py-2 text-xs font-bold text-white transition-colors"
                >
                  {t("sendButton", { defaultValue: "Donate" })}
                </Link>
              </div>
            </div>

            {/* Hours */}
            <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
              <h3 className="mb-3 text-xl font-semibold">{t("hoursTitle")}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t("hoursWeek")}</p>
              <p className="text-gray-600 dark:text-gray-300">{t("hoursSat")}</p>
              <p className="text-gray-600 dark:text-gray-300">{t("hoursSun")}</p>
            </div>

            {/* FAQ (quick trust) */}
            <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
              <h3 className="mb-3 text-xl font-semibold">{t("faqTitle")}</h3>
              <details className="group">
                <summary className="cursor-pointer font-medium text-gray-800 dark:text-gray-100">
                  {t("faqQ1")}
                </summary>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {t("faqA1")}
                </p>
              </details>
              <details className="group mt-3">
                <summary className="cursor-pointer font-medium text-gray-800 dark:text-gray-100">
                  {t("faqQ2")}
                </summary>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {t("faqA2")}
                </p>
              </details>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
} 