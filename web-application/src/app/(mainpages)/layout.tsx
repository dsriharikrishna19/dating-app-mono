import ProtectedRoute from '@/components/auth/ProtectedRoute'
import React from 'react'

interface LayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: LayoutProps) => {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  )
}

export default layout