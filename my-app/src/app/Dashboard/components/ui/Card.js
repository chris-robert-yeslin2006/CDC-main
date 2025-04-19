// components/ui/Card.js
import styles from '../../Statistics/StatisticsSection.module.css'

const Card = ({ children, className, ...props }) => {
  return (
    <div className={`${styles.glassCard} ${className || ''}`} {...props}>
      {children}
    </div>
  )
}

export default Card