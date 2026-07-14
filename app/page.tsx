import HomeClient from './HomeClient'

export const metadata = {
  title: 'TechMission Rio - Donate & Support Rio Youth',
  description: 'Support TechMission Rio\'s mission to empower Brazilian youth through technology education and mentorship.',
}

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": "TechMission Rio",
    "url": "https://techmissionrio.org",
    "logo": "https://techmissionrio.org/images/logo.png",
    "description": "Connecting Brazilian youth tech talent with US stakeholders, churches, and angel investors to empower underserved students in Rio de Janeiro.",
    "sameAs": [
      "https://www.instagram.com/techmissionrio",
      "https://www.facebook.com/techmissionrio",
      "https://www.tiktok.com/@techmissionrio"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "contact@techmissionrio.org",
      "contactType": "General inquiries"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  )
}
