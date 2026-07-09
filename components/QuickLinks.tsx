import Link from "next/link"

export function QuickLinks() {
  return (
    <div className="flex flex-col items-center text-center p-8 bg-white/60 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-100/50">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">Quick Links</h2>
      <ul className="space-y-4 w-full max-w-sm">
        <li>
          <Link href="/about" className="block w-full py-4 px-6 bg-gray-50/50 rounded-2xl font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 hover:scale-[1.02] transform transition-all duration-200">
            About Us
          </Link>
        </li>

        <li>
          <Link href="/join" className="block w-full py-4 px-6 bg-gray-50/50 rounded-2xl font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 hover:scale-[1.02] transform transition-all duration-200">
            Get Involved
          </Link>
        </li>
        <li>
          <Link href="/fellows" className="block w-full py-4 px-6 bg-gray-50/50 rounded-2xl font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 hover:scale-[1.02] transform transition-all duration-200">
            Meet Our Fellows
          </Link>
        </li>
        <li>
          <Link href="/login" className="block w-full py-4 px-6 bg-gray-50/50 rounded-2xl font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 hover:scale-[1.02] transform transition-all duration-200">
            Returning Donors Portal
          </Link>
        </li>
        <li>
          <Link href="/roadmap" className="block w-full py-4 px-6 bg-gray-50/50 rounded-2xl font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 hover:scale-[1.02] transform transition-all duration-200">
            6-Month Master Plan
          </Link>
        </li>
        <li>
          <Link href="/impact" className="block w-full py-4 px-6 bg-gray-50/50 rounded-2xl font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 hover:scale-[1.02] transform transition-all duration-200">
            Live Impact Dashboard
          </Link>
        </li>
        <li>
          <Link href="/partner" className="block w-full py-4 px-6 bg-gray-50/50 rounded-2xl font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 hover:scale-[1.02] transform transition-all duration-200">
            School Partner Portal
          </Link>
        </li>
        <li>
          <Link href="/contact" className="block w-full py-4 px-6 bg-gray-50/50 rounded-2xl font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 hover:scale-[1.02] transform transition-all duration-200">
            Contact
          </Link>
        </li>
      </ul>
    </div>
  )
}
