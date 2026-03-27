'use client'

import { UserListContainer } from '@/components/users/UserListContainer'
import { useAuth } from '@/hooks/useAuth'
import { redirect } from 'next/navigation'

export default function UsersPage() {
  const { user } = useAuth()

  if (user && user.role !== 'admin') {
    redirect('/dashboard')
  }

  return (
    <UserListContainer />
  )
}
