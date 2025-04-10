export default function SkillDetails({ name, data }) {
  // Determine the background color based on skill name
  const getGseScoreStyle = () => {
    switch(name) {
      case 'Sentence Mastery':
        return { backgroundColor: '#62A9D9' };
      case 'Vocabulary':
        return { backgroundColor: '#419CB2' };
      case 'Fluency':
        return { backgroundColor: '#8A4B9D' };
      case 'Pronunciation':
        return { backgroundColor: '#AD3B59' };
      default:
        return { backgroundColor: '#62A9D9' };
    }
  };

  // Get the appropriate skill understanding text based on the skill name
  const getSkillUnderstanding = () => {
    switch(name) {
      case 'Sentence Mastery':
        return "Sentence Mastery reflects the ability to understand, recall and produce English phrases and clauses in complete sentences. Performance depends on accurate syntactic processing and appropriate usage of words, phrases and clauses in meaningful sentence structures.";
      case 'Vocabulary':
        return "Vocabulary reflects the ability to understand common everyday words spoken in sentence context and to produce such words as needed. Performance depends on familiarity with the form and meaning of everyday words and their use in connected speech.";
      case 'Fluency':
        return "Fluency reflects the rhythm, phrasing and timing evident in constructing, reading and repeating sentences.";
      case 'Pronunciation':
        return "Pronunciation reflects the ability to produce consonants, vowels and stress in a native-like manner in sentence context. Performance depends on knowledge of the phonological structure of everyday words.";
      default:
        return "";
    }
  };

  return (
    <div className="skill-card">
      <div className="skill-card-header">
        <div className="skill-name">{name}</div>
        <div className="skill-scores">
          <div className="gse-score" style={getGseScoreStyle()}>GSE: {data.score}/90</div>
          <div className="versant-score">Versant: {data.versantScore}/80</div>
          <div className="cefr-level">CEFR: {data.cefr}</div>
        </div>
      </div>
      
      <div className="skill-content-container">
        <div className="skill-details">
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
        
        <div className="skill-understanding">
          <h4 className="understanding-title">Understanding {name}</h4>
          <p className="understanding-text">{getSkillUnderstanding()}</p>
        </div>
      </div>
    </div>
  )
}