import { useState } from 'react'
import axios from 'axios'
import { CheckCircle2, XCircle, Loader2, AlertTriangle } from 'lucide-react'

export default function AIPredictor() {
  const [formData, setFormData] = useState({
    fg_value: 20,
    direction: 'Open Long',
    side: 'BUY',
    size_usd: 5000,
    fee: 2.5,
    exec_price: 65000,
    start_pos: 0,
    crossed: false,
    coin: 'BTC'
  })

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData({ ...formData, [e.target.name]: value })
  }

  const handlePredict = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/predict', formData)
      setResult(response.data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to connect to AI server. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid-2 animate-fade-in delay-1">
      <div className="glass-card">
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--accent-cyan)' }}>Simulate Trade</h2>
        <form onSubmit={handlePredict}>
          <div className="grid-2">
            <div className="input-group">
              <label className="input-label">Fear & Greed Index (0-100)</label>
              <input type="number" name="fg_value" className="input-field" value={formData.fg_value} onChange={handleChange} min="0" max="100" />
            </div>
            <div className="input-group">
              <label className="input-label">Direction</label>
              <select name="direction" className="input-field" value={formData.direction} onChange={handleChange}>
                <option value="Open Long">Open Long</option>
                <option value="Close Long">Close Long</option>
                <option value="Open Short">Open Short</option>
                <option value="Close Short">Close Short</option>
                <option value="Buy">Buy Spot</option>
                <option value="Sell">Sell Spot</option>
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Coin</label>
              <input type="text" name="coin" className="input-field" value={formData.coin} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label className="input-label">Pre-Trade Side</label>
              <select name="side" className="input-field" value={formData.side} onChange={handleChange}>
                <option value="BUY">BUY</option>
                <option value="SELL">SELL</option>
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Size (USD)</label>
              <input type="number" name="size_usd" className="input-field" value={formData.size_usd} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label className="input-label">Execution Price ($)</label>
              <input type="number" name="exec_price" className="input-field" value={formData.exec_price} onChange={handleChange} />
            </div>
            <div className="input-group" style={{ gridColumn: 'span 2' }}>
              <button type="submit" className="primary-btn" disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : 'Run Prediction Engine'}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="glass-card result-card">
        {result ? (
          <div className="animate-fade-in">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>Prediction Result</h3>
            <div className="win-circle" style={{ borderColor: result.prediction === 'WIN' ? 'var(--success)' : 'var(--danger)', boxShadow: `0 0 30px ${result.prediction === 'WIN' ? 'rgba(29, 158, 117, 0.4)' : 'rgba(226, 75, 74, 0.4)'}` }}>
              {(result.win_probability * 100).toFixed(1)}%
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold', color: result.prediction === 'WIN' ? 'var(--success)' : 'var(--danger)' }}>
              {result.prediction === 'WIN' ? <CheckCircle2 size={28} /> : <XCircle size={28} />}
              {result.prediction === 'WIN' ? 'LIKELY PROFITABLE' : 'LIKELY LOSS'}
            </div>
            <p style={{ marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '300px' }}>
              This prediction is based on the trained {result.prediction === 'WIN' ? 'resilient' : 'risky'} patterns found in historical Hyperliquid trades combined with current sentiment momentum.
            </p>
          </div>
        ) : error ? (
          <div className="animate-fade-in" style={{ color: 'var(--danger)' }}>
            <AlertTriangle size={48} style={{ margin: '0 auto 1rem' }} />
            <p>{error}</p>
          </div>
        ) : (
           <div style={{ color: 'var(--text-secondary)' }}>
             <p>Enter trade details and execute the predictor to view AI analysis.</p>
           </div>
        )}
      </div>
    </div>
  )
}
