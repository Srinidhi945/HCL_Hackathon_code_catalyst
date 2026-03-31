import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import StatusBanner from './StatusBanner.jsx'

const RegisterPage = () => {
  const { register, loading, error } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    role: 'CUSTOMER',
    password: ''
  })
  const [success, setSuccess] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSuccess('')
    try {
      await register(form)
      setSuccess('Account created. Redirecting...')
      setTimeout(() => navigate('/'), 500)
    } catch (err) {
      setSuccess('')
    }
  }

  return (
    <section className="page split">
      <div>
        <h2>Create your access</h2>
        <p>Choose a role and start managing inventory or placing orders.</p>
      </div>
      <form className="panel" onSubmit={handleSubmit}>
        <h3>Register</h3>
        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Address
          <input name="address" value={form.address} onChange={handleChange} required />
        </label>
        <label>
          Role
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="CUSTOMER">Customer</option>
          
            <option value="ADMIN">Admin</option>
          </select>
        </label>
        <label>
          Password
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </label>
        <button className="primary" type="submit" disabled={loading}>Create account</button>
        <StatusBanner tone="success" message={success} />
        <StatusBanner tone="error" message={error} />
      </form>
    </section>
  )
}

export default RegisterPage
