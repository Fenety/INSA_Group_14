import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Support = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-blue-600 mb-6">Support</h1>
          <p className="text-lg text-gray-700 mb-8">
            Need help with PhishGuard? Explore our support options, FAQs, and troubleshooting guides as of 08:22 PM EAT, October 15, 2025.
          </p>

          {/* Contact Us Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">Contact Us</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-700 mb-4">
                Our support team is here to assist you 24/7. Reach out via the following methods:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>
                  <strong>Email:</strong> 
                  <a href="mailto:security@phishguard.com" className="text-blue-500 underline ml-1">security@phishguard.com</a>
                  <br />Response time: Within 24 hours.
                </li>
                <li>
                  <strong>Live Chat:</strong> Available on <a href="https://phishguard.ai" className="text-blue-500 underline">phishguard.ai</a>
                  <br />Hours: 9:00 AM - 6:00 PM EAT, Monday to Friday.
                </li>
                <li>
                  <strong>Phone Support:</strong> +1-800-PHISHGUARD (Toll-free)
                  <br />Hours: 8:00 AM - 8:00 PM EAT, Monday to Saturday.
                </li>
              </ul>
              <p className="text-gray-600">
                For urgent issues, please call or use live chat. Include your account ID for faster resolution.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">Frequently Asked Questions</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">How do I reset my progress in the Phishing Awareness app?</h3>
                  <p className="text-gray-600">
                    Click the "Reset Progress" button on the awareness page (/phishing-awareness) to clear your quiz answers and start over. Note that this action cannot be undone.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">Why is a task still locked after completing a quiz?</h3>
                  <p className="text-gray-600">
                    Ensure all quizzes for the current task are answered correctly. Tasks unlock sequentially; check your progress bar for completion status.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">How can I report a false positive scan result?</h3>
                  <p className="text-gray-600">
                    Submit a report via email to <a href="mailto:security@phishguard.com" className="text-blue-500 underline">security@phishguard.com</a> with the URL or email details and your account ID. Our team will review it within 48 hours.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">What should I do if the app doesn’t load?</h3>
                  <p className="text-gray-600">
                    Clear your browser cache, ensure you’re on <code>http://localhost:3000</code> (or the live site), and check your internet connection. If the issue persists, contact support.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Troubleshooting Section */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">Troubleshooting</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-medium text-gray-800 mb-2">Common Issues & Solutions</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">
                    <strong>Issue:</strong> Quiz answers not saving.
                    <br /><strong>Solution:</strong> Enable cookies and local storage in your browser settings. Refresh the page and try again.
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">
                    <strong>Issue:</strong> Scan results show errors.
                    <br /><strong>Solution:</strong> Verify the URL or email input format. Avoid special characters or invalid addresses, and retry the scan.
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">
                    <strong>Issue:</strong> Page loads slowly.
                    <br /><strong>Solution:</strong> Check your internet speed or switch to a different network. For persistent issues, contact support with your location details.
                  </p>
                </div>
              </div>
              <p className="text-gray-600 mt-4">
                If problems continue, submit a detailed report to <a href="mailto:security@phishguard.com" className="text-blue-500 underline">security@phishguard.com</a> with screenshots and steps to reproduce.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Support