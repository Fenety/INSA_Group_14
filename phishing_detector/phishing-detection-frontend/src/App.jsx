// Updated App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Scan from './pages/Scan'
import EmailScan from './pages/EmailScan'
import HistoryPage from './pages/History'
import PhishingAwareness from './pages/phishing-aware' // Add this import

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/email-scan" element={<EmailScan />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/phishing-awareness" element={<PhishingAwareness />} /> {/* New route */}
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App