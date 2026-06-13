'use client'

import { useEffect } from 'react'
import { useAnalytics } from '@/hooks/useAnalytics'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const analytics = useAnalytics()

  useEffect(() => {
    // Log the error to the console for development debugging
    console.error('Captured client-side error:', error)

    // Track the crash event in site analytics
    analytics.track('client_error', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    })
  }, [error, analytics])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white px-4 text-center">
      <div className="max-w-md bg-gradient-to-br from-red-950/20 to-black border border-red-500/20 rounded-2xl p-8 shadow-2xl">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h1 className="text-3xl font-bold text-white mb-2">Ops! Algo deu errado</h1>
        <p className="text-gray-300 text-sm mb-6">
          Ocorreu um erro inesperado. Nosso time técnico já foi notificado automaticamente.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="border border-gray-600 hover:border-white text-gray-300 hover:text-white font-bold py-3 px-6 rounded-lg transition-all"
          >
            Voltar ao início
          </a>
        </div>
      </div>
    </div>
  )
}