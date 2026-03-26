import Image from "next/image"
import Link from "next/link"

/** Force static to reduce DoS impact from repeated page loads */
export const dynamic = "force-static"

export const metadata = {
  title: 'TechMission Rio - Empowering Youth Through Technology',
  description: 'Join us in our mission to transform lives through technology education and mentorship in Rio de Janeiro.',
}

export default function Home() {
  return (
    <div className="bg-forest-green flex flex-col min-h-[100dvh]">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] bg-[#0e5c38] overflow-hidden flex flex-col items-center justify-center pt-24 pb-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero landing.jpg"
            alt="Rio de Janeiro landscape"
            fill
            className="object-cover brightness-50"
            priority
          />
          {/* Subtle green overlay to maintain the 'Carioca Coastal Club' aesthetic */}
          <div className="absolute inset-0 bg-[#0e5c38]/40 mix-blend-multiply"></div>
        </div>

        <div className="absolute -top-[60px] -right-[60px] w-[220px] h-[220px] rounded-full border-[40px] border-vibrant-mint/20 z-0"></div>
        <div className="absolute -bottom-[80px] -left-[40px] w-[180px] h-[180px] rounded-full border-[30px] border-white/10 z-0"></div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-vibrant-mint/15 border border-vibrant-mint/30 rounded-full py-1.5 px-3.5 mb-6">
            <div className="w-2 h-2 rounded-full bg-vibrant-mint animate-pulse"></div>
            <span className="text-[11px] font-semibold text-vibrant-mint tracking-widest uppercase">Now in Rio</span>
          </div>
          <h1 className="font-syne text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] mb-6">
            Tech with a <br className="hidden md:block" /><em className="text-vibrant-mint not-italic">mission.</em><br className="hidden md:block" />Right here.
          </h1>
          <p className="text-[14px] md:text-base text-white/60 leading-relaxed max-w-[480px] mx-auto mb-8">
            TechMission Rio is building a community where technology meets purpose — connecting coders, creatives, and faith-driven humans across the Cidade Maravilhosa.
          </p>
          <div className="flex flex-wrap justify-center gap-2 relative">
            <span className="text-[11px] font-bold py-1.5 px-3 rounded-full bg-vibrant-mint text-forest-green">Gratuito / Free</span>
            <span className="text-[11px] font-medium py-1.5 px-3 rounded-full border border-white/20 text-white/65">Rio de Janeiro</span>
            <span className="text-[11px] font-medium py-1.5 px-3 rounded-full border border-white/20 text-white/65">Comunidade</span>
            <span className="text-[11px] font-medium py-1.5 px-3 rounded-full border border-white/20 text-white/65">Tech + Fé</span>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 md:py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-vibrant-mint mb-8 text-center md:text-left">Growing fast</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-vibrant-mint/5 border border-vibrant-mint/15 rounded-2xl p-6 text-center hover:bg-vibrant-mint/10 transition">
              <div className="font-syne text-[2rem] font-extrabold text-vibrant-mint leading-none">200+</div>
              <div className="text-[12px] text-white/45 mt-3 leading-relaxed">Community members</div>
            </div>
            <div className="bg-vibrant-mint/5 border border-vibrant-mint/15 rounded-2xl p-6 text-center hover:bg-vibrant-mint/10 transition">
              <div className="font-syne text-[2rem] font-extrabold text-vibrant-mint leading-none">12</div>
              <div className="text-[12px] text-white/45 mt-3 leading-relaxed">Events this year</div>
            </div>
            <div className="bg-vibrant-mint/5 border border-vibrant-mint/15 rounded-2xl p-6 text-center hover:bg-vibrant-mint/10 transition">
              <div className="font-syne text-[2rem] font-extrabold text-vibrant-mint leading-none">5</div>
              <div className="text-[12px] text-white/45 mt-3 leading-relaxed">Zonas atendidas</div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-white/5 max-w-4xl mx-auto w-full"></div>

      {/* Testimonials */}
      <section className="py-16 md:py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-vibrant-mint mb-8 text-center md:text-left">From the community</p>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 hover:border-white/20 transition">
            <p className="font-syne text-lg md:text-xl font-bold text-white leading-relaxed mb-6">
              "Nunca pensei que tecnologia poderia ser algo para mim — TechMission Rio mudou isso completamente."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1a6b4a] flex items-center justify-center text-[12px] font-bold text-vibrant-mint">
                JS
              </div>
              <span className="text-[13px] text-white/40 font-medium">João S., workshop participant — Rocinha</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="bg-vibrant-mint rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <h3 className="font-syne text-2xl md:text-3xl font-extrabold text-[#0a3d24] leading-snug">Be part of it.</h3>
              <p className="text-[14px] md:text-base text-[#0a3d24]/70 mt-2 font-medium">Join the community — free, open, Rio-born.</p>
            </div>
            <Link href="/get-involved">
              <button className="bg-[#0e5c38] hover:bg-[#1a8a56] transition-colors text-white font-syne text-[14px] font-bold py-4 px-8 rounded-full whitespace-nowrap shadow-lg shadow-[#0a3d24]/20 hover:-translate-y-0.5 transform duration-200">
                Get involved
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#081409] py-8 px-6 mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[12px] text-white/30 font-medium">TechMission Rio — Rio de Janeiro, RJ, Brasil</span>
          <Link href="/" className="text-[12px] text-vibrant-mint hover:text-white transition-colors font-semibold">techmissionrio.org</Link>
        </div>
      </footer>
    </div>
  )
}