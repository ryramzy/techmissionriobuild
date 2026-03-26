import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Mission & Vision | TechMission Rio",
  description:
    "Learn about TechMission Rio's mission and vision for empowering Brazilian youth.",
}

/** Force static */
export const dynamic = "force-static"

export default function MissionPage() {
  return (
    <div className="bg-off-white min-h-[100dvh] flex flex-col pt-24 pb-16">
      <div className="max-w-4xl mx-auto w-full px-6 flex-1">
        
        {/* Manifesto / Who We Are */}
        <section className="mb-16">
          <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-vibrant-mint mb-6">Who we are</p>
          <p className="text-lg md:text-xl leading-[1.8] text-forest-green/80 border-l-[3px] border-vibrant-mint pl-5 font-medium">
            We believe the best technology is built <strong className="text-vibrant-mint font-bold">for people</strong>, not just profit. TechMission Rio is a grassroots crew — developers, designers, volunteers, and neighbours — coming together to use tech as a tool for real community change in Rio.
          </p>
        </section>

        {/* Divider */}
        <div className="h-px bg-forest-green/5 w-full mb-16"></div>

        {/* Pillars / What We Do */}
        <section className="mb-16">
          <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-vibrant-mint mb-8">What we do</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Coding */}
            <div className="bg-white/40 border border-forest-green/5 rounded-2xl p-5 hover:bg-white/60 transition shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-vibrant-mint/10 flex items-center justify-center mb-4 text-vibrant-mint">
                <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                  <rect x="2" y="3" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M6 9l2.5 2.5L14 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-syne text-[14px] font-bold text-forest-green mb-1.5">Coding workshops</h3>
              <p className="text-[12px] text-forest-green/60 leading-relaxed">Free classes for youth in favelas and local communities</p>
            </div>

            {/* Meetups */}
            <div className="bg-white/40 border border-forest-green/5 rounded-2xl p-5 hover:bg-white/60 transition shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-vibrant-mint/10 flex items-center justify-center mb-4 text-vibrant-mint">
                <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                  <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M10 6v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="font-syne text-[14px] font-bold text-forest-green mb-1.5">Meetups & events</h3>
              <p className="text-[12px] text-forest-green/60 leading-relaxed">Regular gatherings where ideas and people collide</p>
            </div>

            {/* Outreach */}
            <div className="bg-white/40 border border-forest-green/5 rounded-2xl p-5 hover:bg-white/60 transition shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-vibrant-mint/10 flex items-center justify-center mb-4 text-vibrant-mint">
                <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                  <path d="M10 2C7 2 4 4.5 4 8c0 4.5 6 10 6 10s6-5.5 6-10c0-3.5-3-6-6-6z" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <h3 className="font-syne text-[14px] font-bold text-forest-green mb-1.5">Local outreach</h3>
              <p className="text-[12px] text-forest-green/60 leading-relaxed">Boots on the ground across Rio's neighbourhoods</p>
            </div>

            {/* Faith */}
            <div className="bg-white/40 border border-forest-green/5 rounded-2xl p-5 hover:bg-white/60 transition shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-vibrant-mint/10 flex items-center justify-center mb-4 text-vibrant-mint">
                <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                  <path d="M10 16s-7-4.5-7-9a4 4 0 0 1 7-2.65A4 4 0 0 1 17 7c0 4.5-7 9-7 9z" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <h3 className="font-syne text-[14px] font-bold text-forest-green mb-1.5">Faith & purpose</h3>
              <p className="text-[12px] text-forest-green/60 leading-relaxed">Rooted in values, open to everyone — sem julgamento</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}