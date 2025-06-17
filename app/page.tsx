import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/Button/Button'

export const metadata = {
  title: 'TechMission Rio - Empowering Youth Through Technology',
  description: 'Join us in our mission to transform lives through technology education and mentorship in Rio de Janeiro.',
}

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero landing.jpg"
            alt="Rio de Janeiro landscape"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Empowering Rio's Future Through Tech & Education
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
            Creating a future where every Brazilian youth has access to opportunity.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-involved">
              <Button variant="primary" size="lg">
                Get Involved
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-20 bg-gray-100 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-200 rounded-full opacity-20"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
          <p className="mt-4 text-gray-600 text-lg">
            TechMissionRio is dedicated to building a physical hub where teens can access tech equipment, receive
            mentoring, and prepare for higher education and future careers.
          </p>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">What We Do</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
          <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Tech Labs</h3>
            <p className="text-gray-600">Equipping youth with hands-on access to laptops, Wi-Fi, and coding tools.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Mentorship</h3>
            <p className="text-gray-600">Guidance from professionals in tech, education, and entrepreneurship.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Career Training</h3>
            <p className="text-gray-600">Workshops and pathways to jobs in Brazil's emerging digital economy.</p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Our Growing Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-4xl font-bold text-blue-800">250+</p>
              <p className="text-gray-600">Youth Reached</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-800">30+</p>
              <p className="text-gray-600">Mentors & Volunteers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-800">12</p>
              <p className="text-gray-600">Partner Orgs</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-800">1</p>
              <p className="text-gray-600">Physical Tech Hub Underway</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <blockquote className="italic text-gray-700 text-lg">
            "Before TechMissionRio, I had never touched a laptop. Now I'm building my first website. This place is changing my life." 
          </blockquote>
          <p className="mt-4 text-blue-800 font-semibold">— Lucas, 17, Participant</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-yellow-400 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Join us in building Rio's tech future</h2>
        <p className="mt-2 text-gray-800">Your support can spark a generation of creators and leaders.</p>
        <div className="mt-4">
          <Link href="/donate">
            <Button variant="primary" size="lg">
              Donate Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Image
                src="/logo.jpg"
                alt="TechMission Rio Logo"
                width={150}
                height={50}
                className="mb-4"
              />
              <p className="text-gray-400">
                Transforming lives through technology education and mentorship.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/programs" className="text-gray-400 hover:text-white">Programs</Link></li>
                <li><Link href="/get-involved" className="text-gray-400 hover:text-white">Get Involved</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Rio de Janeiro, Brazil</li>
                <li>Email: info@techmissionrio.org</li>
                <li>Phone: +55 21 XXXX-XXXX</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} TechMission Rio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}