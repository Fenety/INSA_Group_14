import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  // In the features array, replace with:
const features = [
  {
    icon: '🔍',
    title: 'URL Security Scanner',
    description: 'Advanced AI analysis of websites for phishing indicators, malware, and security threats in real-time.',
    color: 'from-blue-500 to-cyan-500',
    link: '/scan'
  },
  {
    icon: '📧',
    title: 'Email Content Analyzer',
    description: 'Detect phishing attempts in email content with AI-powered analysis of language patterns and social engineering tactics.',
    color: 'from-green-500 to-emerald-500',
    link: '/email-scan'
  },
  {
    icon: '🛡️',
    title: 'Enterprise Security',
    description: 'Military-grade encryption and privacy protection. Your data never leaves your control.',
    color: 'from-violet-500 to-purple-500'
  }
]

  const stats = [
    { number: '99.9%', label: 'Accuracy Rate', icon: '🎯' },
    { number: '2M+', label: 'URLs Scanned', icon: '🔗' },
    { number: '<1s', label: 'Scan Time', icon: '⚡' },
    { number: '24/7', label: 'Protection', icon: '🛡️' }
  ]

  return (
    <div className="home">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-bg text-white">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
        
        <div className="relative container mx-auto px-4 py-20 text-center">
          {/* Animated Badge */}
          <div className="inline-flex items-center space-x-3 glass rounded-2xl px-6 py-3 mb-8 animate-pulse">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
            <span className="font-semibold">AI Security Platform Live</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight color-black">
            Protect Your
            <span className="block bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              Digital World
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-cyan-100 max-w-4xl mx-auto leading-relaxed">
            Advanced AI-powered phishing detection that stops threats before they reach you. 
            Enterprise-grade security for everyone.
          </p>
          
          {/* CTA Buttons */}
<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
  <Link to="/scan" className="btn btn-primary btn-lg group">
    <span className="flex items-center space-x-3">
      <span className="text-xl">🔍</span>
      <span>Scan URL</span>
      <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
    </span>
  </Link>
  <Link to="/email-scan" className="btn btn-success btn-lg group">
    <span className="flex items-center space-x-3">
      <span className="text-xl">📧</span>
      <span>Analyze Email</span>
      <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
    </span>
  </Link>
</div>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="glass rounded-3xl p-6 text-center backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-black mb-2">{stat.number}</div>
                <div className="text-cyan-200 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4">
              Why <span className="text-gradient">PhishGuard</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Built with cutting-edge AI technology to provide the most accurate and fastest 
              phishing detection available.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="card p-8 h-full hover:transform hover:-translate-y-4 transition-all duration-500">
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-2xl text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <button className="text-blue-600 font-bold text-sm flex items-center space-x-2 group-hover:translate-x-2 transition-transform duration-200">
                      <span>Discover more</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-blue-900 to-violet-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Secure Your Digital Life?
          </h2>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Join millions of users who trust PhishGuard to protect them from online threats.
          </p>
          <Link to="/scan" className="btn bg-white text-slate-900 hover:bg-slate-100 btn-lg font-black text-lg">
            <span className="flex items-center space-x-2">
              <span>🚀</span>
              <span>Start Free Protection Now</span>
            </span>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home