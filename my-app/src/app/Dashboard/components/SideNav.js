'use client'

import { useState } from 'react';

export default function SideNav({ activeSection, onNavChange, userProfile }) {
  // State for tracking expanded nav items
  const [expandedItems, setExpandedItems] = useState({
    students: false,
    admin: false
  });

  const toggleExpand = (item) => {
    setExpandedItems({
      ...expandedItems,
      [item]: !expandedItems[item]
    });
  };

  return (
    <div className="sidebar">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button className="toggle-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          </svg>
        </button>
      </div>
      
      <ul className="nav-menu">

      <li 
          className={`nav-item ${activeSection === 'statistics' ? 'active' : ''}`}
          onClick={() => onNavChange('statistics')}
        >
          <div className="nav-label">
            <svg className="nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10"></line>
              <line x1="12" y1="20" x2="12" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
            <span>Statistics</span>
          </div>
        </li>
       
        
        <li className={`nav-item ${activeSection.startsWith('student') ? 'active' : ''}`}>
          <div className="nav-toggle" onClick={() => toggleExpand('students')}>
            <div className="nav-label">
              <svg className="nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5CCEEE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Students</span>
            </div>
            <svg className={`chevron ${expandedItems.students ? 'expanded' : ''}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          
          {expandedItems.students && (
            <ul className="sub-nav">
              <li 
                className={`sub-nav-item ${activeSection === 'student-add' ? 'active' : ''}`}
                onClick={() => onNavChange('student-add')}
              >
                <div className="nav-label">
                  <svg className="nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="23" y1="11" x2="17" y2="11"></line>
                  </svg>
                  <span>Add Student</span>
                </div>
              </li>
              
              <li 
                className={`sub-nav-item ${activeSection === 'student-list' ? 'active' : ''}`}
                onClick={() => onNavChange('student-list')}
              >
                <div className="nav-label">
                  <svg className="nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                  <span>List Students</span>
                </div>
              </li>
            </ul>
          )}
        </li>
        
        <li className={`nav-item ${activeSection.startsWith('admin') ? 'active' : ''}`}>
          <div className="nav-toggle" onClick={() => toggleExpand('admin')}>
            <div className="nav-label">
              <svg className="nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5CCEEE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Admin</span>
            </div>
            <svg className={`chevron ${expandedItems.admin ? 'expanded' : ''}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          
          {expandedItems.admin && (
            <ul className="sub-nav">
              <li 
                className={`sub-nav-item ${activeSection === 'admin-add' ? 'active' : ''}`}
                onClick={() => onNavChange('admin-add')}
              >
                <div className="nav-label">
                  <svg className="nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="23" y1="11" x2="17" y2="11"></line>
                  </svg>
                  <span>Add Admin</span>
                </div>
              </li>
              
              <li 
                className={`sub-nav-item ${activeSection === 'admin-list' ? 'active' : ''}`}
                onClick={() => onNavChange('admin-list')}
              >
                <div className="nav-label">
                  <svg className="nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                  <span>List Admins</span>
                </div>
              </li>
            </ul>
          )}
        </li>
        
        <li 
          className={`nav-item ${activeSection === 'analytics' ? 'active' : ''}`}
          onClick={() => onNavChange('analytics')}
        >
          <div className="nav-label">
            <svg className="nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
            <span>Analytics</span>
          </div>
        </li>
      </ul>

      <style jsx>{`
        .sidebar {
          background: white;
          color: #333;
          padding: 20px 0;
          height: 100%;
          overflow-y: auto;
          width: 250px;
          display: flex;
          flex-direction: column;
        }
        
        .dashboard-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px 20px;
          margin-bottom: 10px;
        }
        
        .dashboard-header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 500;
          color: #5CCEEE;
        }
        
        .toggle-button {
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
        }
        
        .nav-menu {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        
        .nav-item {
          cursor: pointer;
          transition: all 0.2s ease;
          border-radius: 0;
          font-weight: 500;
          font-size: 16px;
        }
        
        .nav-toggle {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 20px;
          width: 100%;
        }
        
        .nav-label {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
        }
        
        .nav-item > .nav-label {
          width: 100%;
        }
        
        .sub-nav {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .sub-nav-item {
          cursor: pointer;
          transition: all 0.2s ease;
          padding-left: 25px;
          font-size: 15px;
          color: #666;
        }
        
        .sub-nav-item .nav-label {
          padding: 10px 20px;
        }
        
        .nav-icon {
          width: 20px;
          height: 20px;
        }
        
        .nav-item.active, .sub-nav-item.active {
          background-color: #f5f5f5;
          color: #000;
          font-weight: 500;
        }
        
        .nav-item:hover:not(.active), .sub-nav-item:hover:not(.active) {
          background-color: #f9f9f9;
        }
        
        .chevron {
          transition: transform 0.3s ease;
          color: #666;
        }
        
        .chevron.expanded {
          transform: rotate(180deg);
        }
      `}</style>
    </div>
  );
}