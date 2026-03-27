import { useDispatch } from 'react-redux'
import { authService } from '@/services/authService'
import { logout as logoutAction, loginThunk } from '@/store/slicers/authSlice'
import { LoginFormData } from '@/schemas/authSchema'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/store/hooks'
import { AppDispatch } from '@/store/store'

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { user, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth)

  const login = async (data: LoginFormData) => {
    const result = await dispatch(loginThunk(data))
    if (loginThunk.fulfilled.match(result)) {
      router.push('/dashboard')
    }
  }

  const logout = () => {
    authService.logout()
    dispatch(logoutAction())
    router.push('/login')
  }

  return {
    login,
    isLoading,
    error,
    logout,
    user,
    isAuthenticated,
  }
}
