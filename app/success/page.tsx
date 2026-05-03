import { Suspense } from 'react'
import SuccessClient from './SuccessClient'

export const metadata = {
  title: 'Thank You - TechMission Rio',
  description: 'Your donation is empowering Rio\'s youth through technology education.',
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    }>
      <SuccessClient />
    </Suspense>
  )
}
