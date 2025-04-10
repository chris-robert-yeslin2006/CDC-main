'use client';

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import BarChart from '../../../../Statistics/BarChart'
import DonutChart from '../../../../Statistics/DonutChart'

export default function AnalyticsPage() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const orgId = searchParams.get('orgId');
  const language = searchParams.get('language');
  // Sample data - replace with your actual data
  const studentCount = 1480
  const testCount = 58
  
  const leaderboardData = [
    { name: "Alex Johnson", testsAttended: 47, highestScore: 98, totalScore: 3890, avgScore: 82.8 },
    { name: "Samantha Lee", testsAttended: 52, highestScore: 100, totalScore: 4680, avgScore: 90.0 },
    { name: "Michael Chen", testsAttended: 49, highestScore: 95, totalScore: 4165, avgScore: 85.0 },
    { name: "Taylor Moore", testsAttended: 51, highestScore: 97, totalScore: 4335, avgScore: 85.0 },
    { name: "Jordan Smith", testsAttended: 43, highestScore: 96, totalScore: 3440, avgScore: 80.0 },
    { name: "Emma Williams", testsAttended: 48, highestScore: 99, totalScore: 4368, avgScore: 91.0 },
    { name: "Noah Brown", testsAttended: 50, highestScore: 94, totalScore: 4200, avgScore: 84.0 },
    { name: "Olivia Davis", testsAttended: 46, highestScore: 98, totalScore: 4048, avgScore: 88.0 },
  ]
  
  const passPercentage = 78 // Sample pass percentage
  const overallAvgScore = 84.5 // Sample overall average score
  
  // Donut chart data for pass percentage
  const passData = [
    { name: "Pass", value: 1154, color: "#10b981" },
    { name: "Fail", value: 326, color: "#ef4444" }
  ]
  
  // Bar chart data for average scores
  const avgScoreData = [
    { day: "Week 1", value: 81.2 },
    { day: "Week 2", value: 83.5 },
    { day: "Week 3", value: 85.8 },
    { day: "Week 4", value: 84.5 },
    { day: "Week 5", value: 87.2 }
  ]

  return (
    <div className="analytics-container">
      <h1 className="page-title">Student Analytics Dashboard</h1>
      
      {/* Top boxes */}
      <div className="top-boxes">
        <div className="info-box">
          <h2 className="box-label">Total Students</h2>
          <div className="box-value-container">
            <span className="box-value">{studentCount}</span>
            <span className="trend-indicator positive">+12% ↑</span>
          </div>
        </div>
        
        <div className="info-box">
          <h2 className="box-label">Tests Conducted</h2>
          <div className="box-value-container">
            <span className="box-value">{testCount}</span>
            <span className="trend-indicator positive">+3 this week</span>
          </div>
        </div>
      </div>
      
      {/* Leaderboard */}
      <div className="leaderboard">
        <div className="leaderboard-header">
          <h2 className="leaderboard-title">Student Leaderboard</h2>
        </div>
        <div className="table-container">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Tests Attended</th>
                <th>Highest Score</th>
                <th>Total Score</th>
                <th>Avg. Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData
                .sort((a, b) => b.avgScore - a.avgScore)
                .map((student, index) => (
                  <tr key={index} className={index < 3 ? "top-performer" : ""}>
                    <td>
                      <div className="rank">#{index + 1}</div>
                    </td>
                    <td>
                      <div className="student-name">{student.name}</div>
                    </td>
                    <td>
                      <div className="data-cell">{student.testsAttended}</div>
                    </td>
                    <td>
                      <div className="data-cell">{student.highestScore}</div>
                    </td>
                    <td>
                      <div className="data-cell">{student.totalScore}</div>
                    </td>
                    <td>
                      <div className="avg-score">{student.avgScore.toFixed(1)}</div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Bottom boxes */}
      <div className="bottom-boxes">
        <div className="chart-box">
          <h2 className="chart-title">Pass Percentage</h2>
          <div className="chart-container">
            <DonutChart 
              data={passData} 
              width={300} 
              height={300} 
              centerLabel="Pass Rate" 
              centerValue={`${passPercentage}%`}
              showTooltip={true} 
            />
          </div>
        </div>
        
        <div className="chart-box">
          <h2 className="chart-title">Average Scores Trend</h2>
          <div className="chart-container">
            <BarChart 
              data={avgScoreData} 
              width={500} 
              height={300} 
              xLabel="Time Period" 
              yLabel="Average Score" 
            />
          </div>
          <div className="overall-avg">
            <span className="avg-label">Overall Average: </span>
            <span className="avg-value">{overallAvgScore.toFixed(1)}</span>
          </div>
        </div>
        <button 
          className='student-button'
          onClick={() => router.push(`/Dashboard/Analytics/List/LanguageList/LanguageDetails/StudentList?orgId=${orgId}&language=${language}`)}
        >
          Students List
        </button>
      </div>
      <style jsx>{`
        /* Base styles */
        .analytics-container {
          padding: 24px;
          background-color: #f9fafb;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .page-title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 24px;
          color: #1f2937;
        }

        /* Top boxes styles */
        .top-boxes {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-bottom: 32px;
        }

        @media (min-width: 768px) {
          .top-boxes {
            grid-template-columns: 1fr 1fr;
          }
        }

        .info-box {
          background-color: white;
          border-radius: 8px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .box-label {
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          margin-bottom: 4px;
        }

        .box-value-container {
          display: flex;
          align-items: flex-end;
        }

        .box-value {
          font-size: 30px;
          font-weight: 700;
          color: #1f2937;
        }

        .trend-indicator {
          font-size: 14px;
          margin-left: 8px;
        }

        .trend-indicator.positive {
          color: #10b981;
        }

        .trend-indicator.negative {
          color: #ef4444;
        }

        /* Leaderboard styles */
        .leaderboard {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          margin-bottom: 32px;
        }

        .leaderboard-header {
          padding: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .leaderboard-title {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
        }

        .table-container {
          overflow-x: auto;
        }

        .leaderboard-table {
          width: 100%;
          border-collapse: collapse;
        }

        .leaderboard-table th {
          padding: 12px 24px;
          text-align: left;
          font-size: 12px;
          font-weight: 500;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background-color: #f9fafb;
        }

        .leaderboard-table td {
          padding: 16px 24px;
          white-space: nowrap;
        }

        .leaderboard-table tr {
          border-bottom: 1px solid #e5e7eb;
        }

        .leaderboard-table tbody tr:last-child {
          border-bottom: none;
        }

        .top-performer {
          background-color: #fefce8;
        }

        .rank {
          font-size: 14px;
          font-weight: 500;
          color: #1f2937;
        }

        .student-name {
          font-size: 14px;
          font-weight: 500;
          color: #1f2937;
        }

        .data-cell {
          font-size: 14px;
          color: #1f2937;
        }

        .avg-score {
          font-size: 14px;
          font-weight: 500;
          color: #1f2937;
        }

        /* Bottom boxes styles */
        .bottom-boxes {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        @media (min-width: 768px) {
          .bottom-boxes {
            grid-template-columns: 1fr 1fr;
          }
        }

        .chart-box {
          background-color: white;
          border-radius: 8px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .chart-title {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 16px;
        }

        .chart-container {
          display: flex;
          justify-content: center;
        }

        .overall-avg {
          text-align: center;
          margin-top: 16px;
        }

        .avg-label {
          font-size: 14px;
          color: #6b7280;
        }

        .avg-value {
          font-weight: 700;
          color: #1f2937;
        }
           .student-button {
          background-color: #2980b9;
          font-weight: bold;
          width: max-content;
          color: white;
          padding: 10px;
          border: transparent 0px solid;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
