import Head from 'next/head';

export default function MissionPage() {
  return (
    <>
      <Head>
        <title>Our Mission & Vision - TechMissionRio</title>
        <meta name="description" content="Learn about TechMissionRio's mission and vision for empowering Brazilian youth." />
      </Head>
      <main className="min-h-screen bg-white">
      {/* Mission Section */}
      <div className="relative py-20 bg-white overflow-hidden">
        {/* Decorative Background Circle */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-100 rounded-full opacity-30 z-0"></div>

        {/* Section Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700">
            We aim to empower communities in Rio through technology, collaboration, and inclusive innovation.
          </p>
        </div>
      </div>

      {/* Vision Section */}
      <div className="relative py-20 bg-white overflow-hidden">
        <div className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-purple-100 rounded-full opacity-30 z-0"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Our Vision</h2>
          <p className="text-lg text-gray-700">
            We envision a thriving, tech-powered Rio that centers equity, sustainability, and global connectivity.
          </p>
        </div>
      </div>
      </main>
    </>
  );
}