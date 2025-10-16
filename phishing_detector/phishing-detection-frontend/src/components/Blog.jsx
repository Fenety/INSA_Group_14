import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-blue-600 mb-6">Blog</h1>
          <p className="text-lg text-gray-700 mb-8">
            Stay updated with the latest phishing trends, security tips, and insights from PhishGuard as of October 15, 2025.
          </p>

          {/* Blog Posts Section */}
          <section className="space-y-12">
            {/* Post 1: Top Phishing Scams of 2025 */}
            <article className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-blue-500 mb-2">Top Phishing Scams of 2025</h2>
              <p className="text-sm text-gray-500 mb-4">Posted on October 15, 2025 | 08:08 PM EAT</p>
              <p className="text-gray-700 mb-4">
                As we reach mid-October 2025, phishing attacks have evolved with sophisticated techniques. This year, cybercriminals have leveraged AI to craft highly convincing emails and websites. Key scams include:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                <li><strong>AI-Generated Spoof Emails:</strong> Emails mimicking CEOs or banks, using natural language to deceive employees into transferring funds.</li>
                <li><strong>Fake Delivery Notifications:</strong> Exploiting holiday shipping delays with malicious links posing as DHL or FedEx updates.</li>
                <li><strong>Credential Harvesting via QR Codes:</strong> Scanners leading to fake login pages, a rising trend in public Wi-Fi hotspots.</li>
              </ul>
              <p className="text-gray-700 mb-4">
                PhishGuard’s AI detects these threats by analyzing patterns and anomalies. Stay vigilant by verifying sender details and avoiding unsolicited links.
              </p>
              <div className="text-center mb-4">
                <img
                  src="https://www.memcyco.com/wp-content/uploads/2024/09/image7.jpg"
                  alt="Example of a phishing email"
                  className="max-w-full h-auto border-2 border-gray-200 rounded-lg inline-block"
                />
                <p className="text-sm italic text-gray-600 mt-2">A sample phishing email from 2025.</p>
              </div>
            </article>

            {/* Post 2: AI in Cybersecurity */}
            <article className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-blue-500 mb-2">AI in Cybersecurity</h2>
              <p className="text-sm text-gray-500 mb-4">Posted on October 10, 2025 | 02:30 PM EAT</p>
              <p className="text-gray-700 mb-4">
                Artificial Intelligence is revolutionizing cybersecurity, and PhishGuard is at the forefront. Our platform uses machine learning to:
              </p>
              <ol className="list-decimal list-inside text-gray-600 mb-4">
                <li>Analyze millions of emails daily to identify phishing patterns.</li>
                <li>Predict emerging threats based on global data trends.</li>
                <li>Provide real-time alerts to users via the Scan URL and Email Scan features.</li>
              </ol>
              <p className="text-gray-700 mb-4">
                In 2025, AI-driven attacks have prompted a counter-response with tools like PhishGuard’s awareness app, educating users on recognition and prevention. The integration of AI ensures a proactive defense, adapting to new tactics as they emerge.
              </p>
              <div className="text-center mb-4">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUQ4S0p4dOM5n_39HekBd4rtmGW3eyXj_fCA&s"
                  alt="AI in cybersecurity"
                  className="max-w-full h-auto border-2 border-gray-200 rounded-lg inline-block"
                />
                <p className="text-sm italic text-gray-600 mt-2">AI enhancing cybersecurity defenses.</p>
              </div>
            </article>

            {/* Post 3: Protecting Your Business from Phishing */}
            <article className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-blue-500 mb-2">Protecting Your Business from Phishing</h2>
              <p className="text-sm text-gray-500 mb-4">Posted on October 5, 2025 | 09:15 AM EAT</p>
              <p className="text-gray-700 mb-4">
                Businesses face significant risks from phishing, with losses exceeding $52 million in 2022 (FBI IC3 Report). In 2025, small and medium enterprises are prime targets due to limited security resources.
              </p>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Strategies</h3>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                <li>Implement PhishGuard’s enterprise-grade scanning tools.</li>
                <li>Train employees using the Phishing Awareness app.</li>
                <li>Enforce multi-factor authentication (MFA) across all systems.</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Regular audits and PhishGuard’s real-time detection can reduce risks by up to 90%, according to recent studies. Start protecting your business today!
              </p>
            </article>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Blog