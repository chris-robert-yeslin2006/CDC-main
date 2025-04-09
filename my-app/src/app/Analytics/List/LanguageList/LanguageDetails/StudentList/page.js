'use client'

import { useEffect, useState } from 'react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export default function StudentList({ searchParams }) {
  const orgId = searchParams.orgId
  const language = searchParams.language
  const [students, setStudents] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [previewUrl, setPreviewUrl] = useState(null)
  const [previewStudent, setPreviewStudent] = useState(null)

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/analytics/students?org_id=${orgId}&language=${language}`
        )
        const data = await res.json()
        setStudents(data.students)
        setFiltered(data.students)
      } catch (error) {
        console.error('Failed to fetch students:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [orgId, language])

  const generateStudentPDF = (student, shouldDownload = false) => {
    const doc = new jsPDF()

    doc.setFontSize(18)
    doc.text('Student Analysis Report', 14, 20)

    doc.setFontSize(12)
    doc.text(`Name: ${student.name}`, 14, 30)
    doc.text(`Email: ${student.email}`, 14, 37)
    doc.text(`Language: ${student.language}`, 14, 44)

    autoTable(doc, {
      startY: 55,
      head: [['Metric', 'Score']],
      body: [
        ['Overall Mark', student.overall_mark ?? 'N/A'],
        ['Average Mark', student.average_mark ?? 'N/A'],
        ['Recent Test Mark', student.recent_test_mark ?? 'N/A'],
        ['Fluency Mark', student.fluency_mark ?? 'N/A'],
        ['Vocabulary Mark', student.vocab_mark ?? 'N/A'],
        ['Sentence Mastery', student.sentence_mastery ?? 'N/A'],
        ['Pronunciation', student.pronunciation ?? 'N/A'],
      ],
    })

    if (shouldDownload) {
      doc.save(`${student.name}_Analysis.pdf`)
    } else {
      // Create blob URL for preview
      const pdfBlob = doc.output('blob')
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
      const url = URL.createObjectURL(pdfBlob)
      setPreviewUrl(url)
      setPreviewStudent(student)
    }
  }

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase()
    setSearch(query)
    const filteredData = students.filter(
      (s) =>
        s.name.toLowerCase().includes(query) ||
        s.email.toLowerCase().includes(query)
    )
    setFiltered(filteredData)
  }

  const closePreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
      setPreviewStudent(null)
    }
  }

  // Close preview on escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') closePreview()
    }
    window.addEventListener('keydown', handleEsc)
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [])

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (previewUrl) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [previewUrl])

  return (
    <div className="student-container">
      <h1>Student List - {language}</h1>
      <input
        className="search-input"
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={handleSearch}
      />
      {loading ? (
        <div className="loader">Loading students...</div>
      ) : filtered.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table className="student-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td className="action-buttons">
                  <button onClick={() => generateStudentPDF(student, false)} className="preview-btn">
                    Preview
                  </button>
                  <button onClick={() => generateStudentPDF(student, true)} className="export-btn">
                    Export
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* PDF Preview Modal */}
      {previewUrl && (
        <div className="pdf-overlay" onClick={closePreview}>
          <div className="pdf-modal" onClick={e => e.stopPropagation()}>
            <div className="pdf-modal-header">
              <h2>Student Report Preview</h2>
              <div className="student-info">
                <p>Student: <strong>{previewStudent?.name}</strong></p>
                <p>Email: {previewStudent?.email}</p>
              </div>
              <button onClick={closePreview} className="close-button" aria-label="Close preview">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="pdf-modal-body">
              <div className="pdf-container">
                <iframe 
                  src={previewUrl}
                  className="pdf-iframe"
                  title={`${previewStudent?.name} PDF Preview`}
                />
              </div>
            </div>
            <div className="pdf-modal-footer">
              <div className="preview-actions">
                <button onClick={() => generateStudentPDF(previewStudent, true)} className="download-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Download PDF
                </button>
                <button onClick={closePreview} className="cancel-btn">
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        /* Base Styles */
        .student-container {
          padding: 2rem;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          color: #333;
          max-width: 1200px;
          margin: 0 auto;
        }

        h1 {
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          color: #2c3e50;
          font-weight: 600;
        }

        /* Search Input */
        .search-input {
          width: 100%;
          padding: 12px 16px;
          margin-bottom: 1.5rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #3498db;
          box-shadow: 0 2px 8px rgba(52, 152, 219, 0.2);
        }

        /* Student Table */
        .student-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border-radius: 10px;
          overflow: hidden;
        }

        .student-table th,
        .student-table td {
          padding: 16px;
          text-align: left;
          border-bottom: 1px solid #eaeaea;
        }

        .student-table th {
          background-color: #f8f9fa;
          font-weight: 600;
          color: #2c3e50;
          text-transform: uppercase;
          font-size: 0.85rem;
          letter-spacing: 0.5px;
        }

        .student-table tbody tr:last-child td {
          border-bottom: none;
        }

        .student-table tr:hover {
          background-color: #f0f7ff;
        }

        /* Action Buttons */
        .action-buttons {
          display: flex;
          gap: 10px;
        }

        button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.9rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        button:active {
          transform: translateY(0);
        }

        .preview-btn {
          background-color: #3498db;
          color: white;
        }

        .preview-btn:hover {
          background-color: #2980b9;
        }

        .export-btn {
          background-color: #2ecc71;
          color: white;
        }

        .export-btn:hover {
          background-color: #27ae60;
        }

        /* PDF Modal Overlay */
        .pdf-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.75);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          backdrop-filter: blur(5px);
          animation: fadeIn 0.3s ease;
          padding: 20px;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* PDF Modal */
        .pdf-modal {
          background-color: white;
          border-radius: 12px;
          width: 90%;
          max-width: 1000px;
          height: 90vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          animation: scaleIn 0.3s ease;
        }

        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        /* Modal Header */
        .pdf-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 24px;
          border-bottom: 1px solid #eaeaea;
          background-color: #f8f9fa;
        }

        .pdf-modal-header h2 {
          margin: 0;
          font-size: 1.5rem;
          color: #2c3e50;
          font-weight: 600;
        }

        .student-info {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          margin: 0 20px;
        }

        .student-info p {
          margin: 3px 0;
          color: #555;
          font-size: 0.95rem;
        }

        .close-button {
          background: none;
          color: #666;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s ease;
          padding: 0;
          box-shadow: none;
        }

        .close-button:hover {
          background-color: #e0e0e0;
          transform: none;
          box-shadow: none;
        }

        /* Modal Body / PDF Container */
        .pdf-modal-body {
          flex-grow: 1;
          padding: 0;
          overflow: hidden;
          background-color: #f0f0f0;
        }

        .pdf-container {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .pdf-iframe {
          width: 100%;
          height: 100%;
          border: none;
          background-color: white;
        }

        /* Modal Footer */
        .pdf-modal-footer {
          display: flex;
          justify-content: flex-end;
          padding: 16px 24px;
          border-top: 1px solid #eaeaea;
          background-color: #f8f9fa;
        }

        .preview-actions {
          display: flex;
          gap: 12px;
        }

        .download-btn {
          background-color: #3498db;
          color: white;
          padding: 10px 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .download-btn:hover {
          background-color: #2980b9;
        }

        .cancel-btn {
          background-color: #e0e0e0;
          color: #333;
          padding: 10px 20px;
        }

        .cancel-btn:hover {
          background-color: #d0d0d0;
        }

        .icon {
          margin-right: 4px;
        }

        /* Loading State */
        .loader {
          font-size: 1.2rem;
          padding: 2rem;
          text-align: center;
          color: #666;
          background-color: #f8f9fa;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
          .student-container {
            padding: 1rem;
          }

          .pdf-modal {
            width: 95%;
            height: 95vh;
          }

          .pdf-modal-header {
            padding: 12px 16px;
            flex-direction: column;
            align-items: flex-start;
          }

          .pdf-modal-header h2 {
            font-size: 1.3rem;
            margin-bottom: 8px;
          }

          .student-info {
            margin: 8px 0;
          }

          .close-button {
            position: absolute;
            top: 10px;
            right: 10px;
          }

          .action-buttons {
            flex-direction: column;
            gap: 8px;
          }

          button {
            width: 100%;
            padding: 8px 12px;
            font-size: 0.85rem;
          }

          .student-table th,
          .student-table td {
            padding: 12px;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .student-table th:nth-child(2),
          .student-table td:nth-child(2) {
            display: none;
          }

          .preview-actions {
            flex-direction: column;
            width: 100%;
          }

          .download-btn, .cancel-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}