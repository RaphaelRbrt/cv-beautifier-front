interface JWTPayload {
  user_id: number
  email: string
  exp: number
  iat: number
}

export const decodeJWT = (token: string): JWTPayload | null => {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) {
      return null
    }

    const payload = parts[1]
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(decoded) as JWTPayload
  } catch {
    return null
  }
}

export const isTokenExpired = (token: string): boolean => {
  const payload = decodeJWT(token)
  if (!payload || !payload.exp) {
    return true
  }

  return Date.now() >= payload.exp * 1000
}

export const getUserIdFromToken = (token: string): number | null => {
  const payload = decodeJWT(token)
  return payload?.user_id ?? null
}
