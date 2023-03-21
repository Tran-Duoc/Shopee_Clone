import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

interface FormData {
  email: string
  password: string
}

export const registerUser = (body: FormData) => {
  return http.post<AuthResponse>('register', body)
}
export const loginUser = (body: FormData) => {
  return http.post<AuthResponse>('login', body)
}

export const logout = () => {
  return http.post('logout')
}
