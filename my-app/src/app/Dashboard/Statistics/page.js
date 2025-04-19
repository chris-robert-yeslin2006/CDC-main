'use client'
import { useState, useEffect } from 'react'
import styles from './StatisticsSection.module.css'
import Overview from '../components/dashboard/Overview'
import MetricsSection from '../components/dashboard/MetricsSection'
import DateRangeSelector from '../components/dashboard/DateRangeSelector'
import OrganizationsChart from '../components/dashboard/OrganizationsChart'
import ComparisonChart from '../components/dashboard/ComparisonChart'
import { getChartData } from "../../utils/chartData"

export default function Dashboard() {
  const [timeframeView, setTimeframeView] = useState('Week')
  const [chartType, setChartType] = useState('bar')
  const [customTimeframe, setCustomTimeframe] = useState('7days')
  const [selectedMetrics, setSelectedMetrics] = useState([
    'onboarded',
    'contacted'
  ])
  const [comparisonTimeframe, setComparisonTimeframe] = useState(customTimeframe)
  const [customDateRange, setCustomDateRange] = useState(null)
  const [dataSource, setDataSource] = useState('mock') // New state for data source toggle
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [chartData, setChartData] = useState([])
  const [comparisonData, setComparisonData] = useState([])

  useEffect(() => {
    setComparisonTimeframe(customTimeframe)
  }, [customTimeframe])

  useEffect(() => {
    const fetchData = async () => {
      if (dataSource === 'mock') {
        // Use mock data from chartData.js
        setChartData(getChartData(customTimeframe))
        setComparisonData(comparisonTimeframe === 'custom' && customDateRange 
          ? getChartData('7days') // Replace with actual custom date range data
          : getChartData(comparisonTimeframe))
      } else {
        // Fetch real data from backend
        setLoading(true)
        setError(null)
        try {
          // For main chart data
          const response = await fetch(`http://localhost:8000/analytics/organizations/timeline?timeframe=${customTimeframe}`)
          if (!response.ok) throw new Error('Failed to fetch data')
          const data = await response.json()
          setChartData(data.data)
          
          // For comparison chart data
          const timeframe = comparisonTimeframe === 'custom' && customDateRange ? '7days' : comparisonTimeframe
          const comparisonResponse = await fetch(`http://localhost:8000/analytics/organizations/timeline?timeframe=${timeframe}`)
          if (!comparisonResponse.ok) throw new Error('Failed to fetch comparison data')
          const comparisonResult = await comparisonResponse.json()
          setComparisonData(comparisonResult.data)
        } catch (err) {
          setError(err.message)
          // Fallback to mock data
          setChartData(getChartData(customTimeframe))
          setComparisonData(getChartData(comparisonTimeframe))
        } finally {
          setLoading(false)
        }
      }
    }
    
    fetchData()
  }, [dataSource, customTimeframe, comparisonTimeframe, customDateRange])

  const toggleMetricSelection = metric => {
    if (selectedMetrics.includes(metric)) {
      if (selectedMetrics.length > 1) {
        setSelectedMetrics(selectedMetrics.filter(m => m !== metric))
      }
    } else {
      setSelectedMetrics([...selectedMetrics, metric])
    }
  }

  const handleCustomDateRange = ({ startDate, endDate }) => {
    setCustomDateRange({ startDate, endDate })
    setComparisonTimeframe('custom')
  }

  return (
    <div className={styles.container} style={{ overflowX: 'hidden' }}>
      <main className={styles.dashboardContent}>
        <Overview />

        <MetricsSection />
        
        {/* Data Source Toggle */}
        <div className={styles.dataSourceToggle || 'dataSourceToggle'} style={{ 
          marginBottom: '20px', 
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{ 
            fontWeight: 500, 
            marginRight: '8px' 
          }}>
            Data Source:
          </div>
          <div style={{ 
            display: 'flex', 
            gap: '16px',
            padding: '8px 12px',
            background: '#f5f5f5',
            borderRadius: '8px'
          }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer' 
            }}>
              <input
                type="radio"
                name="dataSource"
                value="mock"
                checked={dataSource === 'mock'}
                onChange={() => setDataSource('mock')}
                style={{ marginRight: '6px' }}
              />
              Mock Data
            </label>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer' 
            }}>
              <input
                type="radio"
                name="dataSource"
                value="backend"
                checked={dataSource === 'backend'}
                onChange={() => setDataSource('backend')}
                style={{ marginRight: '6px' }}
              />
              Backend Data
            </label>
          </div>
          {loading && <span style={{ color: '#666', fontSize: '14px' }}>Loading...</span>}
          {error && <span style={{ color: '#e53e3e', fontSize: '14px' }}>Error: {error}</span>}
        </div>

        <DateRangeSelector 
          customTimeframe={customTimeframe}
          setCustomTimeframe={setCustomTimeframe}
        />

        <section className={styles.chartsGridContainer}>
          <OrganizationsChart 
            chartType={chartType}
            setChartType={setChartType}
            data={chartData}
          />

          <ComparisonChart 
            selectedMetrics={selectedMetrics}
            toggleMetricSelection={toggleMetricSelection}
            customDateRange={customDateRange}
            comparisonTimeframe={comparisonTimeframe}
            handleCustomDateRange={handleCustomDateRange}
            data={comparisonData}
          />
        </section>
      </main>
    </div>
  )
}