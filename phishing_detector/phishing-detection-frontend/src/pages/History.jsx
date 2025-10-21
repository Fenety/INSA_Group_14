import React, { useState, useEffect } from 'react'
import { getScanHistory } from '../services/api'

const HistoryPage = () => {
  const [scanHistory, setScanHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedScan, setSelectedScan] = useState(null) // modal state

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getScanHistory()
        setScanHistory(Array.isArray(data.items) ? data.items : [])
      } catch (err) {
        console.error('Failed to fetch history:', err)
        setError('Failed to fetch scan history')
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-8">Scan History</h1>
          <div className="card p-12 inline-block">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-violet-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-6 animate-pulse">
              ⏳
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Loading History</h3>
            <p className="text-slate-600">Fetching your scan records...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">{error}</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 text-center">Scan History</h1>
        <p className="text-xl text-slate-600 text-center mb-12 max-w-2xl mx-auto">
          Review your previous security scans and monitor your digital footprint
        </p>

        {scanHistory.length === 0 ? (
          <div className="max-w-4xl mx-auto">
            <div className="card p-12 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl text-slate-400 mx-auto mb-6">
                📊
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">No Scan History</h3>
              <p className="text-slate-600 text-lg mb-6">You haven't scanned any URLs yet.</p>
              <a href="/scan" className="btn btn-primary btn-lg">
                Start Your First Scan
              </a>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto space-y-6">
            {scanHistory.map((scan, index) => {
              const isPhishing = ['suspicious', 'su'].includes(scan.verdict?.toLowerCase())
              const confidence = ((scan.mlScore ?? scan.heuristicsScore ?? 0) * 100).toFixed(1)
              const timestamp = scan.createdAt ? new Date(scan.createdAt).toLocaleString() : '—'

              return (
                <div key={index} className="card p-6 hover:transform hover:-translate-y-1 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className={`w-3 h-3 rounded-full ${isPhishing ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                        <code className="text-slate-900 font-mono break-all text-sm bg-slate-50 px-3 py-1 rounded-lg">
                          {scan.url}
                        </code>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                        <span className={`px-3 py-1 rounded-full font-bold ${
                          isPhishing
                            ? 'bg-red-100 text-red-800 border border-red-200'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}>
                          {isPhishing ? '⚠️ Suspicious' : '✅ Safe'}
                        </span>
                        <span className="flex items-center space-x-1">
                          <span>🎯</span>
                          <span>{confidence}% confidence</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <span>🕒</span>
                          <span>{timestamp}</span>
                        </span>
                      </div>
                    </div>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => setSelectedScan(scan)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

       {/* Improved Modal with Animations and Percentage Scores */}
        {selectedScan && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto animate__animated animate__fadeIn animate__faster">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full relative overflow-hidden animate__animated animate__zoomIn animate__faster">
              {/* Close button - more subtle and positioned better */}
              <button
                className="absolute top-4 right-4 btn btn-circle btn-ghost btn-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                onClick={() => setSelectedScan(null)}
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Header with verdict-based coloring */}
              <div className={`px-6 pt-6 pb-4 ${['suspicious', 'su', 'phishing', 'malicious'].includes(selectedScan.verdict?.toLowerCase()) ? 'bg-red-50' : 'bg-emerald-50'}`}>
                <h2 className="text-2xl font-bold text-slate-900 break-all pr-10">{selectedScan.url}</h2>
                <div className="flex items-center mt-2">
                  <div className={`w-4 h-4 rounded-full mr-2 ${['suspicious', 'su', 'phishing', 'malicious'].includes(selectedScan.verdict?.toLowerCase()) ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                  <span className={`text-lg font-semibold ${['suspicious', 'su', 'phishing', 'malicious'].includes(selectedScan.verdict?.toLowerCase()) ? 'text-red-700' : 'text-emerald-700'}`}>
                    {['suspicious', 'su', 'phishing', 'malicious'].includes(selectedScan.verdict?.toLowerCase()) ? '⚠️ Suspicious / Phishing' : '✅ Safe'}
                  </span>
                </div>
              </div>

              {/* Body with grid layout for details */}
              <div className="px-6 pb-6 space-y-4">
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <strong className="text-slate-600">Verdict:</strong>
                    <span className="font-medium text-slate-900">{selectedScan.verdict ?? '—'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <strong className="text-slate-600">Heuristics Score:</strong>
                    <span className="font-medium text-slate-900">{selectedScan.heuristicsScore ? (selectedScan.heuristicsScore * 100).toFixed(1) + '%' : '—'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <strong className="text-slate-600">ML Score:</strong>
                    <span className="font-medium text-slate-900">{selectedScan.mlScore ? (selectedScan.mlScore * 100).toFixed(1) + '%' : '—'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <strong className="text-slate-600">Confidence:</strong>
                    <span className="font-medium text-slate-900">
                      {selectedScan.mlScore && selectedScan.heuristicsScore 
                        ? ((selectedScan.mlScore + selectedScan.heuristicsScore) / 2 * 100).toFixed(1) + '%' 
                        : selectedScan.mlScore 
                          ? (selectedScan.mlScore * 100).toFixed(1) + '%' 
                          : selectedScan.heuristicsScore 
                            ? (selectedScan.heuristicsScore * 100).toFixed(1) + '%' 
                            : '—'}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <strong className="text-slate-600">Timestamp:</strong>
                    <span className="font-medium text-slate-900">{selectedScan.createdAt ? new Date(selectedScan.createdAt).toLocaleString() : '—'}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <strong className="text-slate-600">Is Phishing:</strong>
                    <span className={`font-bold ${['suspicious', 'su', 'phishing', 'malicious'].includes(selectedScan.verdict?.toLowerCase()) ? 'text-red-600' : 'text-emerald-600'}`}>
                      {['suspicious', 'su', 'phishing', 'malicious'].includes(selectedScan.verdict?.toLowerCase()) ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>

                {/* Optional: Add a note or tip */}
                {['suspicious', 'su', 'phishing', 'malicious'].includes(selectedScan.verdict?.toLowerCase()) && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                    <strong>Security Tip:</strong> Avoid entering personal information on suspicious sites. Always verify the URL and look for HTTPS.
                  </div>
                )}
              </div>

              {/* Footer with action button */}
              <div className="px-6 pb-6 flex justify-end">
                <a href="/scan" className="btn btn-primary btn-sm">
                  Rescan URL
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HistoryPage
