import React from 'react';

const Results = ({ result }) => {
  if (!result) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card p-12 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center text-2xl text-red-600 mx-auto mb-6">
            ❌
          </div>
          <h3 className="text-2xl font-bold text-red-800 mb-4">Scan Failed</h3>
          <p className="text-red-600 text-lg">Unable to perform the scan. Please check your input and try again.</p>
        </div>
      </div>
    );
  }

  // Determine if it is email or URL scan
  const data = result.data || result;
  const { verdict, score, heuristicsScore, mlScore, details, email, url } = data;

  const getRiskConfig = (verdict) => {
    switch (verdict?.toLowerCase()) {
      case 'suspicious':
        return { color: 'from-orange-500 to-red-500', icon: '⚠️', level: 'Suspicious' };
      case 'phishing':
        return { color: 'from-red-500 to-pink-600', icon: '🚨', level: 'High Risk' };
      case 'safe':
        return { color: 'from-emerald-500 to-green-600', icon: '✅', level: 'Safe' };
      default:
        return { color: 'from-gray-400 to-gray-600', icon: '❔', level: 'Unknown' };
    }
  };

  const riskConfig = getRiskConfig(verdict);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Risk Header */}
      <div className={`bg-gradient-to-r ${riskConfig.color} px-8 py-12 text-white rounded-2xl relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-sm">
              {riskConfig.icon}
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{verdict ? `Scan Result: ${verdict}` : 'Scan Result'}</h1>
              <p className="text-xl opacity-90">{riskConfig.level} • {(score * 100).toFixed(1)}% Confidence</p>
            </div>
          </div>
          <div className="glass rounded-2xl px-6 py-3 text-center">
            <div className="text-2xl font-bold">{(score * 100).toFixed(1)}%</div>
            <div className="text-sm opacity-90">Confidence</div>
          </div>
        </div>
      </div>

      {/* Input Info */}
      {(email || url) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {email && (
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <label className="block text-sm font-semibold text-slate-700 mb-3">Scanned Email</label>
              <div className="bg-white rounded-xl p-4 border border-slate-300">
                <code className="text-slate-900 break-all font-mono text-sm">{email}</code>
              </div>
            </div>
          )}
          {url && (
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <label className="block text-sm font-semibold text-slate-700 mb-3">Scanned URL</label>
              <div className="bg-white rounded-xl p-4 border border-slate-300">
                <code className="text-slate-900 break-all font-mono text-sm">{url}</code>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Scores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center">
          <h4 className="font-bold text-slate-900 mb-2">Overall Score</h4>
          <div className="text-2xl font-bold">{(score * 100).toFixed(1)}%</div>
        </div>
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center">
          <h4 className="font-bold text-slate-900 mb-2">Heuristics Score</h4>
          <div className="text-2xl font-bold">{(heuristicsScore * 100).toFixed(1)}%</div>
        </div>
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center">
          <h4 className="font-bold text-slate-900 mb-2">ML Score</h4>
          <div className="text-2xl font-bold">{(mlScore * 100).toFixed(1)}%</div>
        </div>
      </div>

      {/* Detailed Analysis */}
      {details && details.length > 0 && (
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-3">
            <span className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">📊</span>
            <span>Detailed Analysis</span>
          </h3>
          <ul className="list-disc ml-5 text-slate-700 space-y-1">
            {details.map((detail, idx) => (
              <li key={idx}>{detail}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <button className="btn btn-primary btn-lg flex-1">
          <span className="flex items-center space-x-2">
            <span>🔄</span>
            <span>Scan Another</span>
          </span>
        </button>
        <button className="btn btn-secondary btn-lg flex-1">
          <span className="flex items-center space-x-2">
            <span>📥</span>
            <span>Download Report</span>
          </span>
        </button>
        {verdict?.toLowerCase() === 'phishing' && (
          <button className="btn btn-danger btn-lg flex-1">
            <span className="flex items-center space-x-2">
              <span>🚫</span>
              <span>Report Phishing</span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Results;
