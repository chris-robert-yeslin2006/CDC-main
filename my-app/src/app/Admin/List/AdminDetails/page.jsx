'use client'

import { useState } from 'react';

export default function AdminList({ organizationId }) {
  // State to track which admin's languages dropdown is open
  const [openLanguagesAdmin, setOpenLanguagesAdmin] = useState(null);
  
  // Example data - replace with your actual data fetching logic
  const admins = [
    { 
      id: 1, 
      name: 'John Doe', 
      role: 'Super Admin',
      contact: '+1 (555) 123-4567',
      language: 'English'
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      role: 'Content Admin',
      contact: '+1 (555) 987-6543',
      language: 'Spanish'
    },
    { 
      id: 3, 
      name: 'Robert Johnson', 
      role: 'Support Admin',
      contact: '+1 (555) 456-7890',
      language: 'French'
    },
    { 
      id: 4, 
      name: 'Maria Garcia', 
      role: 'Regional Admin',
      contact: '+1 (555) 234-5678',
      language: 'German'
    }
  ];
  
  // Toggle languages dropdown for an admin
  const toggleLanguages = (adminId, e) => {
    e.stopPropagation(); // Prevent triggering row click handler
    setOpenLanguagesAdmin(openLanguagesAdmin === adminId ? null : adminId);
  };
  
  // Handle edit admin
  const handleEdit = (adminId, e) => {
    e.stopPropagation(); // Prevent triggering row click handler
    console.log(`Edit admin ${adminId}`);
    // Add your edit logic here
  };
  
  // Handle delete admin
  const handleDelete = (adminId, e) => {
    e.stopPropagation(); // Prevent triggering row click handler
    console.log(`Delete admin ${adminId}`);
    // Add your delete logic here
  };
  
  return (
    <div className="admin-list-container">
      <h2>Admins for Organization {organizationId}</h2>
      
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(admin => (
              <tr key={admin.id}>
                <td className="name-cell">
                  <div className="admin-name-container">
                    <div className="admin-name-row">
                      <span>{admin.name}</span>
                      <button 
                        className="language-toggle"
                        onClick={(e) => toggleLanguages(admin.id, e)}
                      >
                        {openLanguagesAdmin === admin.id ? '▼' : '▶'}
                      </button>
                    </div>
                    
                    {openLanguagesAdmin === admin.id && (
                      <div className="language-dropdown">
                        <span className="language-label">Language:</span>
                        <span className="language-value">{admin.language}</span>
                      </div>
                    )}
                  </div>
                </td>
                <td>{admin.role}</td>
                <td>{admin.contact}</td>
                <td className="actions">
                  <button 
                    className="edit-btn"
                    onClick={(e) => handleEdit(admin.id, e)}
                  >
                    Edit
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={(e) => handleDelete(admin.id, e)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <style jsx>{`
        .admin-list-container {
          padding: 24px;
          background-color: #f8fafc;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          height:99vh;
        }
        
        h2 {
          margin-top: 0;
          color: #1e293b;
          font-size: 24px;
          margin-bottom: 24px;
        }
        
        .table-container {
          overflow-x: auto;
        }
        
        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .admin-table th {
          text-align: left;
          padding: 12px 16px;
          background-color: #e2e8f0;
          color: #475569;
          font-weight: 600;
        }
        
        .admin-table td {
          padding: 12px 16px;
          border-bottom: 1px solid #e2e8f0;
          vertical-align: top;
        }
        
        .name-cell {
          padding-bottom: 8px;
        }
        
        .admin-name-container {
          display: flex;
          flex-direction: column;
        }
        
        .admin-name-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .language-toggle {
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          font-size: 12px;
          padding: 2px 6px;
          border-radius: 4px;
        }
        
        .language-toggle:hover {
          background-color: #e2e8f0;
        }
        
        .language-dropdown {
          margin-top: 8px;
          padding: 8px 12px;
          background-color: #f1f5f9;
          border-radius: 4px;
          font-size: 14px;
          animation: fadeIn 0.2s ease-out;
        }
        
        .language-label {
          font-weight: 500;
          color: #64748b;
          margin-right: 8px;
        }
        
        .language-value {
          color: #334155;
          font-weight: 500;
        }
        
        .actions {
          display: flex;
          gap: 8px;
        }
        
        .edit-btn, .delete-btn {
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          border: none;
        }
        
        .edit-btn {
          background-color: #0ea5e9;
          color: white;
        }
        
        .edit-btn:hover {
          background-color: #0284c7;
        }
        
        .delete-btn {
          background-color: #ef4444;
          color: white;
        }
        
        .delete-btn:hover {
          background-color: #dc2626;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}