import { Metadata } from "next"
import Link from "next/link"
import { Button } from "../components/Button/Button"
import Image from "next/image"
import { Navigation } from "./components/Navigation"

export const metadata: Metadata = {
  title: "TechMission Rio - Empowering Youth Through Technology",
  description: "Empowering Brazilian youth through technology, education, and faith",
  twitter: {
    card: "summary_large_image",
    title: "TechMission Rio - Empowering Youth Through Technology",
    description: "Empowering Brazilian youth through technology, education, and faith",
    creator: "@techmissionrio",
  },
  openGraph: {
    title: "TechMission Rio - Empowering Youth Through Technology",
    description: "Empowering Brazilian youth through technology, education, and faith",
    url: "https://techmissionrio.org",
    siteName: "TechMission Rio",
    locale: "en_US",
    type: "website",
  },
}

export default function Home() {
  return (
    <>
      <Navigation />

      <main className="flex flex-col">
        <div className="relative h-screen">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/rio-christ.jpg"
              alt="Christ the Redeemer overlooking Rio de Janeiro"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60 flex items-center justify-center">
            <div 
              className="text-center text-white px-4 max-w-4xl mx-auto animate-fade-in"
            >
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
                Empowering Communities Through Tech
              </h1>
              <p className="text-lg md:text-xl mb-8 drop-shadow-md max-w-2xl mx-auto">
                Join the mission to bridge the digital divide in Rio
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-involved">
                  <Button variant="vibrant" size="lg" className="shadow-lg hover:scale-105 transition">
                    Get Involved
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="secondary" size="lg" className="shadow-lg hover:scale-105 transition">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <section className="relative py-24 bg-gradient-to-b from-primary to-accent overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/rio-cable-car.jpg"
              alt="Cable car to Sugarloaf Mountain"
              fill
              className="object-cover opacity-20"
            />
          </div>
          <div 
            className="container mx-auto px-4 relative z-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div 
                className="flex flex-col gap-4 rounded-xl bg-white/10 p-6 backdrop-blur-sm hover:bg-white/20 transition hover:scale-105"
              >
                <h3 className="text-2xl font-bold text-white">Technology Access</h3>
                <div className="text-lg text-white/90">
                  Providing computers, internet, and technological resources to youth in underserved communities.
                </div>
              </div>
              <div 
                className="flex flex-col gap-4 rounded-xl bg-white/10 p-6 backdrop-blur-sm hover:bg-white/20 transition hover:scale-105"
              >
                <h3 className="text-2xl font-bold text-white">Academic Preparation</h3>
                <div className="text-lg text-white/90">
                  Programming, robotics, and software development courses for talented youth.
                </div>
              </div>
              <div 
                className="flex flex-col gap-4 rounded-xl bg-white/10 p-6 backdrop-blur-sm hover:bg-white/20 transition hover:scale-105"
              >
                <h3 className="text-2xl font-bold text-white">Spiritual Growth</h3>
                <div className="text-lg text-white/90">
                  Integrating Christian values and character development into all our programs.
                </div>
              </div>
            </div>
          </div>
        </section>

        <div 
          className="fixed bottom-4 right-4 md:hidden animate-fade-in"
        >
          <Link href="/join">
            <Button variant="vibrant" size="lg" className="rounded-full shadow-lg hover:scale-105 transition">
              Join the Mission
            </Button>
          </Link>
        </div>
      </main>

      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="flex flex-col items-center md:items-start">
              <Link href="/" className="flex items-center space-x-2 group mb-4">
                <div className="relative w-12 h-12">
                  <Image
                    src="/images/logo.png"
                    alt="TechMission Rio Logo"
                    fill
                    className="object-contain group-hover:scale-105 transition"
                  />
                </div>
                <span className="text-xl font-bold group-hover:text-highlight transition">TechMission Rio</span>
              </Link>
              <p className="text-sm text-white/80 text-center md:text-left">
                Empowering Brazilian youth through technology, education, and faith
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-highlight transition">About Us</Link></li>
                <li><Link href="/programs" className="hover:text-highlight transition">Our Programs</Link></li>
                <li><Link href="/get-involved" className="hover:text-highlight transition">Get Involved</Link></li>
                <li><Link href="/contact" className="hover:text-highlight transition">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-white/80">
                <li>Rio de Janeiro, Brazil</li>
                <li>Email: hello@techmissionrio.org</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-highlight transition">Twitter</a>
                <a href="#" className="hover:text-highlight transition">Instagram</a>
                <a href="#" className="hover:text-highlight transition">LinkedIn</a>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-white/60">
            <p>&copy; {new Date().getFullYear()} TechMission Rio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
