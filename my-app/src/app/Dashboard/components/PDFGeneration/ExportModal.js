'use client'

import { useRef } from 'react'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import ScoreReport from './ScoreReport'
import './PDFGeneration.css'

export default function ExportModal({ isOpen, onClose, testData }) {
  const modalRef = useRef(null)
  const contentRef = useRef(null)

  if (!isOpen) return null

  const handleDownload = async () => {
    const loadingElement = document.createElement('div')
    loadingElement.className = 'pdf-loading'
    loadingElement.innerText = 'Generating PDF...'
    document.body.appendChild(loadingElement)

    try {
      const reportContainer = contentRef.current
      reportContainer.classList.add('pdf-generating')

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
        margins: {
          top: 5,
          bottom: 5,
          left: 5,
          right: 5
        }
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()

      // 📸 Capture the actual on-screen report
      const canvas = await html2canvas(reportContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      })

      const imgData = canvas.toDataURL('image/png')

      const margin = 5 // Reduced margin value
      const availableWidth = pdfWidth - 2 * margin
      const availableHeight = pdfHeight - 2 * margin

      // Calculate aspect ratio to maintain proportions
      const ratio = Math.min(availableWidth / canvas.width, availableHeight / canvas.height)
      const imgWidth = canvas.width * ratio
      const imgHeight = canvas.height * ratio

      // Center the image with minimal margins
      const x = margin
      const y = margin

      // Use the full available width
      pdf.addImage(imgData, 'PNG', x, y, availableWidth, imgHeight * (availableWidth / imgWidth), '', 'FAST')

      pdf.setProperties({
        title: `Test Report - ${testData.candidateName || 'Candidate'}`,
        subject: 'Score Report',
        creator: 'Test System',
        author: 'Test Authority'
      })

      const fileName = `TestReport_${testData.candidateName || 'Report'}_${
        new Date().toISOString().split('T')[0]
      }.pdf`

      pdf.save(fileName)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    } finally {
      contentRef.current?.classList.remove('pdf-generating')
      document.body.removeChild(loadingElement)
    }
  }

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose()
    }
  }

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-container" ref={modalRef}>
        <div className="modal-header">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-content">
          <div className="score-report-container" ref={contentRef}>
            <ScoreReport data={testData} />
          </div>
        </div>

        <div className="modal-actions">
          <button className="action-button download-button" onClick={handleDownload}>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  )
}