import Head from 'next/head';

export default function MissionPage() {
  return (
    <>
      <Head>
        <title>Our Mission & Vision - TechMissionRio</title>
        <meta name="description" content="Learn about TechMissionRio's mission and vision for empowering Brazilian youth." />
      </Head>
      <main className="container mx-auto py-16">
        <h1 className="text-3xl font-bold text-center mb-8">Our Mission & Vision</h1>
        <section>
          {/* Add Mission content here */}
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p>To empower Brazilian youth through technology and education.</p>
        </section>
        <section className="mt-12">
          {/* Add Vision content here */}
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p>To create a future where all Brazilian youth have access to technology and quality education.</p>
        </section>
      </main>
    </>
  );
}