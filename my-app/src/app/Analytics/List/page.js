'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import './analytics.css';

export default function AnalyticsOrgList() {
  const [organizations, setOrganizations] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const res = await fetch('http://localhost:8000/organization/list');
        const data = await res.json();

        // Ensure we're only setting the array part
        setOrganizations(data.organizations);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchOrganizations();
  }, []);

  const handleViewDetails = (orgId) => {
    router.push(`/Analytics/List/LanguageList?orgId=${orgId}`);
  };

  return (
    <div className="analytics-container">
      <h1 className="analytics-title">Organization List (Analytics)</h1>
      <div className="analytics-grid">
        {organizations.length > 0 ? (
          organizations.map((org) => (
            <div key={org.id} className="analytics-card">
              <h2 className="analytics-org-name">{org.name}</h2>
              <p><strong>Head:</strong> {org.head}</p>
              <p><strong>Ambassador:</strong> {org.ambassador_name}</p>
              <button className="view-details-btn" onClick={() => handleViewDetails(org.id)}>
                View Details
              </button>
            </div>
          ))
        ) : (
          <p>Loading organizations...</p>
        )}
      </div>
    </div>
  );
}
