import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Status = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-blue-600 mb-6">System Status</h1>
          <p className="text-lg text-gray-700 mb-8">
            Check the current status of PhishGuard services and review past incidents and maintenance schedules as of 08:36 PM EAT, October 15, 2025.
          </p>

          {/* System Health Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">System Health</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">URL Scanning Service</h3>
                  <p className="text-gray-600">Status: <span className="font-semibold text-green-700">Operational</span></p>
                  <p className="text-gray-600">Last Updated: 08:30 PM EAT, Oct 15, 2025</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Email Scanning Service</h3>
                  <p className="text-gray-600">Status: <span className="font-semibold text-green-700">Operational</span></p>
                  <p className="text-gray-600">Last Updated: 08:25 PM EAT, Oct 15, 2025</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Phishing Awareness App</h3>
                  <p className="text-gray-600">Status: <span className="font-semibold text-green-700">Operational</span></p>
                  <p className="text-gray-600">Last Updated: 08:20 PM EAT, Oct 15, 2025</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">API Service</h3>
                  <p className="text-gray-600">Status: <span className="font-semibold text-green-700">Operational</span></p>
                  <p className="text-gray-600">Last Updated: 08:15 PM EAT, Oct 15, 2025</p>
                </div>
              </div>
              <p className="text-gray-600 mt-4">
                All services are currently running smoothly. Check back for updates or subscribe to notifications via <a href="mailto:security@phishguard.com" className="text-blue-500 underline">security@phishguard.com</a>.
              </p>
            </div>
          </section>

          {/* Incident History Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">Incident History</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Outage: Email Scanning Service</h3>
                  <p className="text-gray-600">Date: September 20, 2025</p>
                  <p className="text-gray-600">Duration: 2 hours (10:00 AM - 12:00 PM EAT)</p>
                  <p className="text-gray-600">Details: Temporary downtime due to server maintenance. Resolved with no data loss.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Degraded Performance: URL Scanning</h3>
                  <p className="text-gray-600">Date: October 5, 2025</p>
                  <p className="text-gray-600">Duration: 45 minutes (3:15 PM - 4:00 PM EAT)</p>
                  <p className="text-gray-600">Details: Slow response times due to high traffic. Issue mitigated by scaling server capacity.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Security Update: All Services</h3>
                  <p className="text-gray-600">Date: October 10, 2025</p>
                  <p className="text-gray-600">Duration: 1 hour (1:00 AM - 2:00 AM EAT)</p>
                  <p className="text-gray-600">Details: Scheduled patch to address a minor vulnerability. No user impact reported.</p>
                </div>
              </div>
              <p className="text-gray-600 mt-4">
                View full incident logs or report issues at <a href="mailto:security@phishguard.com" className="text-blue-500 underline">security@phishguard.com</a>.
              </p>
            </div>
          </section>

          {/* Maintenance Schedule Section */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">Maintenance Schedule</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Upcoming Maintenance: API Service</h3>
                  <p className="text-gray-600">Date: October 20, 2025</p>
                  <p className="text-gray-600">Time: 2:00 AM - 4:00 AM EAT</p>
                  <p className="text-gray-600">Details: Routine update to enhance performance. Expected downtime: 30 minutes.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Completed Maintenance: Phishing Awareness App</h3>
                  <p className="text-gray-600">Date: October 12, 2025</p>
                  <p className="text-gray-600">Time: 1:00 AM - 2:00 AM EAT</p>
                  <p className="text-gray-600">Details: Bug fixes and UI improvements. No downtime reported.</p>
                </div>
              </div>
              <p className="text-gray-600 mt-4">
                Maintenance notifications will be sent 24 hours in advance to registered users. Check status updates here or via email.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Status