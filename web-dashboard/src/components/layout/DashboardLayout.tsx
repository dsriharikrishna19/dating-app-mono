'use client'

import { useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/navigation'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth)
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (!mounted || isLoading || !isAuthenticated) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full shadow-glow" 
        />
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-muted/10 selection:bg-primary/10 selection:text-primary overflow-hidden font-sans antialiased">
      <Sidebar />
      <div className="flex flex-1 flex-col h-full overflow-hidden relative">
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.main 
            key="dashboard-main"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 1.02 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="flex-1 overflow-y-auto p-8 relative z-10 custom-scrollbar"
          >
            {children}
          </motion.main>
        </AnimatePresence>
        
        {/* Subtle decorative elements for "WOW" factor */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -z-0 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -z-0 pointer-events-none" />
      </div>
    </div>
  )
}
