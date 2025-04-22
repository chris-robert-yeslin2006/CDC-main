'use client'
import React, { useState, useEffect } from 'react'
import styles from '../StatisticsSection.module.css'
import CustomDateRange from '../../components/dashboard/DateRange'
import OrganizationsChart from '../../components/dashboard/OrganizationsChart'

export default function DateRangeFilter() {
  // Calculate duration in days for preset date ranges
  const getPresetDuration = (preset) => {
    switch(preset) {
      case 'Past 7 days': return 7;
      case 'Past 30 days': return 30;
      case 'Past 12 months': return 365;
      case 'Past 5 years': return 1825; // 5 * 365
      default: return null;
    }
  }

  // Calculate duration between two dates
  const calculateDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return null;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end days
  }

  // Date range state
  const [mainDateRange, setMainDateRange] = useState({
    type: 'preset', // 'preset' or 'custom'
    preset: 'Past 12 months',
    custom: {
      startDate: null,
      endDate: null
    },
    duration: 365 // Set initial duration based on preset
  })

  // Search terms state with date ranges - updated to have only valid parameters
  const [searchTerms, setSearchTerms] = useState([
    {
      id: 1,
      term: 'Organizations',
      color: 'blue',
      dateRange: {
        type: 'preset',
        preset: 'Past 12 months',
        custom: {
          startDate: null,
          endDate: null
        },
        duration: 365
      }
    },
    {
      id: 2,
      term: 'Onboarded',
      color: 'red',
      dateRange: {
        type: 'preset',
        preset: 'Past 12 months',
        custom: {
          startDate: null,
          endDate: null
        },
        duration: 365
      }
    }
  ])

  // New search term input
  const [isAddingTerm, setIsAddingTerm] = useState(false)
  const [newSearchTerm, setNewSearchTerm] = useState('')
  const [newTermDateRange, setNewTermDateRange] = useState({
    type: 'preset',
    preset: mainDateRange.preset,
    custom: { ...mainDateRange.custom },
    duration: mainDateRange.duration
  })

  // Organization Chart state
  const [chartType, setChartType] = useState('bar')
  
  // Sample data for organization charts
  const [orgChartData, setOrgChartData] = useState([
    { name: 'Jan', onboarded: 40, contacted: 85, standby: 20, verification: 15 },
    { name: 'Feb', onboarded: 45, contacted: 77, standby: 25, verification: 18 },
    { name: 'Mar', onboarded: 55, contacted: 90, standby: 15, verification: 22 },
    { name: 'Apr', onboarded: 65, contacted: 102, standby: 18, verification: 25 },
    { name: 'May', onboarded: 70, contacted: 110, standby: 22, verification: 30 },
    { name: 'Jun', onboarded: 80, contacted: 120, standby: 28, verification: 32 },
  ])

  // Filter states
  const [selectedRegion, setSelectedRegion] = useState('India')
  const [selectedCategory, setSelectedCategory] = useState('All categories')
  const [selectedSearchType, setSelectedSearchType] = useState('Web Search')

  // Update duration in main date range whenever it changes
  useEffect(() => {
    let duration = null;
    
    if (mainDateRange.type === 'preset') {
      duration = getPresetDuration(mainDateRange.preset);
    } else if (mainDateRange.type === 'custom') {
      duration = calculateDuration(
        mainDateRange.custom.startDate, 
        mainDateRange.custom.endDate
      );
    }
    
    if (duration !== mainDateRange.duration) {
      setMainDateRange(prev => ({
        ...prev,
        duration
      }));
    }
  }, [mainDateRange.type, mainDateRange.preset, mainDateRange.custom.startDate, mainDateRange.custom.endDate]);

  // Update search term durations when main duration changes
  useEffect(() => {
    // Only proceed if we have a valid duration
    if (!mainDateRange.duration) return;
    
    setSearchTerms(prevTerms =>
      prevTerms.map(term => {
        // If it's already the same duration, don't change anything
        if (term.dateRange.duration === mainDateRange.duration) {
          return term;
        }
        
        let newDateRange = { ...term.dateRange, duration: mainDateRange.duration };
        
        // If in custom mode, adjust the end date based on the new duration
        if (newDateRange.type === 'custom' && newDateRange.custom.startDate) {
          const start = new Date(newDateRange.custom.startDate);
          const end = new Date(start);
          end.setDate(start.getDate() + mainDateRange.duration - 1);
          
          // Format the date as YYYY-MM-DD
          const formattedEndDate = end.toISOString().split('T')[0];
          
          newDateRange.custom = {
            ...newDateRange.custom,
            endDate: formattedEndDate
          };
        }
        
        return {
          ...term,
          dateRange: newDateRange
        };
      })
    );
    
    // Update new term date range too
    setNewTermDateRange(prev => ({
      ...prev,
      duration: mainDateRange.duration
    }));
  }, [mainDateRange.duration]);

  // Add new search term with validation for allowed terms
  const addSearchTerm = () => {
    if (newSearchTerm.trim() === '') return;
    
    // Validate that the term is one of the allowed parameters
    const validTerms = ['Organizations', 'Onboarded', 'Contacted', 'Under Verification'];
    if (!validTerms.includes(newSearchTerm.trim())) {
      alert('Please enter a valid parameter: Organizations, Onboarded, Contacted, or Under Verification');
      return;
    }

    const colorOptions = ['blue', 'red', 'green', 'purple', 'orange'];
    const usedColors = searchTerms.map(term => term.color);
    const availableColors = colorOptions.filter(
      color => !usedColors.includes(color)
    );

    const newTerm = {
      id: Date.now(),
      term: newSearchTerm,
      color:
        availableColors[0] ||
        colorOptions[Math.floor(Math.random() * colorOptions.length)],
      dateRange: { ...newTermDateRange }
    };

    setSearchTerms([...searchTerms, newTerm]);
    setNewSearchTerm('');
    setIsAddingTerm(false);
  };

  // Remove search term
  const removeSearchTerm = id => {
    setSearchTerms(prevTerms => prevTerms.filter(term => term.id !== id));
  };

  // Handle main time range change
  const handleTimeRangeChange = e => {
    const newPreset = e.target.value;
    if (newPreset === 'custom') {
      // Just switch to custom mode without changing dates
      setMainDateRange({
        type: 'custom',
        preset: null,
        custom: mainDateRange.custom,
        duration: mainDateRange.duration
      });
    } else {
      setMainDateRange({
        type: 'preset',
        preset: newPreset,
        custom: {
          startDate: null,
          endDate: null
        },
        duration: getPresetDuration(newPreset)
      });
    }
  };

  // Handle custom date range for main component
  const handleMainCustomDateChange = (startDate, endDate) => {
    const duration = calculateDuration(startDate, endDate);
    
    setMainDateRange({
      type: 'custom',
      preset: null,
      custom: {
        startDate,
        endDate
      },
      duration
    });
  };
  
  // Handle custom date range for a search term
  const handleTermCustomDateChange = (id, startDate, endDate) => {
    // Calculate the new duration
    const newDuration = calculateDuration(startDate, endDate);
    
    // Update the main date range duration first
    setMainDateRange(prev => ({
      ...prev,
      duration: newDuration
    }));
    
    // Then update the specific term
    setSearchTerms(prevTerms =>
      prevTerms.map(term => {
        if (term.id === id) {
          return {
            ...term,
            dateRange: {
              type: 'custom',
              preset: null,
              custom: {
                startDate,
                endDate
              },
              duration: newDuration
            }
          };
        }
        return term;
      })
    );
  };
  
  // Handle custom date range for new term being added
  const handleNewTermCustomDateChange = (startDate, endDate) => {
    const duration = calculateDuration(startDate, endDate);
    
    setNewTermDateRange({
      type: 'custom',
      preset: null,
      custom: {
        startDate,
        endDate
      },
      duration
    });
    
    // Update main duration to match
    setMainDateRange(prev => ({
      ...prev,
      duration
    }));
  };

  // Format date range for display
  const getDateRangeDisplay = dateRange => {
    if (dateRange.type === 'preset') {
      return dateRange.preset;
    } else {
      const start = dateRange.custom.startDate
        ? new Date(dateRange.custom.startDate).toLocaleDateString()
        : '';
      const end = dateRange.custom.endDate
        ? new Date(dateRange.custom.endDate).toLocaleDateString()
        : '';
      return `${start} - ${end}`;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Search Terms Cards */}
        <div className={styles.searchCardsContainer}>
          {searchTerms.map(term => (
            <div key={term.id} className={styles.searchCard}>
              <div
                className={`${styles.colorDot} ${styles[term.color + 'Dot']}`}
              ></div>
              <div className={styles.searchTermText}>
                <div className={styles.termTitle}>{term.term}</div>
                <div className={styles.termLabel}>
                  {getDateRangeDisplay(term.dateRange)}
                </div>
              </div>
              <button
                className={styles.removeButton}
                onClick={() => removeSearchTerm(term.id)}
                aria-label='Remove search term'
              >
                ×
              </button>
            </div>
          ))}

          {/* Add comparison card */}
          {searchTerms.length < 5 && (
            <div
              className={`${styles.searchCard} ${styles.addComparisonCard} ${
                isAddingTerm ? styles.addingActive : ''
              }`}
              onClick={() => setIsAddingTerm(true)}
            >
              {isAddingTerm ? (
                <div className={styles.compareInputContainer}>
                  <input
                    type='text'
                    placeholder='Enter parameter (Organizations, Onboarded, Contacted, Under Verification)'
                    value={newSearchTerm}
                    onChange={e => setNewSearchTerm(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && addSearchTerm()}
                    className={styles.compareInput}
                    autoFocus
                  />

                  <div className={styles.dateRangeSelector}>
                    {/* Custom date range for new term that maintains the same duration */}
                    <CustomDateRange
                      onCustomDateChange={handleNewTermCustomDateChange}
                      startDate={newTermDateRange.custom.startDate}
                      endDate={newTermDateRange.custom.endDate}
                      mainDuration={mainDateRange.duration}
                    />
                  </div>

                  <div className={styles.compareInputActions}>
                    <button
                      className={styles.compareCancelBtn}
                      onClick={e => {
                        e.stopPropagation()
                        setNewSearchTerm('')
                        setIsAddingTerm(false)
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className={styles.compareConfirmBtn}
                      onClick={e => {
                        e.stopPropagation()
                        addSearchTerm()
                      }}
                      disabled={!newSearchTerm.trim()}
                    >
                      Add
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className={styles.plusIcon}>+</div>
                  <div className={styles.addComparisonText}>Add comparison</div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Main Date Range Controls */}
        <div className={styles.filterControls}>
          <div className={styles.filterSelect}>
            <select
              value={
                mainDateRange.type === 'preset'
                  ? mainDateRange.preset
                  : 'custom'
              }
              onChange={handleTimeRangeChange}
              className={styles.selectDropdown}
            >
              <option value='Past 12 months'>Past 12 months</option>
              <option value='Past 30 days'>Past 30 days</option>
              <option value='Past 7 days'>Past 7 days</option>
              <option value='Past 5 years'>Past 5 years</option>
              <option value='custom'>Custom Date Range</option>
            </select>
          </div>
          <div className={styles.filterSelect}>
            <CustomDateRange
              onCustomDateChange={handleMainCustomDateChange}
              startDate={mainDateRange.custom.startDate}
              endDate={mainDateRange.custom.endDate}
              mainDuration={mainDateRange.duration}
            />
          </div>
        </div>

        {/* Organizations Chart Section */}
        <div className={styles.organizationChartSection}>
          <OrganizationsChart 
            chartType={chartType}
            setChartType={setChartType}
            data={orgChartData}
          />
        </div>
      </div>
    </div>
  )
}