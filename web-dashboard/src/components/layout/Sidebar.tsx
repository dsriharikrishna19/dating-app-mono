'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  User,
  BarChart3,
  Bell,
  LogOut, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { motion } from 'framer-motion'
import { Dialog } from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
  { name: 'Users', href: '/dashboard/users', icon: Users, roles: ['admin'] },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export const Sidebar = () => {
  const pathname = usePathname()
  const { logout, user } = useAuth()
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)

  return (
    <>
      <aside className="w-64 border-r border-border bg-background/40 backdrop-blur-xl flex flex-col h-full sticky top-0 z-20 transition-all duration-300">
        <div className="p-6 flex items-center gap-3 cursor-pointer group/logo">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover/logo:scale-110 transition-transform">
            <ShieldCheck className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-foreground group-hover/logo:text-primary transition-colors">Enterprise</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Admin Panel</span>
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1 py-4">
          {navigation.map((item) => {
            if (item.roles && !item.roles.includes(user?.role || '')) return null
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={[
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 group cursor-pointer border',
                  isActive 
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 border-primary' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border-transparent'
                ].join(' ')}
              >
                <div className="flex items-center gap-3 z-10">
                  <Icon className={[
                    'h-5 w-5 transition-transform duration-300 group-hover:scale-110',
                    isActive ? 'text-primary-foreground' : 'text-muted-foreground'
                  ].join(' ')} />
                  <span className="font-medium text-sm">{item.name}</span>
                </div>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-muted/20 border border-border rounded-2xl p-4 relative overflow-hidden group/card cursor-pointer">
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">System Status</p>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-foreground">Operational</span>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 h-16 w-16 bg-emerald-500/5 rounded-full blur-xl animate-pulse" />
          </div>
        </div>

        <div className="p-4 border-t border-border">
          <button
            onClick={() => setIsLogoutDialogOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-black uppercase tracking-widest text-destructive hover:bg-destructive/10 transition-all duration-300 cursor-pointer"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      <Dialog
        isOpen={isLogoutDialogOpen}
        onClose={() => setIsLogoutDialogOpen(false)}
        title="Sign Out?"
        description="Are you sure you want to end your current session?"
      >
        <div className="flex flex-col gap-4">
          <div className="bg-destructive/10 p-4 rounded-2xl flex items-center justify-center">
            <LogOut className="h-12 w-12 text-destructive" />
          </div>
          <p className="text-sm text-center text-muted-foreground font-medium">
            You will need to re-authenticate to access your dashboard.
          </p>
          <div className="flex gap-3 mt-2">
            <Button
              variant="secondary"
              className="flex-1 rounded-xl h-11 text-xs font-black uppercase tracking-widest cursor-pointer"
              onClick={() => setIsLogoutDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="flex-1 rounded-xl h-11 text-xs font-black uppercase tracking-widest shadow-lg shadow-destructive/20 cursor-pointer"
              onClick={logout}
            >
              Log Out
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  )
}
