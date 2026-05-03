import { Heart, Lock, Mail } from "lucide-react"

export const metadata = {
  title: 'Sign In - TechMission Rio',
  description: 'Sign in to track your donations and see your impact.',
}

export default function LoginPage() {
  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full py-2 px-4 mb-6">
            <Heart className="w-3 h-3 text-green-400" />
            <span className="text-xs font-semibold text-green-400 tracking-widest uppercase">Welcome Back</span>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2">Sign In</h1>
          <p className="text-gray-400">Track your donations and see your impact</p>
        </div>

        <div className="bg-gradient-to-br from-blue-900/30 to-black border border-blue-500/20 rounded-2xl p-8">
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full bg-black/50 border border-gray-600 text-white pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:border-green-500 placeholder-gray-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full bg-black/50 border border-gray-600 text-white pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:border-green-500 placeholder-gray-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="w-4 h-4 text-green-500 bg-black/50 border-gray-600 rounded focus:ring-green-500"
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-400">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="text-green-400 hover:text-green-300">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5" />
              Sign In
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-gray-400">New to TechMission Rio?</span>
              </div>
            </div>

            <div className="mt-6">
              <a
                href="/signup"
                className="w-full flex justify-center items-center gap-2 border border-green-500 text-green-400 hover:bg-green-500 hover:text-white font-bold py-3 px-4 rounded-lg transition-all"
              >
                Create Account
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Don't have an account?{' '}
            <a href="/signup" className="text-green-400 hover:text-green-300">
              Sign up for free
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
