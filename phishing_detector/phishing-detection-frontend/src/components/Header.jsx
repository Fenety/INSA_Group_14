import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'

const Header = () => {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/scan', label: 'Scan URL', icon: '🔍' },
    { path: '/email-scan', label: 'Scan Email', icon: '📧' },
    { path: '/history', label: 'History', icon: '📊' },
    { path: '/phishing-awareness', label: 'Learn', icon: '📚' },
  ]

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/20">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 group transition-all duration-300 hover:scale-105"
          >
            <ShieldCheck className="w-10 h-10 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
            <div>
              <h1 className="text-2xl font-bold text-gradient group-hover:text-blue-700 transition-colors duration-300">
                PhishGuard
              </h1>
              <p className="text-xs text-slate-600 -mt-1 font-medium group-hover:text-slate-800 transition-colors duration-300">
                AI Security
              </p>
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
                    : 'text-slate-700 hover:text-blue-600 hover:bg-white/50 hover:shadow-md'
                }`}
              >
                <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </span>
                <span className="font-semibold group-hover:text-blue-700 transition-colors duration-300">
                  {item.label}
                </span>
                {isActive(item.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
                )}
                <span className="absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Status Indicator */}
          <div className="flex items-center space-x-2 px-4 py-2 bg-emerald-50 rounded-2xl border border-emerald-200 group hover:bg-emerald-100 transition-all duration-300">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse group-hover:scale-110 transition-transform duration-300"></div>
            <span className="text-sm font-medium text-emerald-700 group-hover:text-emerald-900 transition-colors duration-300">
              System Active
            </span>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header