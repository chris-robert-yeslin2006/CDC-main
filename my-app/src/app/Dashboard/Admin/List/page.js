'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import '../Admin.css'

export default function AdminListPage() {
  const [organizations, setOrganizations] = useState([])

  useEffect(() => {
    const fetchOrganizations = async () => {
      const res = await fetch('http://localhost:8000/organization/list')
      const data = await res.json()
      setOrganizations(data.organizations)
    }

    fetchOrganizations()
  }, [])

  return (
    <div className="content-container">
      <h1 className="page-title">Organizations</h1>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Organization</th>
              <th>Ambassador</th>
              <th className="actions-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {organizations.map(org => (
              <tr key={org.id}>
                <td className="org-name">{org.name}</td>
                <td>{org.ambassador_name}</td>
                <td className="actions-cell">
                  <Link href={`/Admin/List/AdminDetails?page=${org.id}`}>
                    <button className="edit-button">View Admins</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
