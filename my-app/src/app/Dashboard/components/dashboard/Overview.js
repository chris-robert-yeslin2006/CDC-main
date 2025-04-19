// components/dashboard/Overview.js
import { useEffect, useState } from 'react'
import styles from '../../Statistics/StatisticsSection.module.css'
import StatCard from './StatCard'
import { DocumentIcon, UsersIcon } from '../ui/icons'

const Overview = () => {
  const [orgCount, setOrgCount] = useState(0)
  const [studentCount, setStudentCount] = useState(0)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = sessionStorage.getItem("token")
  
        const [orgRes, studentRes] = await Promise.all([
          fetch("http://localhost:8000/organization/list", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch("http://localhost:8000/analytics/students", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ])
  
        const orgData = await orgRes.json()
        const studentData = await studentRes.json()
  
        console.log("Organizations:", orgData.organizations?.length)
        console.log("Students:", studentData.students?.length)
  
        setOrgCount(orgData.organizations?.length || 0)
        setStudentCount(studentData.students?.length || 0)
      } catch (error) {
        console.error("Error fetching dashboard stats:", error)
      }
    }
  
    fetchStats()
  }, [])
  
  

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Overview</h2>
      <div className={styles.statsGrid}>
        <StatCard
          title="Total Organizations"
          value={orgCount.toLocaleString()}
          change="12%"
          positive={true}
          icon={<DocumentIcon />}
          type="primary"
        />
        <StatCard
          title="Total Students"
          value={studentCount.toLocaleString()}
          change="8%"
          positive={true}
          icon={<UsersIcon />}
          type="secondary"
        />
      </div>
    </section>
  )
}

export default Overview
