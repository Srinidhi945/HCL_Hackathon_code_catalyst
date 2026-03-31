import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../api.js'
import { useAuth } from '../hooks/useAuth.jsx'
import StatusBanner from './StatusBanner.jsx'

const AdminPage = () => {
  const { auth, isAuthed } = useAuth()
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [categoryName, setCategoryName] = useState('')
  const [productForm, setProductForm] = useState({
    name: '',
    brand: '',
    price: '',
    packaging: '',
    stockQuantity: '',
    categoryId: ''
  })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const fetchCategories = async () => {
    const data = await apiFetch('/categories')
    setCategories(data)
  }

  const fetchProducts = async () => {
    const data = await apiFetch('/products')
    setProducts(data)
  }

  useEffect(() => {
    fetchCategories()
    fetchProducts()
  }, [])

  if (!isAuthed) {
    return (
      <section className="page">
        <h2>Admin tools</h2>
        <p>Log in with an admin or manager role to access inventory controls.</p>
        <button className="primary" onClick={() => navigate('/login')}>Log in</button>
      </section>
    )
  }

  if (!(auth?.role === 'ADMIN' || auth?.role === 'MANAGER')) {
    return (
      <section className="page">
        <h2>Admin tools</h2>
        <p>You do not have access to this area.</p>
      </section>
    )
  }

  const createCategory = async (event) => {
    event.preventDefault()
    setMessage('')
    setError('')
    try {
      await apiFetch(
        '/categories',
        {
          method: 'POST',
          body: JSON.stringify({ categoryName })
        },
        auth.token
      )
      setCategoryName('')
      setMessage('Category created.')
      fetchCategories()
    } catch (err) {
      setError(err.message)
    }
  }

  const deleteCategory = async (categoryId) => {
    setMessage('')
    setError('')
    try {
      await apiFetch(
        `/categories/${categoryId}`,
        { method: 'DELETE' },
        auth.token
      )
      setMessage('Category deleted.')
      fetchCategories()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleProductChange = (event) => {
    const { name, value } = event.target
    setProductForm((prev) => ({ ...prev, [name]: value }))
  }

  const createProduct = async (event) => {
    event.preventDefault()
    setMessage('')
    setError('')
    try {
      await apiFetch(
        '/products',
        {
          method: 'POST',
          body: JSON.stringify({
            name: productForm.name,
            brand: productForm.brand,
            price: Number(productForm.price),
            packaging: productForm.packaging,
            stockQuantity: Number(productForm.stockQuantity),
            category: { categoryId: Number(productForm.categoryId) }
          })
        },
        auth.token
      )
      setProductForm({
        name: '',
        brand: '',
        price: '',
        packaging: '',
        stockQuantity: '',
        categoryId: ''
      })
      setMessage('Product created.')
      fetchProducts()
    } catch (err) {
      setError(err.message)
    }
  }

  const deleteProduct = async (productId) => {
    setMessage('')
    setError('')
    try {
      await apiFetch(
        `/products/${productId}`,
        { method: 'DELETE' },
        auth.token
      )
      setMessage('Product deleted.')
      fetchProducts()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="page split">
      <form className="panel" onSubmit={createCategory}>
        <h3>Create category</h3>
        <label>
          Category name
          <input
            value={categoryName}
            onChange={(event) => setCategoryName(event.target.value)}
            required
          />
        </label>
        <button className="primary" type="submit">Add category</button>
        {categories.length ? (
          <div className="admin-list">
            {categories.map((cat) => (
              <div key={cat.categoryId} className="admin-row">
                <span>{cat.categoryName}</span>
                <button
                  className="ghost"
                  type="button"
                  onClick={() => deleteCategory(cat.categoryId)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="muted">No categories yet.</div>
        )}
      </form>
      <form className="panel" onSubmit={createProduct}>
        <h3>Create product</h3>
        <label>
          Name
          <input name="name" value={productForm.name} onChange={handleProductChange} required />
        </label>
        <label>
          Brand
          <input name="brand" value={productForm.brand} onChange={handleProductChange} required />
        </label>
        <label>
          Price
          <input type="number" name="price" value={productForm.price} onChange={handleProductChange} required />
        </label>
        <label>
          Packaging
          <input name="packaging" value={productForm.packaging} onChange={handleProductChange} required />
        </label>
        <label>
          Stock quantity
          <input
            type="number"
            name="stockQuantity"
            value={productForm.stockQuantity}
            onChange={handleProductChange}
            required
          />
        </label>
        <label>
          Category
          <select name="categoryId" value={productForm.categoryId} onChange={handleProductChange} required>
            <option value="">Select</option>
            {categories.map((cat) => (
              <option key={cat.categoryId} value={cat.categoryId}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </label>
        <button className="primary" type="submit">Add product</button>
        {products.length ? (
          <div className="admin-list">
            {products.map((product) => (
              <div key={product.productId} className="admin-row">
                <span>{product.name}</span>
                <button
                  className="ghost"
                  type="button"
                  onClick={() => deleteProduct(product.productId)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="muted">No products yet.</div>
        )}
      </form>
      <StatusBanner tone="success" message={message} />
      <StatusBanner tone="error" message={error} />
    </section>
  )
}

export default AdminPage
