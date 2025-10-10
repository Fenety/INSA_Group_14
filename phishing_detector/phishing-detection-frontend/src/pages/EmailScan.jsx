import React, { useState } from 'react'
import EmailScanner from '../components/EmailScanner'
import Results from '../components/Results'

const EmailScan = () => {
  const [scanResult, setScanResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleScanComplete = (result) => {
    setScanResult(result)
  }

  const handleScanStart = () => {
    setIsLoading(true)
  }

  const handleScanEnd = () => {
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen py-8">
      <EmailScanner 
        onScanComplete={handleScanComplete}
        onScanStart={handleScanStart}
        onScanEnd={handleScanEnd}
      />

      {isLoading && (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="card p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-2xl text-white mx-auto mb-6 animate-pulse">
              📧
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">AI Email Analysis in Progress</h3>
            <p className="text-slate-600 text-lg mb-6">Analyzing email content for phishing indicators...</p>
            <div className="w-48 h-2 bg-slate-200 rounded-full mx-auto overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full animate-pulse w-full"></div>
            </div>
          </div>
        </div>
      )}

      {scanResult && !isLoading && (
        <Results result={scanResult} />
      )}
    </div>
  )
}

export default EmailScan