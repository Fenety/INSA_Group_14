import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center text-white font-bold">
                🛡️
              </div>
              <span className="text-xl font-bold text-white">PhishGuard</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Advanced AI-powered phishing detection system protecting users worldwide from digital threats.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/scan" className="hover:text-white transition-colors">URL Scanner</a></li>
              <li><a href="/history" className="hover:text-white transition-colors">Scan History</a></li>
              <li><a href="/phishing-awareness" className="hover:text-white transition-colors">Security Tips</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/documentation" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="/support" className="hover:text-white transition-colors">Support</a></li>
              <li><a href="/status" className="hover:text-white transition-colors">Status</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <span>📧</span>
                <span>security@phishguard.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>🌐</span>
                <span>phishguard.ai</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p>&copy; 2024 PhishGuard AI Security. All rights reserved. Protecting the digital world.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer