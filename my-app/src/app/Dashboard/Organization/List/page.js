'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Trash2, Edit, X, ArrowUpDown } from 'lucide-react';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function OrganizationList() {
  const [organizations, setOrganizations] = useState([]);
  const [editingOrg, setEditingOrg] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const statusOptions = [
    { value: 'onboard', label: 'Onboard' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'standby', label: 'Standby' },
    { value: 'under verification', label: 'Under Verification' },
    { value: 'verified', label: 'Verified' }
  ];

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const res = await fetch('http://localhost:8000/organization/list');
      const data = await res.json();
      setOrganizations(data.organizations);
    } catch (error) {
      console.error("Failed to fetch organizations:", error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this organization?')) {
      try {
        const res = await fetch(`http://localhost:8000/organization/delete/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          fetchOrganizations();
        } else {
          alert('Delete failed');
        }
      } catch (error) {
        console.error("Failed to delete organization:", error);
        alert('Delete failed due to network error');
      }
    }
  };

  const handleEditClick = (org) => {
    setEditingOrg(org);
  };

  const handleChange = (e) => {
    setEditingOrg({ ...editingOrg, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log("Updating organization:", editingOrg);
      const res = await fetch(`http://localhost:8000/organization/update/${editingOrg.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingOrg),
      });

      if (res.ok) {
        setEditingOrg(null);
        fetchOrganizations();
      } else {
        const errorData = await res.json();
        console.error("Update failed:", errorData);
        alert(`Update failed: ${errorData.detail || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Failed to update organization:", error);
      alert('Update failed due to network error');
    }
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'onboard':
        return 'status-badge bg-blue-100 text-blue-800';
      case 'contacted':
        return 'status-badge bg-yellow-100 text-yellow-800';
      case 'standby':
        return 'status-badge bg-gray-100 text-gray-800';
      case 'under verification':
        return 'status-badge bg-orange-100 text-orange-800';
      case 'verified':
        return 'status-badge bg-green-100 text-green-800';
      default:
        return 'status-badge bg-gray-100 text-gray-800';
    }
  };

  const handleSort = (field) => {
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);
  };

  const filteredOrganizations = organizations
    .filter(org => 
      org.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.ambassador_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.head?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.contact?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.status?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const fieldA = a[sortField] || '';
      const fieldB = b[sortField] || '';
      
      if (sortDirection === 'asc') {
        return fieldA.localeCompare(fieldB);
      } else {
        return fieldB.localeCompare(fieldA);
      }
    });

  return (
    <ProtectedRoute>
    <div className="layout-container">
      <div className="main-content">
        <div className="content-container">
          <h1 className="page-title">Organizations</h1>
          
          {/* Search */}
          <div className="search-container">
            <div className="search-input-wrapper">
              <div className="icon-wrapper">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search organizations..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Table */}
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>S. No</th>
                  <th onClick={() => handleSort('name')} className="sortable-header">
                    <div className="header-content">
                      Organization Name
                      <ArrowUpDown size={14} className="sort-icon" />
                    </div>
                  </th>
                  <th onClick={() => handleSort('head')} className="sortable-header">
                    <div className="header-content">
                      Head
                      <ArrowUpDown size={14} className="sort-icon" />
                    </div>
                  </th>
                  <th>Contact</th>
                  <th onClick={() => handleSort('status')} className="sortable-header">
                    <div className="header-content">
                      Status
                      <ArrowUpDown size={14} className="sort-icon" />
                    </div>
                  </th>
                  <th className="actions-header">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrganizations.map((org, index) => (
                  <tr key={org.id}>
                    <td>{index + 1}</td>
                    <td className="org-name">{org.name}</td>
                    <td>{org.head}</td>
                    <td>{org.contact}</td>
                    <td>
                      {/* Replaced dropdown with simple colored status badge */}
                      <span className={getStatusBadgeClass(org.status || 'onboard')}>
                        {org.status || 'onboard'}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button 
                        className="edit-button"
                        onClick={() => handleEditClick(org)}
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        className="delete-button"
                        onClick={() => handleDelete(org.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredOrganizations.length === 0 && (
                  <tr>
                    <td colSpan="6" className="empty-table">
                      No organizations found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Organization Modal */}
      {editingOrg && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2 className="modal-title">Edit Organization</h2>
              <button
                onClick={() => setEditingOrg(null)}
                className="modal-close"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleUpdate} className="modal-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Organization Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={editingOrg.name || ''}
                    onChange={handleChange}
                    placeholder="Organization Name"
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="head">Head</label>
                  <input
                    id="head"
                    type="text"
                    name="head"
                    value={editingOrg.head || ''}
                    onChange={handleChange}
                    placeholder="Head"
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="ambassador_name">Ambassador Name</label>
                  <input
                    id="ambassador_name"
                    type="text"
                    name="ambassador_name"
                    value={editingOrg.ambassador_name || ''}
                    onChange={handleChange}
                    placeholder="Ambassador Name"
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="ambassador_contact">Ambassador Contact</label>
                  <input
                    id="ambassador_contact"
                    type="text"
                    name="ambassador_contact"
                    value={editingOrg.ambassador_contact || ''}
                    onChange={handleChange}
                    placeholder="Ambassador Contact"
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="contact">Contact</label>
                  <input
                    id="contact"
                    type="text"
                    name="contact"
                    value={editingOrg.contact || ''}
                    onChange={handleChange}
                    placeholder="Contact"
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={editingOrg.email || ''}
                    onChange={handleChange}
                    placeholder="Email"
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={editingOrg.password || ''}
                    onChange={handleChange}
                    placeholder="Password"
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={editingOrg.status || 'onboard'}
                    onChange={handleChange}
                    className="form-input"
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => setEditingOrg(null)}
                  className="cancel-button"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="save-button"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Layout */
        .layout-container {
          display: flex;
          min-height: 100vh;
          background-color: #f8f9fb;
        }

        .main-content {
          flex: 1;
          padding: 30px;
        }

        .content-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Typography */
        .page-title {
          font-size: 1.8rem;
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 1.5rem;
        }

        /* Search */
        .search-container {
          margin-bottom: 1.5rem;
        }

        .search-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
        }

        .icon-wrapper {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #a0aec0;
          z-index: 5;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .search-input {
          width: 100%;
          padding: 12px 16px;
          padding-left: 40px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background-color: white;
          font-size: 0.95rem;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #4299e1;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
        }

        /* Table */
        .table-container {
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          overflow: hidden;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table th,
        .data-table td {
          padding: 16px;
          text-align: left;
          border-bottom: 1px solid #edf2f7;
        }

        .data-table th {
          background-color: #f8fafc;
          font-weight: 600;
          color: #4a5568;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .sortable-header {
          cursor: pointer;
          user-select: none;
        }

        .sortable-header:hover {
          background-color: #f1f5f9;
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .sort-icon {
          opacity: 0.6;
          transition: all 0.2s ease;
        }

        .sortable-header:hover .sort-icon {
          opacity: 1;
        }

        .data-table tbody tr:hover {
          background-color: #f8fafd;
        }

        .data-table tr:last-child td {
          border-bottom: none;
        }

        .org-name {
          font-weight: 500;
          color: #2d3748;
        }

        .actions-header {
          text-align: center;
          width: 120px;
        }

        .actions-cell {
          display: flex;
          justify-content: center;
          gap: 8px;
        }

        .edit-button,
        .delete-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .edit-button {
          background-color: #ebf5ff;
          color: #3182ce;
        }

        .edit-button:hover {
          background-color: #bee3f8;
        }

        .delete-button {
          background-color: #fff5f5;
          color: #e53e3e;
        }

        .delete-button:hover {
          background-color: #fed7d7;
        }

        .empty-table {
          text-align: center;
          padding: 40px 0;
          color: #718096;
          font-style: italic;
        }

        /* Status Badge */
        .status-badge {
          display: inline-block;
          padding: 6px 10px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: capitalize;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
          backdrop-filter: blur(2px);
          padding: 20px;
        }

        .modal-container {
          background-color: white;
          border-radius: 10px;
          width: 100%;
          max-width: 700px;
          max-height: 90vh;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          animation: modalEnter 0.3s ease;
        }

        @keyframes modalEnter {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #edf2f7;
        }

        .modal-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #2d3748;
          margin: 0;
        }

        .modal-close {
          background: none;
          border: none;
          color: #718096;
          cursor: pointer;
          padding: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.2s ease;
        }

        .modal-close:hover {
          background-color: #f7fafc;
          color: #4a5568;
        }

        .modal-form {
          padding: 24px;
          overflow-y: auto;
          max-height: calc(90vh - 80px); /* Adjusted to prevent scrolling */
        }

        /* Grid layout for the form */
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #4a5568;
          font-size: 0.95rem;
        }

        .form-input {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 1rem;
          transition: all 0.2s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: #4299e1;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 24px;
          grid-column: span 2;
        }

        .cancel-button {
          background-color: #edf2f7;
          color: #4a5568;
          padding: 10px 16px;
          border: none;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cancel-button:hover {
          background-color: #e2e8f0;
        }

        .save-button {
          background-color: #4299e1;
          color: white;
          padding: 10px 16px;
          border: none;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .save-button:hover {
          background-color: #3182ce;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .main-content {
            padding: 20px;
          }
          
          .data-table th,
          .data-table td {
            padding: 12px;
          }

          .modal-container {
            max-width: 90%;
          }
          
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .form-actions {
            grid-column: span 1;
          }
        }

        @media (max-width: 640px) {
          .page-title {
            font-size: 1.4rem;
          }
          
          .data-table {
            font-size: 0.9rem;
          }
          
          .data-table th:nth-child(3),
          .data-table td:nth-child(3) {
            display: none;
          }
        }
      `}</style>
    </div>
    </ProtectedRoute>
  );
}