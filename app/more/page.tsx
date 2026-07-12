import { QuickLinks } from "@/components/QuickLinks"

export default function MorePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center py-20 px-6">
      <h1 className="sr-only">More Resources</h1>
      <div className="w-full max-w-lg z-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        <QuickLinks />
      </div>
      
      {/* Decorative background blur elements */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
    </div>
  )
}
