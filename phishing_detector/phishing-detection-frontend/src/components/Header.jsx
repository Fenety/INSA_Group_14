import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/scan', label: 'Scan URL', icon: '🔍' },
    { path: '/email-scan', label: 'Scan Email', icon: '📧' },
    { path: '/history', label: 'History', icon: '📊' },
  ]

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/20">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-violet-600 rounded-2xl flex items-center justify-center text-white text-lg font-bold group-hover:scale-105 transition-transform duration-300 shadow-lg">
                🛡️
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gradient">PhishGuard</h1>
              <p className="text-xs text-slate-600 -mt-1 font-medium">AI Security</p>
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-2xl font-medium transition-all duration-300 group ${
                  isActive(item.path)
                    ? 'bg-white/80 text-blue-600 shadow-lg'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-white/50'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-semibold">{item.label}</span>
                {isActive(item.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Status Indicator */}
          <div className="flex items-center space-x-2 px-4 py-2 bg-emerald-50 rounded-2xl border border-emerald-200">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-emerald-700">System Active</span>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header