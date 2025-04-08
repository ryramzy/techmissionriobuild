import { Metadata } from "next"
import Link from "next/link"
import { Button } from "components/Button/Button"

export const metadata: Metadata = {
  title: "About Us | TechMission Rio",
  description: "Learn about our story, mission, and biblical motivation to transform lives through technology",
}

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-4xl font-bold">About Us</h1>

        <div className="space-y-12">
          <section className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-semibold">Our Story</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              TechMission Rio was born from the vision of uniting technology and faith to transform lives. 
              Recognizing the need for access to technology and quality education for youth 
              in underserved communities in Rio de Janeiro, we are dedicated to creating a space where 
              education, career, and spiritual growth go hand in hand.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Our journey began with a small group of Christian technology professionals, united by the desire 
              to make a difference in the lives of Brazilian youth.
            </p>
          </section>

          <section className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-semibold">Our Motivation</h2>
            <blockquote className="mb-6 border-l-4 border-blue-600 pl-4 italic text-gray-600 dark:border-blue-500 dark:text-gray-300">
              "Do not conform to the pattern of this world, but be transformed by the renewing of your mind. 
              Then you will be able to test and approve what God's will is—his good, pleasing and perfect will."
              <br />
              <span className="mt-2 block text-sm">— Romans 12:2</span>
            </blockquote>
            <p className="text-gray-600 dark:text-gray-300">
              We believe that technology can be a powerful tool to transform minds and hearts. Our goal is to 
              empower youth to develop their technical skills while growing in their faith and purpose in Christ.
            </p>
          </section>

          <section className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-semibold">Our Team</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Our team consists of Christian professionals passionate about technology and education. 
              Each member brings their unique experience and commitment to the mission of transforming 
              lives through knowledge and faith.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <h3 className="mb-2 font-semibold">Leadership</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Our leaders combine technology expertise with a deep commitment to the spiritual 
                  development of youth.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <h3 className="mb-2 font-semibold">Volunteers</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Our volunteer network includes technology professionals, educators, and mentors 
                  dedicated to sharing their knowledge and faith.
                </p>
              </div>
            </div>
          </section>

          <div className="text-center">
            <Link href="/get-involved">
              <Button size="lg">
                Get Involved
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
} 