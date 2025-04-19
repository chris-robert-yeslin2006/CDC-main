import { useEffect, useState } from 'react'
import styles from '../../Statistics/StatisticsSection.module.css'
import MetricCard from './MetricCard'
import { CalendarIcon, MailIcon, ClockIcon, CheckIcon } from '../ui/icons'

const MetricsSection = () => {
  const [onboarded, setOnboarded] = useState(0)
  const [contacted, setContacted] = useState(0)
  const [standby, setStandby] = useState(0)
  const [verification, setVerification] = useState(0)

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const token = sessionStorage.getItem('token')
        const res = await fetch('http://localhost:8000/organization/list', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await res.json()
        const organizations = data.organizations || []

        // Example logic based on status field
        setOnboarded(organizations.filter(org => org.status === 'onboard').length)
        setContacted(organizations.filter(org => org.status === 'contacted').length)
        setStandby(organizations.filter(org => org.status === 'standby').length)
        setVerification(organizations.filter(org => org.status === 'under verification').length)
      } catch (err) {
        console.error('Failed to fetch metrics:', err)
      }
    }

    fetchMetrics()
  }, [])

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Time-frame Sensitive Metrics</h2>
      <div className={styles.metricsGrid}>
        <MetricCard
          title="Organizations Onboarded"
          value={onboarded}
          change="15%"
          positive={true}
          icon={<CalendarIcon />}
          type="teal"
        />
        
        <MetricCard
          title="Organizations Contacted"
          value={contacted}
          change="5%"
          positive={true}
          icon={<MailIcon />}
          type="blue"
        />
        
        <MetricCard
          title="Organizations in Standby"
          value={standby}
          change="2%"
          positive={true}
          icon={<ClockIcon />}
          type="orange"
        />
        
        <MetricCard
          title="Organizations in Verification"
          value={verification}
          change="10%"
          positive={true}
          icon={<CheckIcon />}
          type="gold"
        />
      </div>
    </section>
  )
}

export default MetricsSection
