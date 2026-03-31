import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import StatusBanner from './StatusBanner.jsx'

const LoginPage = () => {
  const { login, loading, error } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSuccess('')
    try {
      await login(email, password)
      setSuccess('Welcome back!')
      setTimeout(() => navigate('/'), 400)
    } catch (err) {
      setSuccess('')
    }
  }

  return (
    <section className="page split">
      <div>
        <h2>Welcome back</h2>
        <p>Log in to manage your cart and track orders.</p>
      </div>
      <form className="panel" onSubmit={handleSubmit}>
        <h3>Login</h3>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button className="primary" type="submit" disabled={loading}>Log in</button>
        <StatusBanner tone="success" message={success} />
        <StatusBanner tone="error" message={error} />
      </form>
    </section>
  )
}

export default LoginPage
