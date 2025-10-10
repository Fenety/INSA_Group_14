import React, { useState } from 'react';
import { scanUrl } from '../services/api';
import Results from './Results'; // reuse updated Results component

const Scanner = ({ onScanComplete, onScanStart, onScanEnd }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const validateUrl = (inputUrl) => {
    try {
      const urlObj = new URL(inputUrl);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!validateUrl(url)) {
      setError('Please enter a valid URL (include http:// or https://)');
      return;
    }

    setError('');
    setLoading(true);
    onScanStart?.();

    try {
      const result = await scanUrl(url.trim()); // backend expects { url: ... }
      setScanResult(result);
      onScanComplete?.(result);
    } catch (err) {
      console.error('Scan failed:', err);
      setError('Failed to scan URL. Please try again.');
      setScanResult(null);
      onScanComplete?.(null);
    } finally {
      setLoading(false);
      onScanEnd?.();
    }
  };

  

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Scanner Card */}
      <div className="card p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-violet-600 rounded-3xl flex items-center justify-center text-3xl text-white mx-auto mb-6 shadow-2xl animate-float">
            🔍
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            AI Security <span className="text-gradient">Scanner</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Enter any URL to instantly analyze for phishing attempts, malware, and security threats with our advanced AI detection system.
          </p>
        </div>

        {/* Scanner Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <label htmlFor="url-input" className="block text-lg font-semibold text-slate-800">
              Website URL
            </label>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  id="url-input"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-6 py-4 text-lg border-2 border-slate-300 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  disabled={loading}
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 opacity-0 hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg min-w-[160px] font-semibold"
                disabled={loading}
              >
                <span className="flex items-center space-x-2">
                  <span>{loading ? 'Scanning...' : 'Scan Now'}</span>
                  <span className="text-lg">→</span>
                </span>
              </button>
            </div>

            {error && (
              <div className="flex items-center space-x-3 p-4 bg-red-50 border-2 border-red-200 rounded-2xl animate-pulse">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  !
                </div>
                <span className="text-red-700 font-medium">{error}</span>
              </div>
            )}
          </div>
        </form>

        {/* Features Grid */}
        <div className="mt-12 pt-12 border-t border-slate-200">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Enter URL', desc: 'Paste any website link', icon: '🔗' },
              { step: '02', title: 'AI Analysis', desc: 'Deep security scan', icon: '🤖' },
              { step: '03', title: 'Get Results', desc: 'Instant threat report', icon: '📊' }
            ].map((item, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200 hover:border-blue-300 transition-all duration-300 group">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {item.icon}
                </div>
                <div className="text-sm font-bold text-blue-600 mb-2">STEP {item.step}</div>
                <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

     
 
    </div>
  );
};

export default Scanner;
