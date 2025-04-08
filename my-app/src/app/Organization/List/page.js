'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Trash2, Edit, ChevronDown } from 'lucide-react';
import '../organization.css';

export default function OrganizationList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/organization/list')
      .then(res => res.json())
      .then(data => {
        setOrganizations(data.organizations);
      })
      .catch(error => {
        console.error("Failed to fetch organizations:", error);
      });
  }, []);

  const handleDelete = (id) => {
    // This only deletes from UI for now.
    setOrganizations(organizations.filter(org => org.id !== id));
  };

  const filteredOrganizations = organizations.filter(org => 
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.ambassador_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function SidebarItemDropdown({ text, children, active }) {
    const [isOpen, setIsOpen] = useState(active);
    
    return (
      <div className="sidebar-dropdown">
        <button 
          className={`sidebar-dropdown-toggle ${active ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {text}
          <ChevronDown size={16} className={`dropdown-icon ${isOpen ? 'open' : ''}`} />
        </button>
        {isOpen && <div className="sidebar-dropdown-content">{children}</div>}
      </div>
    );
  }

  function SidebarItem({ text, active }) {
    return (
      <Link
        href="#" 
        className={`sidebar-item ${active ? 'active' : ''}`}
      >
        {text}
      </Link>
    );
  }
  
  function SidebarSubItem({ text, href, active }) {
    return (
      <Link 
        href={href || '#'} 
        className={`sidebar-subitem ${active ? 'active' : ''}`}
      >
        {text}
      </Link>
    );
  }

  return (
    <div className="layout-container">
      <div className="main-content">
        <div className="content-container">
          <h1 className="page-title">Organizations</h1>
          
          {/* Search */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search organizations..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="search-icon" size={18} />
          </div>
          
          {/* Table */}
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>S. No</th>
                  <th>Organization Name</th>
                  <th>Ambassador Contact</th>
                  <th className="actions-header">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrganizations.map((org, index) => (
                  <tr key={org.id}>
                    <td>{index + 1}</td>
                    <td className="org-name">{org.name}</td>
                    <td>{org.ambassador_contact}</td>
                    <td className="actions-cell">
                      <button 
                        className="delete-button"
                        onClick={() => handleDelete(org.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                      <Link href={`/organizations/edit/${org.id}`} className="edit-button">
                        <Edit size={18} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
