'use client'

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from 'lucide-react';
import '../organization.css';

export default function AddOrganization() {
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

  const [formData, setFormData] = useState({
    name: '',
    head: '',
    ambassadorName: '',
    ambassadorContact: '',
    organizationContact: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const payload = {
      name: formData.name,
      head: formData.head,
      ambassador_name: formData.ambassadorName,
      ambassador_contact: formData.ambassadorContact,
      contact: formData.organizationContact
    };

    try {
      const res = await fetch('http://localhost:8000/organization/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || 'Failed to add organization');
      }

      setMessage('✅ Organization added successfully!');
      setFormData({
        name: '',
        head: '',
        ambassadorName: '',
        ambassadorContact: '',
        organizationContact: ''
      });
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    }
  };

  return (
    <div className="layout-container">
      {/* Main Content */}
      <div className="main-content">
        <div className="content-container">
          <h1 className="page-title">Add Organization</h1>

          {message && (
            <div className="mb-4 text-center font-medium">
              {message}
            </div>
          )}

          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-fields">
                <div className="form-field">
                  <label className="form-label">Organization Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-field">
                  <label className="form-label">Organization Head</label>
                  <input
                    type="text"
                    name="head"
                    value={formData.head}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-field">
                  <label className="form-label">Ambassador Name</label>
                  <input
                    type="text"
                    name="ambassadorName"
                    value={formData.ambassadorName}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-field">
                  <label className="form-label">Ambassador Contact</label>
                  <input
                    type="text"
                    name="ambassadorContact"
                    value={formData.ambassadorContact}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-field">
                  <label className="form-label">Organization Contact</label>
                  <input
                    type="text"
                    name="organizationContact"
                    value={formData.organizationContact}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="submit-button"
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
