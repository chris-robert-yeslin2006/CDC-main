'use client'

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from 'lucide-react';
import '../organization.css';
import ProtectedRoute from "../../components/ProtectedRoute";

export default function AddOrganization() {
  function SidebarItemDropdown({ text, children, active }) {
    const [isOpen, setIsOpen] = useState(active);
    return (
      <ProtectedRoute>
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
      </ProtectedRoute>
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
    organizationContact: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSubmitting(true);

    const payload = {
      name: formData.name,
      head: formData.head,
      ambassador_name: formData.ambassadorName,
      ambassador_contact: formData.ambassadorContact,
      contact: formData.organizationContact,
      email: formData.email,
      password: formData.password
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

      setMessage('success');
      setFormData({
        name: '',
        head: '',
        ambassadorName: '',
        ambassadorContact: '',
        organizationContact: ''
      });
    } catch (error) {
      setMessage(`error:${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
    <div className="layout-container">
      <div className="main-content">
        <div className="content-container">
          <div className="org-header">
            <h1 className="page-title">Add Organization</h1>
            <p className="page-description">Create a new organization profile in the system</p>
          </div>

          <div className="org-form-container">
            {message && (
              <div className={`notification-message ${message.startsWith('error') ? 'error' : 'success'}`}>
                {message.startsWith('error') ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <span>{message.substring(6)}</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span>Organization added successfully!</span>
                  </>
                )}
              </div>
            )}

            <div className="org-form-sections">
              <div className="org-form-section">
                <h2 className="section-title">Organization Information</h2>
                <div className="section-description">Enter the basic details of the organization</div>
                
                <div className="form-group">
                  <div className="form-field">
                    <label className="form-label">Organization Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter full organization name"
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
                      placeholder="Name of organization leader"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Organization Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Organization email address"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Create a secure password"
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
                      placeholder="Email or phone number"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-divider"></div>

              <div className="org-form-section">
                <h2 className="section-title">Ambassador Details</h2>
                <div className="section-description">Information about the organization's ambassador</div>
                
                <div className="form-group">
                  <div className="form-field">
                    <label className="form-label">Ambassador Name</label>
                    <input
                      type="text"
                      name="ambassadorName"
                      value={formData.ambassadorName}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Full name of ambassador"
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
                      placeholder="Email or phone number"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-divider"></div>

            <form onSubmit={handleSubmit} className="org-form">
              <div className="form-actions">
                
                <button 
                  type="submit" 
                  className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      <span>Processing...</span>
                    </>
                  ) : (
                    'Add Organization'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}