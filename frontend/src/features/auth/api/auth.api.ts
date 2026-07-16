import { apiClient } from '@/services/api/client'
import type { AuthResponse, AuthUser, LoginPayload, RegisterPayload } from '@/features/auth/types'

export async function registerUser(payload: RegisterPayload) {
  const { data } = await apiClient.post<AuthResponse>('/auth/register', payload)
  return data
}

export async function loginUser(payload: LoginPayload) {
  const { data } = await apiClient.post<AuthResponse>('/auth/login', payload)
  return data
}

export async function getCurrentUser() {
  const { data } = await apiClient.get<{ user: AuthUser }>('/auth/me')
  return data.user
}
