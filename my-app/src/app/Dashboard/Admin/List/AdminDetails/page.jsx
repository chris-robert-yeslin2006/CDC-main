'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './Admin.module.css'
import ProtectedRoute from '../../../components/ProtectedRoute'

export default function AdminDetailsPage() {
  const [admins, setAdmins] = useState([])
  const [orgName, setOrgName] = useState('')
  const [editingAdmin, setEditingAdmin] = useState(null)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const searchParams = useSearchParams()
  const orgId = searchParams.get('page')

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await fetch(`http://localhost:8000/admin/list?org_id=${orgId}`)
        const data = await res.json()
        setAdmins(data.admins)
        if (data.admins.length > 0) {
          setOrgName(data.admins[0].organizations?.name || 'Unknown Organization')
        }
      } catch (error) {
        console.error('Fetch error:', error)
        alert('Error loading admins')
      }
    }

    if (orgId) fetchAdmins()
  }, [orgId])

  const handleDelete = async (adminId) => {
    if (confirm('Are you sure you want to delete this admin?')) {
      try {
        const res = await fetch(`http://localhost:8000/admin/delete/${adminId}`, {
          method: 'DELETE'
        })
        
        if (res.ok) {
          setAdmins(admins.filter(admin => admin.id !== adminId))
          alert('Admin deleted successfully')
        } else {
          const errorData = await res.json()
          alert(errorData.detail || 'Failed to delete admin')
        }
      } catch (error) {
        console.error('Delete error:', error)
        alert('Error deleting admin')
      }
    }
  }

  // Helper function to initialize admin data to avoid undefined values
  const prepareEditingAdmin = (admin) => {
    return {
      id: admin.id,
      name: admin.name || '',
      email: admin.email || '',
      role: admin.role || '',
      contact: admin.contact || '',
      language: admin.language || 'English'
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    if (password && password !== confirmPassword) {
      alert("Passwords don't match")
      return
    }

    try {
      const updateData = {
        name: editingAdmin.name,
        email: editingAdmin.email,
        role: editingAdmin.role,
        contact: editingAdmin.contact,
        language: editingAdmin.language
      }

      if (password) updateData.password = password

      const res = await fetch(`http://localhost:8000/admin/update/${editingAdmin.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      })
      
      if (res.ok) {
        const updatedAdmin = await res.json()
        setAdmins(admins.map(admin => 
          admin.id === editingAdmin.id ? { ...admin, ...updatedAdmin.data[0] } : admin
        ))
        setEditingAdmin(null)
        setPassword('')
        setConfirmPassword('')
        alert('Admin updated successfully')
      } else {
        const errorData = await res.json()
        alert(errorData.detail || 'Failed to update admin')
      }
    } catch (error) {
      console.error('Update error:', error)
      alert('Error updating admin')
    }
  }

  return (
    <ProtectedRoute>
      <div className={styles.contentContainer}>
        <div className={styles.adminHeader}>
          <div>
            <h1 className={styles.pageTitle}>Admin Management</h1>
            {orgName && (
              <p className={styles.pageDescription}>
                Managing admins for: <strong>{orgName}</strong>
              </p>
            )}
          </div>
        </div>

        {admins.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3>No Admins Found</h3>
            <p>This organization currently has no administrators</p>
          </div>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Language</th>
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map(admin => (
                  <tr key={admin.id}>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                    <td>{admin.role}</td>
                    <td>{admin.language}</td>
                    <td>{admin.contact}</td>
                    <td className={styles.actionsCell}>
                      <button 
                        onClick={() => setEditingAdmin(prepareEditingAdmin(admin))}
                        className={`${styles.actionButton} ${styles.editButton}`}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(admin.id)}
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Edit Admin Modal */}
        {editingAdmin && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
              <div className={styles.modalHeader}>
                <h2>Edit Administrator</h2>
                <button 
                  onClick={() => {
                    setEditingAdmin(null)
                    setPassword('')
                    setConfirmPassword('')
                  }} 
                  className={styles.modalClose}
                >
                  &times;
                </button>
              </div>
              <form onSubmit={handleUpdate} className={styles.modalForm}>
                <div className={styles.formGroup}>
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={editingAdmin.name}
                    onChange={(e) => setEditingAdmin({...editingAdmin, name: e.target.value})}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={editingAdmin.email}
                    onChange={(e) => setEditingAdmin({...editingAdmin, email: e.target.value})}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Role/Position</label>
                  <input
                    type="text"
                    value={editingAdmin.role}
                    onChange={(e) => setEditingAdmin({...editingAdmin, role: e.target.value})}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Contact Information</label>
                  <input
                    type="text"
                    value={editingAdmin.contact}
                    onChange={(e) => setEditingAdmin({...editingAdmin, contact: e.target.value})}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Preferred Language</label>
                  <select
                    value={editingAdmin.language}
                    onChange={(e) => setEditingAdmin({...editingAdmin, language: e.target.value})}
                    required
                  >
                    <option value="English">English</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Mandarin">Mandarin</option>
                    <option value="German">German</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>New Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Leave blank to keep current"
                  />
                </div>

                {password && (
                  <div className={styles.formGroup}>
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                    />
                  </div>
                )}

                <div className={styles.formActions}>
                  <button 
                    type="button" 
                    className={styles.cancelButton}
                    onClick={() => {
                      setEditingAdmin(null)
                      setPassword('')
                      setConfirmPassword('')
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className={styles.saveButton}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}