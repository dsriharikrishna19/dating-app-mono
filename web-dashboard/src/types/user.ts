export interface User {
  id: string
  name: string
  username: string
  email: string
  website: string
  role: 'admin' | 'user'
  status: 'active' | 'inactive'
  lastLogin: string
}

export interface UserListResponse {
  data: User[]
  total: number
  page: number
  limit: number
}
