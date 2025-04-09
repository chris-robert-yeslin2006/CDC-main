'use client'

import { useRef } from 'react'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import ScoreReport from './ScoreReport'
import BarGraph from './BarGraph'
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
        compress: true
      })
      
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      
      // Capture report-container and BarGraph (first page)
      const page1Container = document.createElement('div')
      page1Container.className = 'pdf-page page1-container'
      
      const reportHeader = reportContainer.querySelector('.report-header')?.cloneNode(true)
      const reportBody = reportContainer.querySelector('.report-body')?.cloneNode(true)
      const barGraph = reportContainer.querySelector('.score-bars-section')?.cloneNode(true)
      
      if (reportHeader) page1Container.appendChild(reportHeader)
      if (reportBody) page1Container.appendChild(reportBody)
      if (barGraph) page1Container.appendChild(barGraph)
      document.body.appendChild(page1Container)
      
      const page1Canvas = await html2canvas(page1Container, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff'
      })
      document.body.removeChild(page1Container)
      
      const page1ImgData = page1Canvas.toDataURL('image/png')
      const page1Ratio = Math.min(pdfWidth / page1Canvas.width, pdfHeight / page1Canvas.height)
      pdf.addImage(page1ImgData, 'PNG', 0, 0, page1Canvas.width * page1Ratio, page1Canvas.height * page1Ratio, '', 'FAST')
      
      // Create a new page for Current Capabilities
      pdf.addPage()
      
      const page2Container = document.createElement('div')
      page2Container.className = 'pdf-page page2-container'
      const skillDetailsElement = reportContainer.querySelector('.skill-details-section')?.cloneNode(true)
      if (skillDetailsElement) {
        page2Container.appendChild(skillDetailsElement)
      }
      document.body.appendChild(page2Container)
      
      const page2Canvas = await html2canvas(page2Container, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff'
      })
      document.body.removeChild(page2Container)
      
      const page2ImgData = page2Canvas.toDataURL('image/png')
      const page2Ratio = Math.min(pdfWidth / page2Canvas.width, pdfHeight / page2Canvas.height)
      pdf.addImage(page2ImgData, 'PNG', 0, 0, page2Canvas.width * page2Ratio, page2Canvas.height * page2Ratio, '', 'FAST')
      
      pdf.setProperties({
        title: `Test Report - ${testData.candidateName || 'Candidate'}`,
        subject: 'Score Report',
        creator: 'Test System',
        author: 'Test Authority'
      })
      
      const fileName = `TestReport_${testData.candidateName || 'Report'}_${new Date().toISOString().split('T')[0]}.pdf`
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
          <h3 className="modal-title">Test Report</h3>
          <button className="close-button" onClick={onClose}>&times;</button>
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
