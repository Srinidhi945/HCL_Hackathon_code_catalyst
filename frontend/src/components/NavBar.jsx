import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import RoleBadge from './RoleBadge.jsx'

const NavBar = () => {
  const { auth, logout, isAuthed } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="nav">
      <div className="brand" onClick={() => navigate('/')}>Retail Hub</div>
      <nav>
        <NavLink to="/" end>Catalog</NavLink>
        <NavLink to="/cart">Cart</NavLink>
        <NavLink to="/orders">Orders</NavLink>
        {(auth?.role === 'ADMIN' || auth?.role === 'MANAGER') && (
          <NavLink to="/admin">Admin</NavLink>
        )}
      </nav>
      <div className="auth-chip">
        {isAuthed ? (
          <>
            <div>
              <span className="muted">Signed in as</span>
              <strong>{auth.name}</strong>
            </div>
            <RoleBadge role={auth.role} />
            <button className="ghost" onClick={handleLogout}>Log out</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register" className="pill">Get started</NavLink>
          </>
        )}
      </div>
    </header>
  )
}

export default NavBar
