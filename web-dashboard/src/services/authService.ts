 /**
 * Auth Service
 * High-level orchestration for authentication tasks.
 */

import { jsonPlaceholderClient } from '@/services/apiService'
import { ENDPOINTS } from '@/services/apiConfig'
import { LoginFormData } from '@/schemas/authSchema'

const MOCK_ADMIN = {
  id: '1',
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  role: 'admin' as const,
}

export const authService = {
  /**
   * Performs the login simulation using JSONPlaceholder users.
   */
  async login(data: LoginFormData) {
    try {
      const users = await jsonPlaceholderClient.get<any[]>(ENDPOINTS.AUTH.LOGIN)
      
      // Find a user by email (case-insensitive)
      const user = users.find((u) => u.email.toLowerCase() === data.email.toLowerCase())

      if (user) {
        return {
          user: {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            role: user.id === 1 ? ('admin' as const) : ('user' as const),
          },
        }
      }
    } catch (error) {
      console.warn('Auth API failed, using hardcoded fallback', error)
      // Fallback for admin user specifically
      if (data.email.toLowerCase() === MOCK_ADMIN.email.toLowerCase()) {
        return { user: MOCK_ADMIN }
      }
    }

    throw new Error('User not found. Try "Sincere@april.biz"')
  },

  /**
   * Standardized logout procedure.
   */
  logout() {
    localStorage.removeItem('auth_state')
  },
}
