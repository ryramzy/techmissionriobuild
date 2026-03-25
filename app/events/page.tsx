"use client"

import { Button } from "@/components/Button/Button"

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-[#070b19] text-white overflow-hidden relative selection:bg-purple-500/30">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center">
        {/* Hero Section */}
        <div className="text-center max-w-3xl space-y-8 mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium mb-4">
            <span className="flex w-2 h-2 rounded-full bg-purple-400 mr-2 animate-pulse"></span>
            Coming Soon
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-white/70">
            Events: Coming Soon
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We are curating an exciting lineup of workshops, hackathons, and guest speaker sessions to fuel your journey into tech.
          </p>

          {/* Notify Me Form */}
          <div className="mt-10 mx-auto max-w-md w-full">
            <form className="relative flex items-center w-full" onSubmit={(e) => { e.preventDefault(); }}>
              <input 
                type="email" 
                placeholder="Enter your email to get notified..." 
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-40 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 backdrop-blur-md transition-all"
                required
              />
              <div className="absolute right-2">
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="rounded-full bg-purple-600 hover:bg-purple-500 text-white border-0 shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all hover:shadow-[0_0_30px_rgba(147,51,234,0.5)]"
                >
                  Join Waitlist
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Placeholder Grid */}
        <div className="w-full">
          <h2 className="text-2xl font-bold mb-8 text-white/90 flex items-center gap-3">
            What to Expect
            <div className="h-px bg-white/10 flex-1 ml-4"></div>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Tech Workshops", desc: "Hands-on coding, design, and AI sessions.", icon: "💻" },
              { title: "Mentorship Mixers", desc: "Connect with industry pros in Rio.", icon: "🤝" },
              { title: "Hackathons", desc: "Build & launch projects locally.", icon: "🚀" }
            ].map((item, i) => (
              <div 
                key={i}
                className="group relative bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-4xl mb-6 bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
