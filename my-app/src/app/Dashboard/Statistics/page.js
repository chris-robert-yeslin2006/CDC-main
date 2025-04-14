'use client'
import { useState } from 'react';
import DonutChart from './DonutChart';
import BarChart from './BarChart';
import "./StatisticsSection.css"

export default function Dashboard() {
  const [statistics, setStatistics] = useState({
    students: 12345,
    organizations: 24,
    completionRate: 78.5
  });

  const [chartSettings, setChartSettings] = useState({
    chartType: 'month',
    xAxis: 'Month',
    yAxis: 'Students',
    languageData: [
      { name: 'JavaScript', value: 30, color: '#6366f1' },
      { name: 'Python', value: 25, color: '#8b5cf6' },
      { name: 'Java', value: 20, color: '#ec4899' },
      { name: 'C++', value: 15, color: '#10b981' },
      { name: 'Go', value: 10, color: '#14b8a6' }
    ],
    passRateData: [
      { name: 'Pass', value: 84, color: '#6366f1' },
      { name: 'Fail', value: 16, color: '#f87171' }
    ],
    barChartData: [
      { day: 'Jan', value: 400 },
      { day: 'Feb', value: 300 },
      { day: 'Mar', value: 200 },
      { day: 'Apr', value: 250 },
      { day: 'May', value: 200 },
      { day: 'Jun', value: 230 }
    ]
  });

  const handleChartTypeChange = (type) => {
    setChartSettings({ ...chartSettings, chartType: type });
  };

  const handleXAxisChange = (e) => {
    setChartSettings({ ...chartSettings, xAxis: e.target.value });
  };

  const handleYAxisChange = (e) => {
    setChartSettings({ ...chartSettings, yAxis: e.target.value });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-top">
          <div className="header-title">
            <h1>Analytics Dashboard</h1>
            <p className="subtitle">Performance insights across all organizations</p>
          </div>
          
          <div className="header-actions">
            <div className="date-filter">
              <span className="date-filter-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </span>
              Last 30 days
              <span className="date-filter-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </span>
            </div>
            
            <button className="export-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Export Data
            </button>
          </div>
        </div>
        
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div className="stat-info">
              <p className="stat-label">Total Students</p>
              <h2 className="stat-value">{statistics.students.toLocaleString()}</h2>
            </div>
          </div>
          <p className="stat-change positive">
            <span className="change-badge">+6.2%</span> 
            from last month
          </p>
        </div>
        
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <rect x="7" y="7" width="3" height="9"></rect>
                <rect x="14" y="7" width="3" height="5"></rect>
              </svg>
            </div>
            <div className="stat-info">
              <p className="stat-label">Organizations</p>
              <h2 className="stat-value">{statistics.organizations}</h2>
            </div>
          </div>
          <p className="stat-change positive">
            <span className="change-badge">+2.4%</span> 
            New this month
          </p>
        </div>
        
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <div className="stat-info">
              <p className="stat-label">Average Pass Rate</p>
              <h2 className="stat-value">{statistics.completionRate}%</h2>
            </div>
          </div>
          <p className="stat-change positive">
            <span className="change-badge">+3.6%</span> 
            from last quarter
          </p>
        </div>
      </div>

      <div className="charts-grid">
        {/* Students by Language Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Students by Language</h3>
            <div className="chart-period">Last 30 days</div>
          </div>
          <div className="chart-container">
            <DonutChart 
              data={chartSettings.languageData}
              width={300}
              height={300}
              centerLabel="Students"
              showTooltip={true}
            />
          </div>
          <div className="chart-legend">
            {chartSettings.languageData.map((item) => (
              <div key={item.name} className="legend-item">
                <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                <span className="legend-text">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Metrics Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Dynamic Metrics</h3>
            <div className="chart-controls">
              <select 
                className="chart-select"
                value={chartSettings.chartType}
                onChange={(e) => handleChartTypeChange(e.target.value)}
              >
                <option value="month">Monthly</option>
                <option value="week">Weekly</option>
                <option value="day">Daily</option>
              </select>
            </div>
          </div>
          
          <div className="chart-options">
            <div className="option-group">
              <span className="option-label">X-Axis</span>
              <select 
                className="chart-select"
                value={chartSettings.xAxis}
                onChange={handleXAxisChange}
              >
                <option value="Month">Month</option>
                <option value="Week">Week</option>
                <option value="Day">Day</option>
              </select>
            </div>
            <div className="option-group">
              <span className="option-label">Y-Axis</span>
              <select 
                className="chart-select"
                value={chartSettings.yAxis}
                onChange={handleYAxisChange}
              >
                <option value="Students">Students</option>
                <option value="Completion">Completion</option>
                <option value="Engagement">Engagement</option>
              </select>
            </div>
              
          </div>
          
          <div className="chart-container">
            <BarChart
              data={chartSettings.barChartData}
              width={500}
              height={300}
              xLabel={chartSettings.xAxis}
              yLabel={chartSettings.yAxis}
            />
          </div>
        </div>

        {/* Pass Percentage by Language */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Pass Percentage</h3>
            <div className="chart-period">All students</div>
          </div>
          <div className="chart-container">
            <DonutChart 
              data={chartSettings.passRateData}
              width={300}
              height={300}
              centerLabel="Overall"
              centerValue={`${chartSettings.passRateData[0].value}%`}
              showTooltip={true}
            />
          </div>
          <div className="chart-legend">
            {chartSettings.passRateData.map((item) => (
              <div key={item.name} className="legend-item">
                <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                <span className="legend-text">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}