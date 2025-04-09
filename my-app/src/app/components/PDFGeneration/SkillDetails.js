export default function SkillDetails({ name, data }) {
  return (
    <div className="skill-card">
      <div className="skill-card-header">
        <div className="skill-name">{name}</div>
        <div className="skill-scores">
          <div className="gse-score">GSE: {data.score}/90</div>
          <div className="versant-score">Versant: {data.versantScore}/80</div>
          <div className="cefr-level">CEFR: {data.cefr}</div>
        </div>
      </div>
      <p className="skill-description">{data.description}</p>
      <div className="skill-tips">
        <div className="skill-tips-title">Tips to improve:</div>
        <ul className="skill-tips-list">
          {data.tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}