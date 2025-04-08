import { Metadata } from "next"
import Link from "next/link"
import { Button } from "components/Button/Button"

export const metadata: Metadata = {
  title: "Get Involved | TechMission Rio",
  description: "Discover how you can be part of transforming lives through technology",
}

export default function GetInvolvedPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-4xl font-bold">Get Involved</h1>
        
        <div className="space-y-8">
          <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-semibold">Volunteering</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Become a mentor, tutor, or instructor. Share your knowledge and make a difference in the lives of youth.
            </p>
            <Link href="/contact">
              <Button variant="secondary">
                I Want to Volunteer
              </Button>
            </Link>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-semibold">Partnerships</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Companies and organizations can support through:
            </p>
            <ul className="mb-6 list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
              <li>Equipment donations</li>
              <li>Program sponsorship</li>
              <li>Internship opportunities</li>
              <li>Workshops and lectures</li>
            </ul>
            <Link href="/contact">
              <Button variant="secondary">
                Become a Partner
              </Button>
            </Link>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-semibold">Donations</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Your contribution helps maintain our programs and expand our impact.
            </p>
            <div className="mb-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <h3 className="mb-2 font-semibold">Monthly Donation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Support our programs monthly and help sustain our mission.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <h3 className="mb-2 font-semibold">One-time Donation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Contribute a one-time amount for specific projects or immediate needs.
                </p>
              </div>
            </div>
            <Link href="/donate">
              <Button variant="primary" className="w-full">
                Make a Donation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
} 