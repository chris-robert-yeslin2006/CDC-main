'use client'
import { useState } from 'react';
import DonutChart from './DonutChart';
import BarChart from './BarChart';
import styles from './StatisticsSection.module.css';

export default function StatisticsSection() {
  const [statistics, setStatistics] = useState({
    students: 1428,
    organizations: 1428,
    activeUsers: 856,
    completionRate: 72
  });

  const [chartSettings, setChartSettings] = useState({
    barChartX: 'Day',
    barChartY: 'Engagement Score',
    donut1Data: [
      { name: 'Japanese', value: 30, color: '#10b981' },
      { name: 'Mandrin', value: 25, color: '#f87171' },
      { name: 'German', value: 20, color: '#60a5fa' },
      { name: 'French', value: 15, color: '#f59e0b' },
      { name: 'Spanish', value: 7, color: '#8b5cf6' },
      { name: 'English', value: 3, color: '#ec4899' }
    ],
    donut2Data: [
      { name: 'Pass', value: 72, color: '#10b981' },
      { name: 'Fail', value: 28, color: '#f87171' }
    ],
    barChartData: [
      { day: 'Mon', value: 3.0 },
      { day: 'Tue', value: 2.0 },
      { day: 'Wed', value: 4.0 },
      { day: 'Thu', value: 2.0 },
      { day: 'Fri', value: 5.0 }
    ]
  });

  const handleXAxisChange = (e) => {
    setChartSettings({ ...chartSettings, barChartX: e.target.value });
  };

  const handleYAxisChange = (e) => {
    setChartSettings({ ...chartSettings, barChartY: e.target.value });
  };

  return (
    <div className={styles.StatisticsSection}>
      <div className={styles.header}>
        <h1>Dashboard Overview</h1>
        <div className={styles.headerActions}>
          <div className={styles.dateFilter}>Last 30 days ▼</div>
          <button className={styles.actionButton}>Export Report</button>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>NO of Students</h3>
          <p className={styles.value}>{statistics.students}</p>
        </div>
        <div className={styles.statCard}>
          <h3>NO of Organizations</h3>
          <p className={styles.value}>{statistics.organizations}</p>
        </div>
      </div>

      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3>Student Distribution by Language</h3>
            <div className={styles.chartLegend}>
              {chartSettings.donut1Data.map((item) => (
                <div key={item.name} className={styles.legendItem}>
                  <div
                    className={styles.legendColor}
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <DonutChart
            data={chartSettings.donut1Data}
            width={250}
            height={250}
            centerLabel="Students"
            showTooltip={true}
          />
        </div>

        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3>Activity by {chartSettings.barChartX}</h3>
            <div className={styles.axisControls}>
              <div className={styles.controlGroup}>
                <label>X:</label>
                <select value={chartSettings.barChartX} onChange={handleXAxisChange}>
                  <option value="Day">Day</option>
                  <option value="Week">Week</option>
                  <option value="Month">Month</option>
                </select>
              </div>
              <div className={styles.controlGroup}>
                <label>Y:</label>
                <select value={chartSettings.barChartY} onChange={handleYAxisChange}>
                  <option value="Engagement Score">Engagement Score</option>
                  <option value="Logins">Logins</option>
                  <option value="Submissions">Submissions</option>
                </select>
              </div>
            </div>
          </div>

          <BarChart
            data={chartSettings.barChartData}
            width={400}
            height={300}
            xLabel={chartSettings.barChartX}
            yLabel={chartSettings.barChartY}
          />
        </div>

        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3>Overall Pass Percentage</h3>
            <div className={styles.chartLegend}>
              {chartSettings.donut2Data.map((item) => (
                <div key={item.name} className={styles.legendItem}>
                  <div
                    className={styles.legendColor}
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <DonutChart
            data={chartSettings.donut2Data}
            width={250}
            height={250}
            centerLabel="Pass Rate"
            centerValue={`${chartSettings.donut2Data[0].value}%`}
            showTooltip={true}
          />
        </div>

        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3>Recent Activity</h3>
            <a href="#" className={styles.viewAll}>View All</a>
          </div>

          <div className={styles.activityLog}>
            <div className={styles.activityItem}>
              <div>
                <div className={styles.activityTitle}>New organization added</div>
                <div className={styles.activityDesc}>TechEd Solutions</div>
              </div>
              <div className={styles.activityTime}>10 min ago</div>
            </div>

            <div className={styles.activityItem}>
              <div>
                <div className={styles.activityTitle}>Student batch import</div>
                <div className={styles.activityDesc}>128 new students added</div>
              </div>
              <div className={styles.activityTime}>2 hours ago</div>
            </div>

            <div className={styles.activityItem}>
              <div>
                <div className={styles.activityTitle}>System update completed</div>
                <div className={styles.activityDesc}>Version 2.4.0 deployed</div>
              </div>
              <div className={styles.activityTime}>Yesterday</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
