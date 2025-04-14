import Head from "next/head";
import React from "react";
import { Button } from "/components/Button/Button";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <Head>
        <title>TechMissionRio</title>
        <meta name="description" content="Empowering Brazilian youth through technology and education." />
      </Head>

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-blue-950 text-white">
          <div className="max-w-7xl mx-auto px-6 py-20 text-center">
            <h1 className="text-4xl md:text-6xl font-bold">Empowering Rio's Future</h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
              Providing Brazilian youth with access to technology, education, and career training.
            </p>
            <div className="mt-6">
              <Link href="/donate">
                <Button className="text-white bg-yellow-500 hover:bg-yellow-600 text-lg px-6 py-3 rounded-full">
                  Donate Now
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="bg-gray-100 py-16">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
            <p className="mt-4 text-gray-600 text-lg">
              TechMissionRio is dedicated to building a physical hub where teens can access tech equipment, receive
              mentoring, and prepare for higher education and future careers.
            </p>
          </div>
        </section>

        {/* More sections like Programs, Testimonials, etc. can go here */}
      </main>
    </>
  );
}