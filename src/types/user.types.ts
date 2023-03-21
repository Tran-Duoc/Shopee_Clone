type Role = 'user' | 'Admin'

export interface User {
  _id: string
  role: Role[]
  email: string
  name: string
  date_of_birth: null
  address: string
  phone: string
  createAt: string
  updateAt: string
}
