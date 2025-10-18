import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Documentation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-blue-600 mb-6">Documentation</h1>
          <p className="text-lg text-gray-700 mb-8">
            Welcome to the PhishGuard Documentation. This guide provides detailed instructions for setting up, using, and customizing the PhishGuard platform, along with API integration and troubleshooting tips.
          </p>

          {/* Installation & Setup */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">Installation & Setup</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-medium text-gray-800 mb-2">Requirements</h3>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                <li>Node.js (v16.x or higher)</li>
                <li>npm (v8.x or higher)</li>
                <li>Git (for cloning the repository)</li>
                <li>Modern web browser (Chrome, Firefox, Edge)</li>
                <li>MongoDB for the backend</li>
              </ul>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Steps</h3>
              <ol className="list-decimal list-inside text-gray-600">
                <li>Clone the repository: <code>git clone https://github.com/Fenety/INSA_Group_14.git</code></li>
                <li>Navigate to the project directory: <code>cd INSA_Group_14</code></li>
                <li>Install dependencies: <code>npm install</code></li>
                <li>Start the development server: <code>npm start</code></li>
                <li>Open your browser and visit: <code>http://localhost:3000</code></li>
              </ol>
              <p className="text-gray-600 mt-4">Note: Ensure port 3000 is free. Use <code>npm run build</code> for production builds.</p>
            </div>
          </section>

          {/* User Guide */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">User Guide</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-medium text-gray-800 mb-2">Navigation</h3>
              <p className="text-gray-600 mb-4">
                Use the header to navigate: Home (/) , Scan URL (/scan), Scan Email (/email-scan), History (/history), and Learn (/phishing-awareness).
              </p>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Phishing Awareness App</h3>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                <li><strong>Access:</strong> Via the "Learn" button or /phishing-awareness route.</li>
                <li><strong>Features:</strong> Includes tasks (e.g., Identify Suspicious Emails) with quizzes, progress tracking, and task unlocking.</li>
                <li><strong>Usage:</strong> Answer quizzes to unlock tasks, view feedback, and reset progress with the "Reset Progress" button.</li>
              </ul>
              <p className="text-gray-600">Tip: Tasks unlock sequentially; complete quizzes to proceed.</p>
            </div>
          </section>

          {/* Developer Guide */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">Developer Guide</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-medium text-gray-800 mb-2">Component Structure</h3>
              <p className="text-gray-600 mb-4">
                Key components: <code>Header.jsx</code> (navigation), <code>Footer.jsx</code> (footer links), <code>PhishingAwareness.jsx</code> (awareness app).
              </p>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Routing</h3>
              <p className="text-gray-600 mb-4">
                Uses <code>react-router-dom</code>. Edit <code>App.jsx</code> to add new routes (e.g., /documentation).
              </p>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Customization</h3>
              <p className="text-gray-600 mb-4">
                Modify tasks and quizzes in <code>PhishingAwareness.jsx</code> by updating the <code>tasksData</code> array.
              </p>
            </div>
          </section>

          {/* Troubleshooting */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">Troubleshooting</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-medium text-gray-800 mb-2">Common Issues</h3>
              <ul className="list-disc list-inside text-gray-600">
                <li><strong>Local Storage Errors:</strong> Clear browser cache or disable ad blockers.</li>
                <li><strong>Locked Tasks Not Unlocking:</strong> Ensure all quizzes are answered correctly.</li>
                <li><strong>Server Not Starting:</strong> Check port 3000 availability or use <code>npm run build</code> for production.</li>
              </ul>
              <p className="text-gray-600 mt-4">
                For further assistance, contact <a href="mailto:security@phishguard.com" className="text-blue-500 underline">security@phishguard.com</a>.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Documentation