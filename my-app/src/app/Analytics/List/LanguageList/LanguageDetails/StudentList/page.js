'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function StudentListPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orgId = searchParams.get('orgId')
  const language = searchParams.get('language')
  
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' })

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`http://localhost:8000/analytics/students?org_id=${orgId}&language=${language}`)
        const data = await res.json()
        setStudents(data.students)
      } catch (error) {
        console.error('Failed to fetch students:', error)
      } finally {
        setLoading(false)
      }
    }

    if (orgId && language) {
      fetchStudents()
    }
  }, [orgId, language])

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
                      onClick={() => navigateToAnalysis(student.id)}
                    >
                      View Analysis
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