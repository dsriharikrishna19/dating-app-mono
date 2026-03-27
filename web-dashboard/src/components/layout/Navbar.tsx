'use client'

import Link from 'next/link'
import { Bell, Search, User as UserIcon } from 'lucide-react'
import { useAppSelector } from '@/store/hooks'
import { motion } from 'framer-motion'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export const Navbar = () => {
  const user = useAppSelector((state) => state.auth.user)

  return (
    <header className="h-16 border-b border-border bg-background/40 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-30 transition-all duration-300">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search dashboard..."
            className="w-full bg-muted/20 border-border focus:bg-background/50 focus:border-primary/50 rounded-xl pl-10 pr-4 py-2 text-sm outline-none transition-all duration-300 border shadow-inner"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        
        <Link href="/dashboard/notifications" className="relative p-2 text-muted-foreground hover:text-foreground transition-all hover:bg-muted/50 rounded-xl cursor-pointer">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-destructive rounded-full ring-2 ring-background shadow-glow animate-pulse" />
        </Link>
        
        <div className="h-8 w-[1px] bg-border" />

        <Link href="/dashboard/profile" className="flex items-center gap-4 cursor-pointer group">
          <div className="flex flex-col items-end text-right">
            <span className="text-sm font-bold text-foreground leading-none group-hover:text-primary transition-colors">
              {user?.name || 'Guest'}
            </span>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">
              {user?.role || 'User'}
            </span>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 p-0.5 shadow-lg shadow-primary/20"
          >
            <div className="h-full w-full rounded-[10px] bg-background flex items-center justify-center">
              {user?.name ? (
                <span className="text-sm font-bold text-primary">
                  {user.name.split(' ').map((n: string) => n[0]).join('')}
                </span>
              ) : (
                <UserIcon className="h-5 w-5 text-primary" />
              )}
            </div>
          </motion.div>
        </Link>
      </div>
    </header>
  )
}
