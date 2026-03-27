/**
 * User Service
 * Manages all user-related API interactions.
 */

import { jsonPlaceholderClient } from '@/services/apiService'
import { ENDPOINTS } from '@/services/apiConfig'
import { UserListResponse } from '@/types/user'

const MOCK_USERS = [
  {
    id: '1',
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    website: 'hildegard.org',
    role: 'admin' as const,
    status: 'active' as const,
  },
  {
    id: '2',
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    website: 'anastasia.net',
    role: 'user' as const,
    status: 'active' as const,
  },
]

export const userService = {
  /**
   * Fetches a paginated list of users from JSONPlaceholder.
   */
  async fetchUsers(page = 1, limit = 10): Promise<UserListResponse> {
    try {
      // Use the centralized client instead of direct fetch
      // JSONPlaceholder supports _page and _limit
      const users = await jsonPlaceholderClient.get<any[]>(
        `${ENDPOINTS.USERS.LIST}?_page=${page}&_limit=${limit}`
      )

      return {
        data: users.map((u: any) => ({
          ...u,
          role: u.id === 1 ? 'admin' : 'user',
          status: u.id % 2 === 0 ? 'active' : 'inactive',
          lastLogin: new Date().toISOString(),
        })),
        total: 10, // JSONPlaceholder has 10 users by default
        page,
        limit,
      }
    } catch (error) {
      console.warn('API Fetch failed, using hardcoded fallback data', error)
      return {
        data: MOCK_USERS.map(u => ({ ...u, lastLogin: new Date().toISOString() })),
        total: MOCK_USERS.length,
        page: 1,
        limit: 10,
      }
    }
  },

  /**
   * Fetches a single user by ID.
   */
  async fetchUserById(id: string) {
    try {
      return await jsonPlaceholderClient.get(ENDPOINTS.USERS.DETAIL(id))
    } catch (error) {
      return MOCK_USERS.find(u => u.id.toString() === id) || null
    }
  },
}
