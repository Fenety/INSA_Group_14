import React, { useState } from 'react';
import { scanEmail } from '../services/api';

const EmailScanner = ({ onScanComplete, onScanStart, onScanEnd }) => {
  const [emailContent, setEmailContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailContent.trim()) {
      setError('Please enter email content');
      return;
    }

    if (emailContent.trim().length < 10) {
      setError('Email content seems too short. Please provide more details.');
      return;
    }

    setError('');
    setLoading(true);
    onScanStart?.();

    try {
      const result = await scanEmail(emailContent.trim()); // correct payload
      setScanResult(result);          // store backend response
      onScanComplete?.(result);
    } catch (err) {
      console.error('Email scan failed:', err);
      setError('Failed to analyze email content. Please try again.');
      setScanResult(null);
      onScanComplete?.(null);
    } finally {
      setLoading(false);
      onScanEnd?.();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="card p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center text-3xl text-white mx-auto mb-6 shadow-2xl animate-float">
            📧
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            AI Email <span className="text-gradient">Analyzer</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Paste email content to detect phishing attempts, suspicious patterns, and social engineering attacks with our advanced AI analysis.
          </p>
        </div>

        {/* Scanner Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <label htmlFor="email-content" className="block text-lg font-semibold text-slate-800">
              Email Content
            </label>
            <div className="relative">
              <textarea
                id="email-content"
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                placeholder="Paste the full email content here including subject, body, and sender information..."
                rows="12"
                className="w-full px-6 py-4 text-lg border-2 border-slate-300 rounded-2xl focus:border-green-500 focus:ring-4 focus:ring-green-200 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm resize-none"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            {error && (
              <div className="flex items-center space-x-3 p-4 bg-red-50 border-2 border-red-200 rounded-2xl animate-pulse">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  !
                </div>
                <span className="text-red-700 font-medium">{error}</span>
              </div>
            )}

            <div className="flex justify-center items-center space-x-4">
              <button
                type="submit"
                className="btn btn-primary btn-lg min-w-[200px] font-semibold"
                disabled={loading}
              >
                <span className="flex items-center space-x-2">
                  <span>{loading ? 'Analyzing...' : 'Analyze Email'}</span>
                  <span className="text-lg">→</span>
                </span>
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-lg min-w-[100px] font-semibold"
                onClick={() => setEmailContent('')}
                disabled={loading}
              >
                Clear
              </button>
            </div>
          </div>
        </form>

        {/* Display Scan Result */}
        {/* {scanResult?.success && (
          <div className="mt-8 p-6 bg-yellow-50 border border-yellow-300 rounded-xl">
            <h4 className="font-bold text-yellow-800 mb-2">Verdict: {scanResult.data.verdict}</h4>
            <p className="mb-2">Score: {scanResult.data.score}</p>
            <ul className="list-disc ml-5 text-yellow-700">
              {scanResult.data.details.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>
          </div>
        )} */}

        {/* Features Grid */}
        <div className="mt-12 pt-12 border-t border-slate-200">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">What We Detect</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🎭', title: 'Social Engineering', desc: 'Manipulation tactics' },
              { icon: '🚩', title: 'Suspicious Links', desc: 'Hidden redirects' },
              { icon: '⚠️', title: 'Urgency Tactics', desc: 'Pressure techniques' },
              { icon: '🔍', title: 'Spoofing', desc: 'Sender impersonation' }
            ].map((item, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-slate-200 hover:border-green-300 transition-all duration-300 group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {item.icon}
                </div>
                <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-200">
          <h4 className="font-bold text-blue-900 mb-2 flex items-center space-x-2">
            <span>💡</span>
            <span>Pro Tip</span>
          </h4>
          <p className="text-blue-800 text-sm">
            Include the full email content - subject line, sender information, and body text for the most accurate analysis.
            Our AI examines language patterns, urgency cues, and technical indicators of phishing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailScanner;
