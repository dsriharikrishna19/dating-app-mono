import { useQuery } from '@tanstack/react-query'
import { userService } from '@/services/userService'
import { useDispatch } from 'react-redux'
import { fetchUsersThunk } from '@/store/slicers/userSlice'
import { AppDispatch } from '@/store/store'

export const useUsers = (page = 1, limit = 10) => {
  const dispatch = useDispatch<AppDispatch>()

  return useQuery({
    queryKey: ['users', page, limit],
    queryFn: async () => {
      // We can still use React Query for the UI state, 
      // but also dispatch to Redux to keep the store in sync.
      const result = await dispatch(fetchUsersThunk({ page, limit }))
      if (fetchUsersThunk.fulfilled.match(result)) {
        return result.payload
      }
      throw new Error('Failed to fetch users')
    },
    placeholderData: (previousData) => previousData,
  })
}
