import { Metadata } from "next"
import { Button } from "components/Button/Button"

export const metadata: Metadata = {
  title: "Contact | TechMission Rio",
  description: "Get in touch with us for more information about our programs and how to get involved",
}

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-4xl font-bold">Contact</h1>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-8">
            <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
              <h2 className="mb-4 text-2xl font-semibold">Get in Touch</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="volunteer">Volunteering</option>
                    <option value="partnership">Partnership</option>
                    <option value="donation">Donation</option>
                    <option value="programs">Programs</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500"
                    required
                  ></textarea>
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
              <h2 className="mb-4 text-2xl font-semibold">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Email</h3>
                  <a
                    href="mailto:hello@techmissionrio.org"
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    hello@techmissionrio.org
                  </a>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Location</h3>
                  <p className="text-gray-600 dark:text-gray-300">Rio de Janeiro, Brazil</p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Social Media</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.instagram.com/techmissionrio/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 text-white transition-transform hover:scale-105"
                    >
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      <span>@techmissionrio</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
              <h2 className="mb-4 text-2xl font-semibold">Business Hours</h2>
              <div className="space-y-2 text-gray-600 dark:text-gray-300">
                <p>Monday to Friday: 9am to 6pm</p>
                <p>Saturday: 9am to 1pm</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 