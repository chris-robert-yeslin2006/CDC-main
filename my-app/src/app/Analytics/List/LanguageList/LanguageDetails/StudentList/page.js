'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ExportModal from "../../../../../components/PDFGeneration/ExportModal"

export default function StudentListPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orgId = searchParams.get('orgId')
  const language = searchParams.get('language')
  const [testData, setTestData] = useState({
    candidateName: "",
    testDate: new Date().toLocaleDateString(),
    testId: '',
    overallScore: 0,
    cefr: '',
    overallDescription: '',
    intelligibility: {
      score: 0,
      level: '',
      description: ''
    },
    skills: {
      sentenceMastery: {
        score: 0,
        versantScore: 0,
        cefr: '',
        description: '',
        tips: []
      },
      vocabulary: {
        score: 0,
        versantScore: 0,
        cefr: '',
        description: '',
        tips: []
      },
      fluency: {
        score: 0,
        versantScore: 0,
        cefr: '',
        description: '',
        tips: []
      },
      pronunciation: {
        score: 0,
        versantScore: 0,
        cefr: '',
        description: '',
        tips: []
      }
    }
  })
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' })


  // Then in your useEffect:
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`http://localhost:8000/analytics/students?org_id=${orgId}&language=${language}`)
        const data = await res.json()
        
        if (!data) {
          setStudents([])
          return
        }
        
        if (Array.isArray(data)) {
          setStudents(data)
        } else if (typeof data === 'object' && data !== null) {
          // Try to find an array property in the response
          const arrayProperty = Object.values(data).find(val => Array.isArray(val))
          setStudents(arrayProperty || [])
        } else {
          setStudents([])
        }
      } catch (error) {
        console.error('Failed to fetch students:', error)
        setStudents([])
      } finally {
        setLoading(false)
      }
    }
  
    if (orgId && language) {
      fetchStudents()
    }
  }, [orgId, language])

  // CEFR mapping function
  const getCEFRLevel = (score) => {
    if (score >= 80) return 'C1'
    if (score >= 70) return 'B2+'
    if (score >= 60) return 'B2'
    if (score >= 50) return 'B1+'
    if (score >= 40) return 'B1'
    if (score >= 30) return 'A2'
    if (score >= 20) return 'A1'
    return 'Pre-A1'
  }

  // Get description based on CEFR level
  const getDescription = (level, skillType) => {
    const descriptions = {
      sentenceMastery: {
        'C1': 'Candidate can understand, recall and produce a wide variety of English phrases and clauses in sentence context. Candidate consistently produces accurate and meaningful sentences.',
        'B2+': 'Candidate can understand, recall and produce many English phrases and clauses in sentence context. Candidate produces mostly accurate and meaningful sentences.',
        'B2': 'Candidate can understand, recall and produce a variety of English phrases and clauses in sentence context. Candidate generally produces accurate and meaningful sentences.',
        'B1+': 'Candidate can understand, recall and produce English phrases and clauses in simple sentence contexts. Candidate produces simple sentences that are usually accurate and meaningful.',
        'B1': 'Candidate can understand, recall and produce simple English phrases and clauses. Candidate produces simple sentences, some of which are accurate and meaningful.',
        'A2': 'Candidate can understand and recall some basic English phrases and clauses. Candidate attempts to produce simple sentences but may have difficulty with accuracy.',
        'A1': 'Candidate can understand and produce a limited number of very basic English phrases. Candidate struggles with forming complete sentences.',
        'Pre-A1': 'Candidate shows minimal understanding of basic English sentence structure.'
      },
      vocabulary: {
        'C1': 'Candidate understands and can produce a wide range of everyday and academic English words, even in complex contexts.',
        'B2+': 'Candidate understands and can produce most everyday and some academic English words in clear contexts.',
        'B2': 'Candidate generally understands and can produce most everyday English words as they are used in clear colloquial speech.',
        'B1+': 'Candidate understands and can produce common everyday English words when used in clear speech.',
        'B1': 'Candidate understands and can produce basic, high-frequency English words when used in simple contexts.',
        'A2': 'Candidate understands and can produce some basic English vocabulary in familiar contexts.',
        'A1': 'Candidate has a very limited range of basic English vocabulary.',
        'Pre-A1': 'Candidate shows minimal command of English vocabulary.'
      },
      fluency: {
        'C1': 'Candidate speaks fluently with native-like rhythm and phrasing. Speech is smooth with few hesitations or false starts.',
        'B2+': 'Candidate speaks with good rhythm and appropriate phrasing. Occasional hesitations do not interfere with the overall flow of speech.',
        'B2': 'Candidate speaks with good rhythm but with some inappropriate phrasing. Hesitations occasionally interfere with the flow of speech.',
        'B1+': 'Candidate speaks with adequate rhythm but with some inappropriate phrasing and pausing. Hesitations sometimes interfere with the flow of speech.',
        'B1': 'Candidate speaks with adequate rhythm but with some inappropriate phrasing and pausing. Hesitations and possible repetitions or false starts may sometimes interfere with the smooth flow of speech.',
        'A2': 'Candidate speaks with irregular rhythm and inappropriate phrasing. Speech contains noticeable hesitations and false starts.',
        'A1': 'Candidate speaks with very irregular rhythm and frequent inappropriate pauses.',
        'Pre-A1': "Candidate's speech lacks any natural rhythm and is frequently interrupted by pauses and hesitations."
      },
      pronunciation: {
        'C1': 'Candidate pronounces vowels and consonants in a clear, native-like manner. Word stress and intonation are consistently appropriate.',
        'B2+': 'Candidate produces vowels and consonants clearly with only occasional mispronunciations. Word stress is almost always appropriate.',
        'B2': 'Candidate produces most vowels and consonants in a clear manner, although an occasional mispronunciation may occur. Stress is placed correctly in most common words.',
        'B1+': 'Candidate produces many vowels and consonants clearly but some systematic errors may occur. Word stress is usually appropriate for common words.',
        'B1': 'Candidate produces some vowels and consonants clearly but systematic errors may occur. Word stress may be incorrectly placed at times.',
        'A2': "Candidate's pronunciation shows noticeable errors in vowels and consonants that sometimes impede understanding. Word stress is often incorrectly placed.",
        'A1': "Candidate's pronunciation shows frequent errors that often impede understanding.",
        'Pre-A1': "Candidate's pronunciation is difficult to understand most of the time."
      }
    }
    
    return descriptions[skillType][level] || 'No description available for this level.'
  }

  // Get overall description based on overall score
  const getOverallDescription = (score) => {
    if (score >= 80) {
      return 'Candidate handles complex language with ease and speaks fluently with a high degree of accuracy. Can contribute fully to native-paced discussions and produce complex language structures appropriately.'
    } else if (score >= 70) {
      return 'Candidate easily handles a wide variety of discourse and speaking styles, and can contribute to a native-paced discussion. Speech is generally fluent, smooth and clear; candidate controls appropriate language structure for speaking about complex material.'
    } else if (score >= 60) {
      return 'Candidate can handle most communicative tasks and discourse types. Can contribute to a native-paced discussion. Speech is mostly fluent with some minor hesitations; candidate demonstrates good control of various language structures.'
    } else if (score >= 50) {
      return 'Candidate can handle many communicative tasks and discourse types, though with some repetition and unwieldy or imprecise phrasing. Can contribute to discussions on a range of topics. Speech is generally clear with some fluency problems.'
    } else if (score >= 40) {
      return 'Candidate can handle basic communicative tasks and straightforward discussions on concrete topics. Speech contains pauses and hesitations with limited sentence complexity and vocabulary.'
    } else if (score >= 30) {
      return 'Candidate can handle simple communicative tasks on familiar topics. Speech is marked by noticeable pauses, simple structures, and limited vocabulary.'
    } else if (score >= 20) {
      return 'Candidate can communicate minimally with simple words and phrases. Speech contains frequent pauses and is often difficult to follow.'
    } else {
      return 'Candidate shows minimal ability to communicate in English. Speech may be unintelligible or consist of isolated words.'
    }
  }

  // Get intelligibility score and description
  const getIntelligibility = (overallScore) => {
    if (overallScore >= 80) {
      return {
        score: 5,
        level: 'Excellent',
        description: "Listeners can understand all of the candidate's speech with ease."
      }
    } else if (overallScore >= 60) {
      return {
        score: 4,
        level: 'Good',
        description: "Listeners may require a little effort at times to understand some of the candidate's speech."
      }
    } else if (overallScore >= 40) {
      return {
        score: 3,
        level: 'Fair',
        description: "Listeners need moderate effort to understand most of the candidate's speech."
      }
    } else if (overallScore >= 20) {
      return {
        score: 2,
        level: 'Poor',
        description: "Listeners need considerable effort to understand the candidate's speech."
      }
    } else {
      return {
        score: 1,
        level: 'Unintelligible',
        description: "The candidate's speech is generally unintelligible."
      }
    }
  }

  // Get tips based on score
  const getTips = (score, skillType) => {
    const tipsByLevel = {
      sentenceMastery: {
        low: [
          'Practice constructing simple sentences using subject-verb-object structure.',
          'Learn and practice basic verb tenses (present, past, future) in simple contexts.'
        ],
        medium: [
          'Practice describing your educational history using the correct tense (e.g., present perfect, past perfect, past continuous, etc.).',
          'Practice rephrasing passive sentences into active sentences.'
        ],
        high: [
          'Practice using complex conditional sentences in conversation.',
          'Master the use of reported speech and different reporting verbs.'
        ]
      },
      vocabulary: {
        low: [
          'Build a list of 10 new words each week and practice using them in sentences.',
          'Label objects in your home with English names and read them aloud daily.'
        ],
        medium: [
          'Verbally summarize the main points of a podcast you listened to, using vocabulary from the podcast.',
          'Practice telling a well-known story from your culture in English, looking up how to translate any unknown words.'
        ],
        high: [
          'Practice explaining complex concepts using precise terminology.',
          'Learn idiomatic expressions and incorporate them naturally into your speech.'
        ]
      },
      fluency: {
        low: [
          'Read aloud for 5 minutes daily, focusing on speaking without pausing between words.',
          'Record yourself speaking about a familiar topic for 1 minute, then try to reduce the number of pauses next time.'
        ],
        medium: [
          'Practice speaking for a full two minutes without stopping. If you get stuck on a word, try expressing your idea in a different way.',
          'Listen to short videos of native speakers of English. Try repeating what they say, imitating the pace and the location of pauses.'
        ],
        high: [
          'Join discussion groups where you can practice extended turns of talking.',
          'Practice summarizing complex information concisely and fluently.'
        ]
      },
      pronunciation: {
        low: [
          'Focus on mastering the 44 phonemes (sounds) of English by practicing minimal pairs.',
          'Record yourself reading a short paragraph and compare your pronunciation to a native speaker.'
        ],
        medium: [
          'Look up commonly mispronounced words in English and learn how to say them correctly.',
          "Listen to a video clip of a native English speaker. Pause the video after each sentence and repeat it exactly, imitating the speaker's rhythm."
        ],
        high: [
          'Focus on mastering word stress in multi-syllable words.',
          'Practice sentence intonation patterns for questions, statements, and emphasis.'
        ]
      }
    }
    
    let level
    if (score < 40) level = 'low'
    else if (score < 70) level = 'medium'
    else level = 'high'
    
    return tipsByLevel[skillType][level] || []
  }

  const navigateToAnalysis = (studentId) => {
    router.push(`/student-analysis?studentId=${studentId}&orgId=${orgId}&language=${language}`)
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const requestSort = (key) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortConfig.key === null) return 0
    
    let aValue = a[sortConfig.key]
    let bValue = b[sortConfig.key]
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }
    
    if (aValue < bValue) {
      return sortConfig.direction === 'ascending' ? -1 : 1
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'ascending' ? 1 : -1
    }
    return 0
  })
  
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null
    return sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'
  }
  
  const handleExportClick = (student) => {
    // Prepare the test data object with the student's data
    const overallScore = Math.round(student.overall_mark) || 0
    const fluencyScore = Math.round(student.fluency_mark) || 0
    const vocabScore = Math.round(student.vocab_mark) || 0
    const sentenceMasteryScore = Math.round(student.sentence_mastery) || 0
    const pronunciationScore = Math.round(student.pronunciation) || 0
    
    const cefrOverall = getCEFRLevel(overallScore)
    const cefrSentenceMastery = getCEFRLevel(sentenceMasteryScore)
    const cefrVocabulary = getCEFRLevel(vocabScore)
    const cefrFluency = getCEFRLevel(fluencyScore)
    const cefrPronunciation = getCEFRLevel(pronunciationScore)
    
    // Update the test data with the student's information
    setTestData({
      candidateName: student.name,
      testDate: new Date().toLocaleDateString(), // Or get actual test date if available
      testId: student.id || 'N/A',
      overallScore: overallScore,
      cefr: cefrOverall,
      overallDescription: getOverallDescription(overallScore),
      intelligibility: getIntelligibility(overallScore),
      skills: {
        sentenceMastery: {
          score: sentenceMasteryScore,
          versantScore: Math.round(sentenceMasteryScore * 0.95), // Example calculation
          cefr: cefrSentenceMastery,
          description: getDescription(cefrSentenceMastery, 'sentenceMastery'),
          tips: getTips(sentenceMasteryScore, 'sentenceMastery')
        },
        vocabulary: {
          score: vocabScore,
          versantScore: Math.round(vocabScore * 0.95), // Example calculation
          cefr: cefrVocabulary,
          description: getDescription(cefrVocabulary, 'vocabulary'),
          tips: getTips(vocabScore, 'vocabulary')
        },
        fluency: {
          score: fluencyScore,
          versantScore: Math.round(fluencyScore * 0.95), // Example calculation
          cefr: cefrFluency,
          description: getDescription(cefrFluency, 'fluency'),
          tips: getTips(fluencyScore, 'fluency')
        },
        pronunciation: {
          score: pronunciationScore,
          versantScore: Math.round(pronunciationScore * 0.95), // Example calculation
          cefr: cefrPronunciation,
          description: getDescription(cefrPronunciation, 'pronunciation'),
          tips: getTips(pronunciationScore, 'pronunciation')
        }
      }
    })
    
    // Open the export modal
    setIsExportModalOpen(true)
  }

  return (
    <div className="student-list-container">
    <style jsx>{`
      .student-list-container {
        padding: 24px;
        max-width: 100%;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      }
      
      .header-container {
        margin-bottom: 24px;
        display: flex;
        flex-direction: column;
      }
      
      @media (min-width: 768px) {
        .header-container {
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }
      }
      
      .language-title {
        font-size: 24px;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 16px;
      }
      
      @media (min-width: 768px) {
        .language-title {
          margin-bottom: 0;
        }
      }
      
      .search-container {
        position: relative;
        width: 100%;
      }
      
      @media (min-width: 768px) {
        .search-container {
          width: 260px;
        }
      }
      
      .search-icon {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        color: #9ca3af;
      }
      
      .search-input {
        padding: 8px 12px 8px 36px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        width: 100%;
        font-size: 14px;
      }
      
      .search-input:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
      }
      
      .loading-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 200px;
      }
      
      .spinning-loader {
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-left-color: #3b82f6;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        animation: spin 1s linear infinite;
      }
      
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      
      .empty-message {
        text-align: center;
        color: #6b7280;
        font-size: 16px;
        padding: 32px 0;
      }
      
      .table-wrapper {
        overflow-x: auto;
        border-radius: 8px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
      
      .student-table {
        width: 100%;
        border-collapse: collapse;
        min-width: 800px;
      }
      
      .student-table th {
        background-color: #f9fafb;
        padding: 12px 16px;
        text-align: left;
        font-weight: 600;
        color: #374151;
        border-bottom: 1px solid #e5e7eb;
        cursor: pointer;
        transition: background-color 0.2s;
      }
      
      .student-table th:hover {
        background-color: #f3f4f6;
      }
      
      .student-table td {
        padding: 12px 16px;
        border-bottom: 1px solid #e5e7eb;
        color: #4b5563;
      }
      
      .student-table tbody tr:hover {
        background-color: #f9fafb;
      }
      
      .student-table tbody tr:last-child td {
        border-bottom: none;
      }
      
      .performance-button {
        padding: 6px 12px;
        background-color: #3b82f6;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s;
      }
      
      .performance-button:hover {
        background-color: #2563eb;
      }
      
      .button-icon {
        margin-left: 4px;
        width: 16px;
        height: 16px;
      }
    `}</style>

      <div className="header-container">
        <h1 className="language-title">
          {language} Language Students
        </h1>
        <ExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          testData={testData}
        />
        <div className="search-container">
          <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input
            type="text"
            placeholder="Search students..."
            className="search-input"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinning-loader"></div>
        </div>
      ) : sortedStudents.length === 0 ? (
        <p className="empty-message">No students found for this organization and language.</p>
      ) : (
        <div className="table-wrapper">
          <table className="student-table">
            <thead>
              <tr>
                <th onClick={() => requestSort('name')}>
                  Name {getSortIndicator('name')}
                </th>
                <th onClick={() => requestSort('email')}>
                  Email {getSortIndicator('email')}
                </th>
                <th onClick={() => requestSort('language')}>
                  Language {getSortIndicator('language')}
                </th>
                <th onClick={() => requestSort('overall_mark')}>
                  Overall {getSortIndicator('overall_mark')}
                </th>
                <th onClick={() => requestSort('average_mark')}>
                  Average {getSortIndicator('average_mark')}
                </th>
                <th onClick={() => requestSort('recent_test_mark')}>
                  Recent Test {getSortIndicator('recent_test_mark')}
                </th>
                <th onClick={() => requestSort('fluency_mark')}>
                  Fluency {getSortIndicator('fluency_mark')}
                </th>
                <th onClick={() => requestSort('vocab_mark')}>
                  Vocab {getSortIndicator('vocab_mark')}
                </th>
                <th onClick={() => requestSort('sentence_mastery')}>
                  Sentence {getSortIndicator('sentence_mastery')}
                </th>
                <th onClick={() => requestSort('pronunciation')}>
                  Pronunciation {getSortIndicator('pronunciation')}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.language}</td>
                  <td>{student.overall_mark}</td>
                  <td>{student.average_mark}</td>
                  <td>{student.recent_test_mark}</td>
                  <td>{student.fluency_mark}</td>
                  <td>{student.vocab_mark}</td>
                  <td>{student.sentence_mastery}</td>
                  <td>{student.pronunciation}</td>
                  <td>
                    <button 
                      className="performance-button"
                      onClick={() => handleExportClick(student)}
                    >
                      Export Data
                      <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}