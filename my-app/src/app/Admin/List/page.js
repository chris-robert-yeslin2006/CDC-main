'use client'

import { useState } from 'react';
import { redirect, useRouter } from 'next/navigation';

export default function OrganizationsList({ onNavigateToAdminList }) {
  const router = useRouter();
  const [organizations, setOrganizations] = useState([
    { 
      id: '1', 
      name: 'Company A', 
      memberCount: 145,
      status: 'active' 
    },
    { 
      id: '2', 
      name: 'Company B', 
      memberCount: 87,
      status: 'active' 
    },
    { 
      id: '3', 
      name: 'Company C', 
      memberCount: 63,
      status: 'inactive' 
    },
    { 
      id: '4', 
      name: 'Company D', 
      memberCount: 32,
      status: 'active' 
    },
    { 
      id: '5', 
      name: 'Company E', 
      memberCount: 51,
      status: 'active' 
    }
  ]);
  
  // Navigate to see admins for a specific organization
  const handleViewAdmins = (orgId) => {
    if (onNavigateToAdminList) {
      // If callback is provided (for use with SideNav), use it
      onNavigateToAdminList(orgId);
    } else {
      // Otherwise use router navigation
      router.push(`/admin-list/${orgId}`);
    }
  };

  return (
    <div className="organizations-list-container">
      <div className="header">
        <h1>Organizations</h1>
        <button className="add-button">+ Add Organization</button>
      </div>

      <div className="search-filter">
        <div className="search-box">
          <input type="text" placeholder="Search organizations..." />
          <button className="search-button">Search</button>
        </div>
        <div className="filter">
          <select defaultValue="">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="organizations-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Members</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {organizations.map(org => (
              <tr key={org.id}>
                <td>{org.name}</td>
                <td>{org.memberCount}</td>
                <td>
                  <span className={`status-badge ${org.status}`}>
                    {org.status.charAt(0).toUpperCase() + org.status.slice(1)}
                  </span>
                </td>
                <td className="actions">
                  <button 
                    className="view-admins-btn"
                    onClick={() => redirect("/Admin/List/AdminDetails")}
                  >
                    View Admins
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .organizations-list-container {
          padding: 24px;
          background-color: #f8fafc;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          height:99vh;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        
        h1 {
          margin: 0;
          color: #1e293b;
          font-size: 28px;
        }
        
        .add-button {
          background-color: #0ea5e9;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 10px 16px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .add-button:hover {
          background-color: #0284c7;
        }
        
        .search-filter {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
        }
        
        .search-box {
          display: flex;
          flex-grow: 1;
        }
        
        .search-box input {
          flex-grow: 1;
          padding: 10px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 6px 0 0 6px;
          font-size: 14px;
        }
        
        .search-button {
          background-color: #0ea5e9;
          color: white;
          border: none;
          border-radius: 0 6px 6px 0;
          padding: 0 16px;
          cursor: pointer;
        }
        
        .filter select {
          padding: 10px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 14px;
          background-color: white;
        }
        
        .table-container {
          overflow-x: auto;
          margin-bottom: 24px;
        }
        
        .organizations-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .organizations-table th {
          text-align: left;
          padding: 14px 16px;
          background-color: #e2e8f0;
          color: #475569;
          font-weight: 600;
        }
        
        .organizations-table td {
          padding: 14px 16px;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .status-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .status-badge.active {
          background-color: #dcfce7;
          color: #166534;
        }
        
        .status-badge.inactive {
          background-color: #fee2e2;
          color: #991b1b;
        }
        
        .actions {
          display: flex;
          gap: 8px;
        }
        
        .view-admins-btn, .edit-btn {
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          border: none;
        }
        
        .view-admins-btn {
          background-color: #0ea5e9;
          color: white;
        }
        
        .view-admins-btn:hover {
          background-color: #0284c7;
        }
        
        .edit-btn {
          background-color: #64748b;
          color: white;
        }
        
        .edit-btn:hover {
          background-color: #475569;
        }
        
        .pagination {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .pagination button {
          padding: 8px 16px;
          border: 1px solid #e2e8f0;
          background-color: white;
          border-radius: 6px;
          cursor: pointer;
        }
        
        .pagination button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .page-numbers {
          display: flex;
          gap: 8px;
        }
        
        .page-numbers button {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }
        
        .page-numbers button.active {
          background-color: #0ea5e9;
          color: white;
          border-color: #0ea5e9;
        }
      `}</style>
    </div>
  );
}