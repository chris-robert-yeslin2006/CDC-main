export default function BarGraph({ name, score }) {
    const percentage = ((score - 10) / 80) * 100 // Scale from 10-90
    const barHeight = `${percentage}%`
  
    // Simple color based on score range
    const getBarColor = (score) => {
      if (score < 30) return "#e74c3c"
      if (score < 50) return "#f39c12"
      if (score < 70) return "#2ecc71"
      return "#3498db"
    }
  
    return (
      <div className="bar-graph-container">
        <div className="bar-graph-visual">
          <div
            className="bar-graph-fill"
            style={{
              height: barHeight,
              backgroundColor: getBarColor(score),
            }}
          ></div>
        </div>
        <div className="bar-graph-label">{name}</div>
        <div className="bar-graph-value">{score}</div>
      </div>
    )
  }
  