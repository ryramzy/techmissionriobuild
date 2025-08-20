import { Metadata } from "next";
import ContactForm from "./ContactForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | TechMission Rio",
  description:
    "Get in touch with us for information about our programs, partnerships, volunteering, and how to support our mission.",
};

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold">Contact</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            We'd love to hear from you. Donors, partners, volunteers—this is the best place to start.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-5">
          {/* Left: Form */}
          <section className="md:col-span-3">
            <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
              <h2 className="mb-4 text-2xl font-semibold">Get in Touch</h2>
              <ContactForm />
            </div>
          </section>

          {/* Right: Info / Trust */}
          <aside className="space-y-8 md:col-span-2">
            {/* Quick contact */}
            <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
              <h3 className="mb-3 text-xl font-semibold">Contact Information</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                <li>
                  <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">General</span>
                  <a className="text-blue-600 hover:underline dark:text-blue-400" href="mailto:info@techmissionrio.org">
                    info@techmissionrio.org
                  </a>
                </li>
                <li>
                  <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">Admin</span>
                  <a className="text-blue-600 hover:underline dark:text-blue-400" href="mailto:admin@techmissionrio.org">
                    admin@techmissionrio.org
                  </a>
                </li>
                <li>
                  <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">Location</span>
                  Rio de Janeiro, Brazil
                </li>
              </ul>
              <div className="mt-5 flex items-center gap-3">
                <a
                  href="https://www.instagram.com/techmissionrio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 text-white transition-transform hover:scale-105"
                >
                  Instagram
                </a>
                <Link
                  href="/donate"
                  className="rounded-lg bg-blue-950 px-4 py-2 text-white transition-colors hover:bg-blue-800"
                >
                  Donate
                </Link>
              </div>
            </div>

            {/* Hours */}
            <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
              <h3 className="mb-3 text-xl font-semibold">Business Hours</h3>
              <p className="text-gray-600 dark:text-gray-300">Mon–Fri: 9:00–18:00</p>
              <p className="text-gray-600 dark:text-gray-300">Sat: 9:00–13:00</p>
              <p className="text-gray-600 dark:text-gray-300">Sun: Closed</p>
            </div>

            {/* FAQ (quick trust) */}
            <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
              <h3 className="mb-3 text-xl font-semibold">FAQ</h3>
              <details className="group">
                <summary className="cursor-pointer font-medium text-gray-800 dark:text-gray-100">
                  How can I donate?
                </summary>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Visit our <Link href="/donate" className="text-blue-600 hover:underline dark:text-blue-400">Donate</Link> page
                  for one-time or monthly giving options.
                </p>
              </details>
              <details className="group mt-3">
                <summary className="cursor-pointer font-medium text-gray-800 dark:text-gray-100">
                  How do partnerships work?
                </summary>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Select "Partnership" in the form and share your idea—we'll reply within 2–3 business days.
                </p>
              </details>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
} 