import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../api.js'
import { useAuth } from '../hooks/useAuth.jsx'
import StatusBanner from './StatusBanner.jsx'
import { formatMoney } from '../utils/format.js'

const OrdersPage = () => {
  const { auth, isAuthed } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const fetchOrders = async () => {
    if (!auth?.userId) return
    setLoading(true)
    setError('')
    try {
      const data = await apiFetch(`/orders/history/${auth.userId}`, {}, auth.token)
      setOrders(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthed) {
      fetchOrders()
    }
  }, [isAuthed])

  const reorder = async (orderId) => {
    setSuccess('')
    setError('')
    try {
      await apiFetch(`/orders/reorder/${orderId}`, { method: 'POST' }, auth.token)
      setSuccess('Reorder placed.')
      fetchOrders()
    } catch (err) {
      setError(err.message)
    }
  }

  if (!isAuthed) {
    return (
      <section className="page">
        <h2>Orders</h2>
        <p>Log in to review your order history.</p>
        <button className="primary" onClick={() => navigate('/login')}>Log in</button>
      </section>
    )
  }

  return (
    <section className="page">
      <h2>Order history</h2>
      <StatusBanner tone="error" message={error} />
      <StatusBanner tone="success" message={success} />
      {loading ? (
        <div className="loading">Loading orders...</div>
      ) : orders.length ? (
        <div className="grid">
          {orders.map((order) => (
            <article key={order.orderId} className="card">
              <h3>{order.productName}</h3>
              <div className="muted">{new Date(order.orderDate).toLocaleString()}</div>
              <div className="pill-row">
                <span className="pill">Qty: {order.quantity}</span>
                <span className="pill">{formatMoney(order.totalPrice)}</span>
              </div>
              <p className="muted">{order.confirmationMessage}</p>
              <button className="ghost" type="button" onClick={() => reorder(order.orderId)}>
                Reorder
              </button>
            </article>
          ))}
        </div>
      ) : (
        <div className="panel empty">No orders yet.</div>
      )}
    </section>
  )
}

export default OrdersPage
