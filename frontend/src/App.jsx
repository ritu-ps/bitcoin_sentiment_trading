import { useState } from 'react'
import { Activity, BrainCircuit, BarChart3, TrendingUp } from 'lucide-react'
import Dashboard from './components/Dashboard'
import AIPredictor from './components/AIPredictor'
import ModelAnalytics from './components/ModelAnalytics'
import './index.css'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-container">
          <BrainCircuit size={32} className="logo-icon" />
          <span className="logo-text">Sentiment AI</span>
        </div>
        
        <nav className="nav-menu">
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <Activity size={20} />
            Dashboard
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'predictor' ? 'active' : ''}`}
            onClick={() => setActiveTab('predictor')}
          >
            <TrendingUp size={20} />
            AI Predictor
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <BarChart3 size={20} />
            Model Insights
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <h1 className="page-title">
            {activeTab === 'dashboard' && 'Market Dashboard'}
            {activeTab === 'predictor' && 'Trade Predictor'}
            {activeTab === 'analytics' && 'Model Analytics'}
          </h1>
        </header>

        <div className="content-area animate-fade-in">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'predictor' && <AIPredictor />}
          {activeTab === 'analytics' && <ModelAnalytics />}
        </div>
      </main>
    </div>
  )
}

export default App
