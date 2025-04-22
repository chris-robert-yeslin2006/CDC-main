'use client'

import { useState } from 'react';

export default function StatisticsNav({ activeStatSection, onStatNavChange }) {
  // Handle click on statistics menu item
  const handleStatClick = (statSection) => {
    // Update the active section
    onStatNavChange(statSection);
  };

  return (
    <div className="statistics-sidebar">
      <div className="statistics-header">
        <h2>Statistics</h2>
      </div>
      
      <ul className="stat-nav-menu">
        <li 
          className={`stat-nav-item ${activeStatSection === 'sales' ? 'active' : ''}`}
          onClick={() => handleStatClick('sales')}
        >
          <div className="stat-nav-label">
            <svg className="stat-nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18"></path>
              <path d="m19 9-5 5-4-4-3 3"></path>
            </svg>
            <span>Sales</span>
          </div>
        </li>
        
        <li 
          className={`stat-nav-item ${activeStatSection === 'test-activity' ? 'active' : ''}`}
          onClick={() => handleStatClick('test-activity')}
        >
          <div className="stat-nav-label">
            <svg className="stat-nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 3 4 9-4 9"></path>
              <path d="m19 3-4 9 4 9"></path>
              <path d="M3 12h18"></path>
            </svg>
            <span>Test Activity</span>
          </div>
        </li>
        
        <li 
          className={`stat-nav-item ${activeStatSection === 'org-activity' ? 'active' : ''}`}
          onClick={() => handleStatClick('org-activity')}
        >
          <div className="stat-nav-label">
            <svg className="stat-nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            <span>Organizations Activity</span>
          </div>
        </li>
      </ul>

      <style jsx>{`
        .statistics-sidebar {
          background: white;
          color: #333;
          padding: 20px 0;
          height: 100%;
          overflow-y: auto;
          width: 220px;
          border-left: 1px solid #f0f0f0;
          display: flex;
          flex-direction: column;
          animation: slideIn 0.2s ease-out;
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .statistics-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px 20px;
          margin-bottom: 10px;
        }
        
        .statistics-header h2 {
          margin: 0;
          font-size: 22px;
          font-weight: 500;
          color: #5CCEEE;
        }
        
        .stat-nav-menu {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        
        .stat-nav-item {
          cursor: pointer;
          transition: all 0.2s ease;
          border-radius: 0;
          font-weight: 500;
          font-size: 15px;
        }
        
        .stat-nav-label {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          width: 100%;
        }
        
        .stat-nav-icon {
          width: 18px;
          height: 18px;
        }
        
        .stat-nav-item.active {
          background-color: #f5f5f5;
          color: #000;
          font-weight: 500;
        }
        
        .stat-nav-item:hover:not(.active) {
          background-color: #f9f9f9;
        }
      `}</style>
    </div>
  );
}