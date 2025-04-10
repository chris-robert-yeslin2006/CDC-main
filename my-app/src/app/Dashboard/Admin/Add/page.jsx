'use client'

import { useEffect, useState } from "react";
import '../Admin.css';

export default function AddAdmin() {
  const [formData, setFormData] = useState({
    name: '',
    org_name: '',
    role: '',
    contact: '',
    language: '',
  });

  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    // Fetch all organization names
    fetch('http://localhost:8000/organization/list')
      .then(res => res.json())
      .then(data => {
        setOrgs(data.organizations);
      })
      .catch(err => {
        console.error("Failed to fetch organizations", err);
        alert("Could not load organizations");
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8000/admin/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Failed to add admin');

      const data = await res.json();
      console.log('Admin added:', data);
      alert("Admin added successfully");

      setFormData({
        name: '',
        org_name: '',
        role: '',
        contact: '',
        language: '',
      });

    } catch (error) {
      console.error(error);
      alert("Failed to add admin");
    }
  };

  return (
    <div className="layout-container">
      <div className="main-content">
        <div className="content-container">
          <h1 className="page-title">Add Admin</h1>
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-fields">

                <div className="form-field">
                  <label className="form-label">Admin Name</label>
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
                  <label className="form-label">Organization</label>
                  <select
                    name="org_name"
                    value={formData.org_name}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select Organization</option>
                    {orgs.map((org) => (
                      <option key={org.id} value={org.name}>
                        {org.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label className="form-label">Role</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-field">
                  <label className="form-label">Contact</label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-field">
                  <label className="form-label">Language</label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select Language</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Mandarin">Mandarin</option>
                    <option value="German">German</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="English">English</option>
                  </select>
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-button">
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
