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

        {/* Modal */}
        {selectedScan && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full relative">
              <button
                className="absolute top-2 right-2 btn btn-sm btn-ghost"
                onClick={() => setSelectedScan(null)}
              >
                ✖
              </button>
              <h2 className="text-xl font-bold mb-2 break-all">{selectedScan.url}</h2>
              <p><strong>Verdict:</strong> {selectedScan.verdict}</p>
              <p><strong>Heuristics Score:</strong> {selectedScan.heuristicsScore ?? '—'}</p>
              <p><strong>ML Score:</strong> {selectedScan.mlScore ?? '—'}</p>
              <p><strong>Timestamp:</strong> {selectedScan.createdAt ? new Date(selectedScan.createdAt).toLocaleString() : '—'}</p>
              <p><strong>Is Phishing:</strong> {['phishing', 'malicious'].includes(selectedScan.verdict?.toLowerCase()) ? 'Yes' : 'No'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HistoryPage
