import ScoreBar from './ScoreBar'
import SkillDetails from './SkillDetails'
import SkillUnderstanding from './SkillUnderstanding'
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
            <div className='cefr-badge'>CEFR: {data.cefr}</div>
          </div>
          <p className='overall-description'>{data.overallDescription}</p>
        </div>

          <div className='overall-score-header'>
            <div className='score-display'>
            <h2 className='overall'>Intelligibility:</h2>
            <div className='overall-score'>
              {data.intelligibility.score}
            </div>
            <div className='cefr-badge'>
              {data.intelligibility.level}
            </div>
          </div>
          <p className='overall-description'>
            {data.intelligibility.description}
          </p>
        </div>
      </div>
      <SkillUnderstanding/>
      </div>

      <div className='score-bars-section'>
        <h2 className='score-bars-title'>Skills Overview</h2>
        <ScoreBar
          name='Sentence Mastery'
          score={data.skills.sentenceMastery.score}
        />
        <ScoreBar name='Vocabulary' score={data.skills.vocabulary.score} />
        <ScoreBar name='Fluency' score={data.skills.fluency.score} />
        <ScoreBar
          name='Pronunciation'
          score={data.skills.pronunciation.score}
        />

        <div className='score-scale'>
          <span>10</span>
          <span>100</span>
        </div>
      </div>

      <div className='skill-details-section'>
        <h2 className='skill-details-title'>Current Capabilities in Detail</h2>
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
