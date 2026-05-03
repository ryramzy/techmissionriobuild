import { ArrowLeft, Heart } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: 'Donation Cancelled - TechMission Rio',
  description: 'Your donation was cancelled. We still appreciate your consideration!',
}

export default function CancelledPage() {
  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center px-6">
        {/* Cancel Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-red-500/20 border border-red-500/50 rounded-full flex items-center justify-center mx-auto">
            <span className="text-4xl text-red-400">✕</span>
          </div>
        </div>

        {/* Cancel Message */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Donation Cancelled
        </h1>
        
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          We understand that circumstances change. Your support for Rio's youth tech education is still greatly appreciated, and we hope you'll consider supporting us in the future.
        </p>

        {/* Alternative Ways to Help */}
        <div className="bg-gradient-to-br from-blue-900/20 to-black border border-blue-500/20 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Other Ways to Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">📢</div>
              <h3 className="text-white font-semibold mb-1">Share</h3>
              <p className="text-gray-400 text-sm">Spread the word about our mission</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">👥</div>
              <h3 className="text-white font-semibold mb-1">Volunteer</h3>
              <p className="text-gray-400 text-sm">Mentor or teach tech skills</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">🤝</div>
              <h3 className="text-white font-semibold mb-1">Partner</h3>
              <p className="text-gray-400 text-sm">Corporate partnerships</p>
            </div>
          </div>
        </div>

        {/* Return Options */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/donate">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2">
              <Heart className="w-5 h-5" />
              Try Donation Again
            </button>
          </Link>
          <Link href="/">
            <button className="border border-gray-600 text-gray-400 hover:border-green-500 hover:text-green-400 font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              Return to Homepage
            </button>
          </Link>
        </div>

        {/* Contact */}
        <div className="mt-8">
          <p className="text-gray-400 text-sm mb-2">
            Questions about donating? We're here to help.
          </p>
          <a href="mailto:support@techmissionrio.org" className="text-green-400 hover:text-green-300 underline">
            support@techmissionrio.org
          </a>
        </div>
      </div>
    </div>
  )
}
