export default function ModelAnalytics() {
  const images = [
    { src: 'http://127.0.0.1:8000/images/feature_importance.png', title: 'Feature Importance', desc: 'Identifies which features the model relies on the most for its predictions.' },
    { src: 'http://127.0.0.1:8000/images/model_evaluation.png', title: 'Model Evaluation', desc: 'Shows the ROC curve, confusion matrix, and performance metrics across different ML algorithms.' },
    { src: 'http://127.0.0.1:8000/images/sentiment_accuracy.png', title: 'Sentiment Analysis Accuracy', desc: 'Breaks down algorithm performance and actual win rates stratified by Fear & Greed sentiment.' },
    { src: 'http://127.0.0.1:8000/images/shap_summary.png', title: 'SHAP Value Explanations', desc: 'Displays how individual predictions are skewed by variables, providing full AI explainability.' }
  ]

  return (
    <div className="analytics-container space-y-6">
      <div className="glass-card mb-6 animate-fade-in delay-1">
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent-purple)' }}>Explainable AI Analysis</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          The machine learning system incorporates explainable AI properties through SHAP summaries and feature importance weights. 
          The data clearly indicates that variables like <strong>Fear & Greed Index</strong> and <strong>Contrarian Status</strong> are key determinants of trade success.
        </p>
      </div>
      
      <div className="grid-2 animate-fade-in delay-2">
        {images.map((img, idx) => (
          <div key={idx} className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{img.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>{img.desc}</p>
            <div style={{ background: '#FFF', borderRadius: '8px', padding: '0.5rem' }}>
              <img src={img.src} alt={img.title} className="analytics-img" loading="lazy" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
