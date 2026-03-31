import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../api.js'
import { useAuth } from '../hooks/useAuth.jsx'
import StatusBanner from './StatusBanner.jsx'
import { formatMoney } from '../utils/format.js'

const CatalogPage = () => {
  const { auth, isAuthed } = useAuth()
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [keyword, setKeyword] = useState('')
  const [brand, setBrand] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [quantityById, setQuantityById] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const fetchCategories = async () => {
    const data = await apiFetch('/categories')
    setCategories(data)
  }

  const fetchProducts = async () => {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams()
      if (keyword.trim()) params.append('keyword', keyword.trim())
      if (brand.trim()) params.append('brand', brand.trim())
      if (categoryId) params.append('categoryId', categoryId)

      const path = params.toString()
        ? `/products/search?${params.toString()}`
        : '/products'
      const data = await apiFetch(path)
      setProducts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
    fetchProducts()
  }, [])

  const handleFilter = (event) => {
    event.preventDefault()
    fetchProducts()
  }

  const updateQuantity = (productId, value) => {
    setQuantityById((prev) => ({
      ...prev,
      [productId]: value
    }))
  }

  const addToCart = async (productId) => {
    if (!isAuthed) {
      navigate('/login')
      return
    }
    const qty = Number(quantityById[productId] || 1)
    setSuccess('')
    setError('')
    try {
      await apiFetch(
        '/cart/items',
        {
          method: 'POST',
          body: JSON.stringify({
            userId: auth.userId,
            productId,
            quantity: qty
          })
        },
        auth.token
      )
      setSuccess('Added to cart.')
    } catch (err) {
      setError(err.message)
    }
  }

  const buyNow = async (productId) => {
    if (!isAuthed) {
      navigate('/login')
      return
    }
    const qty = Number(quantityById[productId] || 1)
    setSuccess('')
    setError('')
    try {
      await apiFetch(
        '/orders',
        {
          method: 'POST',
          body: JSON.stringify({
            userId: auth.userId,
            productId,
            quantity: qty
          })
        },
        auth.token
      )
      setSuccess('Order placed. Check Orders for details.')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="page">
      <div className="hero">
        <div>
          <h1>Curated retail with live inventory.</h1>
          <p>Search by brand, browse categories, and place orders with confidence.</p>
        </div>
        <div className="hero-card">
          <h3>Fast filters</h3>
          <p>Use keyword, brand, or category to refine instantly.</p>
        </div>
      </div>

      <form className="filters" onSubmit={handleFilter}>
        <input
          type="text"
          placeholder="Search products"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(event) => setBrand(event.target.value)}
        />
        <select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
        >
          <option value="">All categories</option>
          {categories.map((cat) => (
            <option key={cat.categoryId} value={cat.categoryId}>
              {cat.categoryName}
            </option>
          ))}
        </select>
        <button type="submit" className="primary">Apply</button>
      </form>

      <StatusBanner tone="error" message={error} />
      <StatusBanner tone="success" message={success} />

      {loading ? (
        <div className="loading">Loading products...</div>
      ) : (
        <div className="grid">
          {products.map((product) => (
            <article key={product.productId} className="card">
              <div className="card-header">
                <h3>{product.name}</h3>
                <span className="muted">{product.brand}</span>
              </div>
              <div className="pill-row">
                <span className="pill">{product.packaging}</span>
                <span className="pill">Stock: {product.stockQuantity}</span>
              </div>
              <div className="price">{formatMoney(product.price)}</div>
              <div className="card-actions">
                <input
                  type="number"
                  min="1"
                  value={quantityById[product.productId] || 1}
                  onChange={(event) => updateQuantity(product.productId, event.target.value)}
                />
                <button className="ghost" type="button" onClick={() => addToCart(product.productId)}>
                  Add to cart
                </button>
                <button className="primary" type="button" onClick={() => buyNow(product.productId)}>
                  Buy now
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default CatalogPage
