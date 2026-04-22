const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')
const TOKEN_STORAGE_KEY = 'cc_admin_token'

async function parseResponse(res) {
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || `Request failed with ${res.status}`)
  }
  return res.status === 204 ? null : res.json()
}

export async function apiGet(url) {
  const res = await fetch(`${API_BASE_URL}${url}`)
  return parseResponse(res)
}

export async function apiAdmin(url, options = {}) {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY)
  const headers = {
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  }
  const res = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  })
  return parseResponse(res)
}

export function setAdminToken(token) {
  if (!token) localStorage.removeItem(TOKEN_STORAGE_KEY)
  else localStorage.setItem(TOKEN_STORAGE_KEY, token)
}

export function getAdminToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY)
}

