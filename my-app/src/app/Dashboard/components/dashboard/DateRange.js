// components/DateRange.js
import { useState, useEffect } from 'react'
import styles from '../../Statistics/StatisticsSection.module.css'

const CustomDateRange = ({ onCustomDateChange, startDate, endDate, mainDuration }) => {
  const [localStartDate, setLocalStartDate] = useState(startDate || '')
  const [localEndDate, setLocalEndDate] = useState(endDate || '')
  
  // Update local state when props change
  useEffect(() => {
    if (startDate !== undefined) {
      setLocalStartDate(startDate || '')
    }
    if (endDate !== undefined) {
      setLocalEndDate(endDate || '')
    }
  }, [startDate, endDate])
  
  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value
    setLocalStartDate(newStartDate)
    
    // If we have a mainDuration in days, automatically set the end date
    if (mainDuration && newStartDate) {
      const start = new Date(newStartDate)
      const end = new Date(start)
      end.setDate(start.getDate() + mainDuration - 1) // -1 because the first day counts
      
      // Format the date as YYYY-MM-DD for the input field
      const formattedEndDate = end.toISOString().split('T')[0]
      setLocalEndDate(formattedEndDate)
    }
  }
  
  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value
    setLocalEndDate(newEndDate)
    
    // If we have a mainDuration in days, automatically adjust the start date
    if (mainDuration && newEndDate) {
      const end = new Date(newEndDate)
      const start = new Date(end)
      start.setDate(end.getDate() - mainDuration + 1) // +1 because the last day counts
      
      // Format the date as YYYY-MM-DD for the input field
      const formattedStartDate = start.toISOString().split('T')[0]
      setLocalStartDate(formattedStartDate)
    }
  }
  
  const handleApply = () => {
    if (localStartDate && localEndDate) {
      onCustomDateChange(localStartDate, localEndDate)
    }
  }
  
  return (
    <div className={styles.dateRangeSelector}>
      <input
        type="date"
        value={localStartDate}
        onChange={handleStartDateChange}
        className={styles.dateInput}
      />
      <span className={styles.dateRangeSeparator}>to</span>
      <input
        type="date"
        value={localEndDate}
        onChange={handleEndDateChange}
        className={styles.dateInput}
      />
      <button 
        onClick={handleApply}
        className={styles.applyButton}
        disabled={!localStartDate || !localEndDate}
      >
        Apply
      </button>
    </div>
  )
}

export default CustomDateRange