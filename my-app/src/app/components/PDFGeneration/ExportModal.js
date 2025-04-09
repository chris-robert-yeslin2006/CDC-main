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
  
  const handlePrint = () => {
    window.print()
  }
  
  const handleDownload = async () => {
    // Show loading state
    const loadingElement = document.createElement('div')
    loadingElement.className = 'pdf-loading'
    loadingElement.innerText = 'Generating PDF...'
    document.body.appendChild(loadingElement)
    
    try {
      // First, add additional CSS classes to help with PDF generation
      const reportContainer = contentRef.current
      reportContainer.classList.add('pdf-generating')
      
      // Create sections in the report to match the sample PDF
      const reportHeader = reportContainer.querySelector('.report-header')
      const overallScoreSection = reportContainer.querySelector('.overall-score-section')
      const scoreBarsSection = reportContainer.querySelector('.score-bars-section')
      const skillDetailsSection = reportContainer.querySelector('.skill-details-section')
      const footer = reportContainer.querySelector('.footer')
      
      // Add section classes if they don't exist
      if (reportHeader) reportHeader.classList.add('report-section', 'page1')
      if (overallScoreSection) overallScoreSection.classList.add('report-section', 'page1')
      if (scoreBarsSection) scoreBarsSection.classList.add('report-section', 'page1')
      if (skillDetailsSection) skillDetailsSection.classList.add('report-section', 'page2')
      if (footer) footer.classList.add('report-section', 'page2')
      
      // Create a new jsPDF instance with compression
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      })
      
      // PDF dimensions
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      
      // Generate page 1
      const page1Elements = reportContainer.querySelectorAll('.page1')
      const page1Container = document.createElement('div')
      page1Container.className = 'pdf-page page1-container'
      page1Elements.forEach(el => {
        page1Container.appendChild(el.cloneNode(true))
      })
      
      // Temporarily append the container to the DOM for rendering
      document.body.appendChild(page1Container)
      
      // Capture page 1
      const page1Canvas = await html2canvas(page1Container, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff'
      })
      
      // Calculate ratio to fit the page
      const page1ImgWidth = page1Canvas.width
      const page1ImgHeight = page1Canvas.height
      const page1Ratio = Math.min(pdfWidth / page1ImgWidth, pdfHeight / page1ImgHeight)
      
      // Add page 1 to PDF
      const page1ImgData = page1Canvas.toDataURL('image/png')
      pdf.addImage({
        imageData: page1ImgData,
        x: 0,
        y: 0,
        width: page1ImgWidth * page1Ratio,
        height: page1ImgHeight * page1Ratio,
        compression: 'FAST'
      })
      
      // Clean up page 1 elements
      document.body.removeChild(page1Container)
      
      // Generate page 2
      pdf.addPage()
      
      const page2Elements = reportContainer.querySelectorAll('.page2')
      const page2Container = document.createElement('div')
      page2Container.className = 'pdf-page page2-container'
      page2Elements.forEach(el => {
        page2Container.appendChild(el.cloneNode(true))
      })
      
      // Add "Understanding the Skills" section from the reference PDF
      const skillExplanationsDiv = document.createElement('div')
      skillExplanationsDiv.className = 'skill-explanations'
      skillExplanationsDiv.innerHTML = `
        <h3>Understanding the Skills</h3>
        <div class="skill-explanation">
          <h4>Sentence Mastery</h4>
          <p>Sentence Mastery reflects the ability to understand, recall and produce English phrases and clauses in complete sentences. Performance depends on accurate syntactic processing and appropriate usage of words, phrases and clauses in meaningful sentence structures.</p>
        </div>
        <div class="skill-explanation">
          <h4>Vocabulary</h4>
          <p>Vocabulary reflects the ability to understand common everyday words spoken in sentence context and to produce such words as needed. Performance depends on familiarity with the form and meaning of everyday words and their use in connected speech.</p>
        </div>
        <div class="skill-explanation">
          <h4>Fluency</h4>
          <p>Fluency reflects the rhythm, phrasing and timing evident in constructing, reading and repeating sentences.</p>
        </div>
        <div class="skill-explanation">
          <h4>Pronunciation</h4>
          <p>Pronunciation reflects the ability to produce consonants, vowels and stress in a native-like manner in sentence context. Performance depends on knowledge of the phonological structure of everyday words.</p>
        </div>
      `
      
      page2Container.appendChild(skillExplanationsDiv)
      
      // Temporarily append the container to the DOM for rendering
      document.body.appendChild(page2Container)
      
      // Capture page 2
      const page2Canvas = await html2canvas(page2Container, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff'
      })
      
      // Calculate ratio to fit the page
      const page2ImgWidth = page2Canvas.width
      const page2ImgHeight = page2Canvas.height
      const page2Ratio = Math.min(pdfWidth / page2ImgWidth, pdfHeight / page2ImgHeight)
      
      // Add page 2 to PDF
      const page2ImgData = page2Canvas.toDataURL('image/png')
      pdf.addImage({
        imageData: page2ImgData,
        x: 0,
        y: 0,
        width: page2ImgWidth * page2Ratio,
        height: page2ImgHeight * page2Ratio,
        compression: 'FAST'
      })
      
      // Clean up page 2 elements
      document.body.removeChild(page2Container)
      
      // Reset the DOM
      reportContainer.classList.remove('pdf-generating')
      
      // Add metadata to help with PDF optimization
      pdf.setProperties({
        title: `Versant Test Report - ${testData.candidateName || 'Candidate'}`,
        subject: 'English Test Score Report',
        creator: 'Versant Testing System',
        author: 'Versant',
        keywords: 'Versant, English Test, Score Report'
      })
      
      // Save the PDF with a filename
      const fileName = `VersantTest_${testData.candidateName || 'Report'}_${new Date().toISOString().split('T')[0]}.pdf`
      pdf.save(fileName)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    } finally {
      // Clean up
      const reportContainer = contentRef.current
      if (reportContainer) {
        reportContainer.classList.remove('pdf-generating')
      }
      
      // Remove loading element
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
          <h3 className="modal-title">Japanese</h3>
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