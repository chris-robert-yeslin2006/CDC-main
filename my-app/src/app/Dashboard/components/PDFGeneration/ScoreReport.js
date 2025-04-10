import ScoreBar from './ScoreBar'
import SkillDetails from './SkillDetails'
// Remove SkillUnderstanding import since we're integrating it directly

function ScoreScaleGraph({ score, min = 0, max = 90 }) {
  // Calculate percentage for positioning
  const percentage = Math.min(Math.max((score - min) / (max - min) * 100, 0), 100);
  
  return (
    <div className="score-scale-graph">
      <div className="graph-container">
        <div className="scale-bar">
          <div className="scale-track-empty"></div>
        <div className="scale-labels">
          <span className="min-label">{min}</span>
          <span className="max-label">{max}</span>
        </div>
          <div 
            className="scale-track-fill" 
            style={{ width: `${percentage}%` }}
          ></div>
          
        </div>
      </div>
      <style jsx>{`
        .score-scale-graph {
          width: 100%;
          padding: 0;
          margin: 0;
        }
        
        .graph-container {
          position: relative;
        }
        
        .scale-bar {
          position: relative;
          height: 30px;
          margin-bottom: 5px;
        }
        
        .scale-track-empty {
          position: absolute;
          width: 100%;
          height: 8px;
          background-color: transparent;
          border: 1px solid #ccc;
          border-radius: 4px;
          top: 80%;
          transform: translateY(-50%);
        }
        
        .scale-track-fill {
          position: absolute;
          height: 8px;
          background-color: #4cd137;
          border-radius: 4px;
          top: 80%;
          transform: translateY(-50%);
          transition: width 0.5s ease;
        }
        
        .scale-value {
          position: absolute;
          background-color: #333;
          color: white;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .scale-labels {
          display: flex;
          justify-content: space-between;
          margin-top: 2px;
          font-size: 12px;
          font-weight: bold;
          color: #666;
        }
      `}</style>
    </div>
  );
}
export default function ScoreReport ({ data }) {
  return (
    <div className='report-container'>
      <div className='report-header'>
        <div className='header-content'>
          <div>
            <h1 className='report-title'>Japanese Test Score</h1>
          </div>
          <div className='candidate-info'>
            <p>
              <strong>Name:</strong> {data.candidateName}
            </p>
            <div className='candidate-Details'>
              <p>
                <strong>Test Date:</strong> {data.testDate}
              </p>
              <p>
                <strong>Test ID:</strong> {data.testId}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='report-body'>
        <div className='overall-score-section'>
          <div className='overall-score-header'>
            <div className='score-display'>
              <h2 className='overall'>Overall Score</h2>
              <div className='overall-score'>{data.overallScore}</div>
              <div style={{ width: '100px', margin: '0 auto',position:'relative', top :'-20px'}}>
            <ScoreScaleGraph score={data.overallScore} />
          </div>
              <div className='cefr-badge'>CEFR: {data.cefr}</div>
            </div>
            <p className='overall-description'>{data.overallDescription}</p>
          </div>
          
          <div className='overall-score-header'>
            <div className='score-display'>
              <h2 className='overall'>Intelligibility:</h2>
              <div className='overall-score'>{data.intelligibility.score}</div>
              <div className='cefr-badge'>{data.intelligibility.level}</div>
            </div>
            <p className='overall-description'>
              {data.intelligibility.description}
            </p>
          </div>
         
        </div>
        
        <div className='score-bars-section'>
          <h2 className='score-bars-title'>Skills Overview</h2>
          <ScoreBar
            Sentence_mastery={data.skills.sentenceMastery.score}
            Pronouncation={data.skills.pronunciation.score}
            Vocabulary={data.skills.vocabulary.score}
            Fluency={data.skills.fluency.score}
          />
          <div className='score-scale'>
            <span>10</span>
            <span>100</span>
          </div>
        </div>
      </div>

      <div className='skill-details-section'>
        <h2 className='skill-details-title'>
          Current Capabilities in Detail
        </h2>
        <SkillDetails
          name='Sentence Mastery'
          data={data.skills.sentenceMastery}
        />
        <SkillDetails name='Vocabulary' data={data.skills.vocabulary} />
        <SkillDetails name='Fluency' data={data.skills.fluency} />
        <SkillDetails name='Pronunciation' data={data.skills.pronunciation} />
      </div>
    </div>
  )
}