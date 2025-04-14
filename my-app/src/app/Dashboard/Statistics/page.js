'use client'
import { useState } from 'react';
import DonutChart from './DonutChart';
import BarChart from './BarChart';
import './StatisticsSection.css';

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
            <h1>Dashboard</h1>
            <p className="subtitle">Analytics overview for All Organizations</p>
          </div>
          
          <div className="header-actions">
            <div className="date-filter">
              Last 30 days ▼
            </div>
          </div>
        </div>
        
        <div className="tab-navigation">
          <button className="tab-button">Overview</button>
          <button className="tab-button active">Analytics</button>
          <button className="tab-button">Reports</button>
          <button className="tab-button">Settings</button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="16" height="16">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="16" height="16">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="16" height="16">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
            <div className="option-group">
              <span className="option-label">Chart Type</span>
              <select className="chart-select">
                <option value="bar">Bar</option>
                <option value="line">Line</option>
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
            <h3 className="chart-title">Pass Percentage by Language</h3>
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