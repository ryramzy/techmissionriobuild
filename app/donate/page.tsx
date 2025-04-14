import React from "react";

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-white py-12 px-6 sm:px-12 lg:px-24 text-center">
      <h1 className="text-4xl font-bold text-blue-800 mb-4">Support TechMissionRio</h1>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
        Your support helps us equip Brazilian youth with the tools, training, and guidance
to thrive in the digital world. Every contribution fuels access to education, job readiness, and hope.
      </p>

      {/* PayPal Donate Button */}
      <div className="flex justify-center mb-8">
        <form
          action="https://www.paypal.com/donate"
          method="post"
          target="_blank"
        >
          <input type="hidden" name="hosted_button_id" value="YOUR_PAYPAL_BUTTON_ID" />
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-xl shadow-md transition"
          >
            Donate via PayPal
          </button>
        </form>
      </div>

      {/* Placeholder Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
        <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl shadow">
          Donate via Cash App (Coming Soon)
        </button>
        <button className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded-xl shadow">
          Support via Crowdfunding (Coming Soon)
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-8">
        All payments are securely processed. User login and full donation tracking coming soon.
      </p>
    </div>
  );
}