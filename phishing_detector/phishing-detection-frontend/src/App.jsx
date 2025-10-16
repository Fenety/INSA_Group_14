// Updated App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Scan from './pages/Scan'
import EmailScan from './pages/EmailScan'
import HistoryPage from './pages/History'
import PhishingAwareness from './pages/phishing-aware'
import Documentation from './components/Documentation'
import Blog from './components/Blog'
//import Support from './pages/Support'
//import Status from './pages/Status'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50">

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/email-scan" element={<EmailScan />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/phishing-awareness" element={<PhishingAwareness />} />
          <Route path="/Documentation" element={<Documentation />} />
          <Route path="/blog" element={<Blog />} />
         {/* <Route path="/support" element={<Support />} />
          <Route path="/status" element={<Status />} />
          */}
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App