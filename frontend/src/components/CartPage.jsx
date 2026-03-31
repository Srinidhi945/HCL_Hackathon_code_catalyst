import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../api.js'
import { useAuth } from '../hooks/useAuth.jsx'
import StatusBanner from './StatusBanner.jsx'
import { formatMoney } from '../utils/format.js'

const CartPage = () => {
  const { auth, isAuthed } = useAuth()
  const navigate = useNavigate()
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const fetchCart = async () => {
    if (!auth?.userId) return
    setLoading(true)
    setError('')
    try {
      const data = await apiFetch(`/cart/${auth.userId}`, {}, auth.token)
      setCart(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthed) {
      fetchCart()
    }
  }, [isAuthed])

  const updateItem = async (cartItemId, quantity) => {
    setError('')
    try {
      const data = await apiFetch(
        `/cart/items/${cartItemId}`,
        {
          method: 'PUT',
          body: JSON.stringify({ quantity })
        },
        auth.token
      )
      setCart(data)
    } catch (err) {
      setError(err.message)
    }
  }

  const removeItem = async (cartItemId) => {
    setError('')
    try {
      const data = await apiFetch(
        `/cart/items/${cartItemId}`,
        { method: 'DELETE' },
        auth.token
      )
      setCart(data)
    } catch (err) {
      setError(err.message)
    }
  }

  const checkout = async () => {
    setSuccess('')
    setError('')
    try {
      const data = await apiFetch(`/cart/checkout/${auth.userId}`, { method: 'POST' }, auth.token)
      setCart({ ...cart, items: [], grandTotal: 0 })
      setSuccess(`Checkout complete: ${data.totalItems} items for ${formatMoney(data.totalAmount)}`)
    } catch (err) {
      setError(err.message)
    }
  }

  if (!isAuthed) {
    return (
      <section className="page">
        <h2>Cart</h2>
        <p>Log in to view your cart.</p>
        <button className="primary" onClick={() => navigate('/login')}>Log in</button>
      </section>
    )
  }

  return (
    <section className="page">
      <h2>Your cart</h2>
      <StatusBanner tone="error" message={error} />
      <StatusBanner tone="success" message={success} />
      {loading ? (
        <div className="loading">Loading cart...</div>
      ) : cart?.items?.length ? (
        <div className="panel">
          {cart.items.map((item) => (
            <div key={item.cartItemId} className="cart-row">
              <div>
                <strong>{item.productName}</strong>
                <div className="muted">Unit: {formatMoney(item.unitPrice)}</div>
              </div>
              <div className="cart-controls">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(event) => updateItem(item.cartItemId, Number(event.target.value))}
                />
                <span>{formatMoney(item.lineTotal)}</span>
                <button className="ghost" type="button" onClick={() => removeItem(item.cartItemId)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <span>Grand total</span>
            <strong>{formatMoney(cart.grandTotal)}</strong>
          </div>
          <button className="primary" onClick={checkout}>Checkout</button>
        </div>
      ) : (
        <div className="panel empty">Your cart is empty.</div>
      )}
    </section>
  )
}

export default CartPage
