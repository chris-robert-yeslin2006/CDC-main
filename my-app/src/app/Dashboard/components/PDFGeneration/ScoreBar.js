"use client"

import { useState,useEffect } from "react"

function ScoreBar({Vocabulary,Sentence_mastery, Fluency ,Pronouncation }) {
  const [xAxis, setXAxis] = useState("Category")
  const [yAxis, setYAxis] = useState("Score")
  const [data, setData] = useState([])

  // Colors for the bars
  const colors = ["#f05654", "#f0c354", "#20c997", "#6c5ce7", "#f7a440", "#ff7675", "#74b9ff"]

  useEffect(() => {
    const apiData = [
      { category: "Vocabulary", score: Vocabulary },
      { category: "Sentence Mastery", score: Sentence_mastery },
      { category: "Fluency", score: Fluency },
      { category: "Pronunciation", score: Pronouncation },
    ]
    setData(apiData)
  }, [Vocabulary, Sentence_mastery, Fluency, Pronouncation]) 
  // Generate Y-axis labels from 0 to 90 in increments of 10
  const yAxisLabels = Array.from({ length: 10 }, (_, i) => 90 - i * 10)


  return (
    <div className="chart-container">
      <div className="chart-content">
        <div className="chart-area">
          {/* Y-axis labels */}
          <div className="y-axis">
            {yAxisLabels.map((value) => (
              <div key={value} className="y-label">
                {value}
              </div>
            ))}
          </div>

          {/* Chart grid and bars */}
          <div className="chart-grid">
            {/* Horizontal grid lines */}
            {yAxisLabels.map((value) => (
              <div key={value} className="grid-line" style={{ bottom: `${(value / 90) * 100}%` }} />
            ))}

            {/* Bars */}
            <div className="bars-container">
              {data.map((item, index) => (
                <div key={item.category} className="bar-column">
                  <div
                    className="bar"
                    style={{
                      height: `${(item.score / 110) * 100}%`,
                      backgroundColor: colors[index % colors.length],
                    }}
                  >
                    <div className="bar-value">{item.score}</div>
                  </div>
                  <div className="x-label">{item.category}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* X-axis title */}
        <div className="x-axis-title">{xAxis}</div>
      </div>
    </div>
  )
}

export default ScoreBar
