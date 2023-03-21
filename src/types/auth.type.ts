import { ResponseApiSuccess } from './util.type'
import { User } from './user.types'

export type AuthResponse = ResponseApiSuccess<{
  access_token: string
  expires: string
  user: User
}>
