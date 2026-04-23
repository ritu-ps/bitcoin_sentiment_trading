import { TrendingUp, AlertTriangle, CheckCircle, BarChart2 } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="dashboard-container space-y-6">
      <div className="grid-3 animate-fade-in delay-1">
        {/* Stat Cards */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(0, 240, 255, 0.1)', color: 'var(--accent-cyan)' }}>
              <TrendingUp size={24} />
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Model Accuracy</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>82.4%</h3>
            </div>
          </div>
          <p style={{ color: 'var(--success)', fontSize: '0.875rem' }}>+5.2% vs Baseline</p>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(239, 159, 39, 0.1)', color: 'var(--warning)' }}>
              <AlertTriangle size={24} />
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Current Market Reg</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Fear</h3>
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Index Value: 34</p>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(29, 158, 117, 0.1)', color: 'var(--success)' }}>
              <CheckCircle size={24} />
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Total Trades Evaluated</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>14,592</h3>
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>From Hyperliquid dataset</p>
        </div>
      </div>

      <div className="grid-2 animate-fade-in delay-2" style={{ marginTop: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Trading Edge Analysis</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1rem' }}>
            Our machine learning model analyzes the relationship between the <strong>Bitcoin Fear & Greed Index</strong> and trader performance on Hyperliquid.
          </p>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', listStylePosition: 'inside' }}>
            <li>Contrarian trading during "Extreme Fear" yields higher win probabilities.</li>
            <li>Large sizes generally face higher slippage and lower win rates during neutral markets.</li>
            <li>Market momentum features strongly influence model predictions.</li>
          </ul>
        </div>
        <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <BarChart2 size={64} style={{ color: 'var(--accent-cyan)', marginBottom: '1rem', opacity: 0.8 }} />
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Real-time Analytics Target</h3>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
            Navigate to the Model Insights tab to view SHAP plots and AUC metrics generated from the historical dataset.
          </p>
        </div>
      </div>
    </div>
  )
}
