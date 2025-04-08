'use client'

import { useState } from 'react';
import { redirect } from 'next/navigation'

export default function SideNav({ activeSection, onNavChange, userProfile }) {
  // State for tracking expanded nav items
  const [expandedItems, setExpandedItems] = useState({
    organizations: false,
    admin: false
  });

  // Toggle expanded state for items with sub-navigation
  const toggleExpand = (item) => {
    setExpandedItems({
      ...expandedItems,
      [item]: !expandedItems[item]
    });
  };

  return (
    <div className="sidebar">
      <div className="user-profile">
        <div className="user-avatar">{userProfile.avatar}</div>
        <div className="user-info">
          <h3>{userProfile.name}</h3>
          <p>{userProfile.role}</p>
        </div>
      </div>
      
      <ul className="nav-menu">
        <li 
          className={`nav-item ${activeSection === 'statistics' ? 'active' : ''}`}
          onClick={() => onNavChange('statistics')}
        >
          <i>📊</i> Statistics
        </li>
        
        <li className={`nav-item ${activeSection.startsWith('organizations') ? 'active' : ''}`}>
          <div onClick={() => toggleExpand('organizations')} className="nav-toggle">
            <span><i>🏢</i> Organizations</span>
            <span className="chevron">{expandedItems.organizations ? '▼' : '▶'}</span>
          </div>
          
          {expandedItems.organizations && (
            <ul className="sub-nav">
              <li 
                className={activeSection === 'organizations-add' ? 'active' : ''}
                onClick={() => {
                  onNavChange('organizations-add')
                }}
              >
                Add
              </li>
              <li 
                className={activeSection === 'organizations-list' ? 'active' : ''}
                onClick={() =>{
                  onNavChange('organizations-list')
                }}
              >
                List
              </li>
            </ul>
          )}
        </li>
        
        <li className={`nav-item ${activeSection.startsWith('admin') ? 'active' : ''}`}>
          <div onClick={() => toggleExpand('admin')} className="nav-toggle">
            <span><i>👥</i> Admin</span>
            <span className="chevron">{expandedItems.admin ? '▼' : '▶'}</span>
          </div>
          
          {expandedItems.admin && (
            <ul className="sub-nav">
              <li 
                className={activeSection === 'admin-add' ? 'active' : ''}
                onClick={() => onNavChange('admin-add')}
              >
                Add
              </li>
              <li 
                className={activeSection === 'admin-list' ? 'active' : ''}
                onClick={() => onNavChange('admin-list')}
              >
                List
              </li>
            </ul>
          )}
        </li>
        
        <li 
          className={`nav-item ${activeSection === 'analytics' ? 'active' : ''}`}
          onClick={() => onNavChange('analytics')}
        >
          <i>📈</i> Analytics
        </li>
        
        <li 
          className={`nav-item ${activeSection === 'contentManagement' ? 'active' : ''}`}
          onClick={() => onNavChange('contentManagement')}
        >
          <i>📄</i> Content Management
        </li>
        
        <li 
          className={`nav-item ${activeSection === 'systemSettings' ? 'active' : ''}`}
          onClick={() => onNavChange('systemSettings')}
        >
          <i>⚙️</i> System Settings
        </li>
      </ul>

      <style jsx>{`
        .sidebar {
          background-color: #1e293b;
          color: #fff;
          padding: 24px 0;
          box-shadow: 2px 0px 5px rgba(0,0,0,0.1);
          height: 100%;
          overflow-y: auto;
        }
        
        .user-profile {
          display: flex;
          align-items: center;
          padding: 0 24px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          margin-bottom: 24px;
        }
        
        .user-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background-color: #64748b;
          margin-right: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 500;
        }
        
        .user-info h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
        }
        
        .user-info p {
          margin: 4px 0 0;
          font-size: 14px;
          opacity: 0.7;
        }
        
        .nav-menu {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .nav-item {
          padding: 12px 24px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .nav-toggle {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .nav-item.active {
          background-color: rgba(255,255,255,0.1);
          border-left: 4px solid #38bdf8;
          padding-left: 20px;
        }
        
        .nav-item:hover:not(.active) {
          background-color: rgba(255,255,255,0.05);
        }
        
        .nav-item i {
          margin-right: 12px;
          opacity: 0.7;
        }
        
        .chevron {
          font-size: 10px;
        }
        
        .sub-nav {
          list-style: none;
          padding: 0;
          margin: 8px 0 0 24px;
        }
        
        .sub-nav li {
          padding: 8px 16px;
          cursor: pointer;
          font-size: 14px;
          border-radius: 4px;
          transition: background-color 0.2s;
        }
        
        .sub-nav li:hover:not(.active) {
          background-color: rgba(255,255,255,0.05);
        }
        
        .sub-nav li.active {
          background-color: rgba(255,255,255,0.1);
        }
      `}</style>
    </div>
  );
}
