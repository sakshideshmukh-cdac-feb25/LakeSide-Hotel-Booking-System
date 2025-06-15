import React from "react"
import { Link } from "react-router-dom"
import "./admin.css"

const Admin = () => {
  return (
    <section className="manage-container">
      <h2>Welcome to Admin Panel</h2>
      <hr />

      <div className="cards-grid">
        <div className="card">
          <h3>Manage Rooms</h3>
          <p>View, add, edit, or delete rooms.</p>
          <Link to="/existing-rooms" className="action-button edit">
            Go to Rooms
          </Link>
        </div>

        <div className="card">
          <h3>Manage Bookings</h3>
          <p>Check and manage all bookings.</p>
          <Link to="/existing-bookings" className="action-button edit">
            Go to Bookings
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Admin
