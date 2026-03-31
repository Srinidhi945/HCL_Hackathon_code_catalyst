const DEFAULT_BASE_URL = 'http://localhost:8080/api'

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || DEFAULT_BASE_URL

export async function apiFetch(path, options = {}, token) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers
  })

  let payload = null
  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    payload = await response.json()
  } else {
    payload = await response.text()
  }

  if (!response.ok) {
    const message = payload?.error || payload?.message || payload || 'Request failed'
    throw new Error(message)
  }

  return payload
}
