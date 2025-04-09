export default function ScoreBar({ name, score }) {
  const percentage = (score - 10) / 80 * 100 // Scale from 10-90

  return (
    <div className="score-bar-container">

      <div className="score-bar-header">
        <span className="score-bar-label">{name}</span>
        <span className="score-bar-value">{score}</span>
      </div>
      <div className="score-bar-background">
        <div className="score-bar-fill" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  )
}