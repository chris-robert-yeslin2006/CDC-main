export default function BarGraph({ name, score }) {
  // Improved scaling for better visual representation
  const percentage = (score - 10) / 80 * 100; // Scale from 10-90
  const maxHeight = 160; // Maximum height of the bar in pixels
  const barHeight = (percentage / 100) * maxHeight;
  
  // Color gradient based on score range
  const getBarColor = (score) => {
    if (score < 30) return 'linear-gradient(to top, #e74c3c, #f39c12)';
    if (score < 50) return 'linear-gradient(to top, #f39c12, #f1c40f)';
    if (score < 70) return 'linear-gradient(to top, #2ecc71, #27ae60)';
    return 'linear-gradient(to top, #2980b9, #3498db, #5dade2)';
  };
  
  return (
    <div className="bar-graph-container">
      <div className="bar-graph-visual">
        <div 
          className="bar-graph-fill" 
          style={{ 
            height: `${barHeight}px`,
            background: getBarColor(score)
          }}
        ></div>
      </div>
      <div className="bar-graph-label">
        {name}
      </div>
      <div className="bar-graph-value">
        {score}
      </div>
    </div>
  );
}