'use client'

import { useState } from 'react'
import { FadeIn } from '@/components/motion'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { 
  Bell, 
  Check, 
  Clock, 
  AlertCircle, 
  Zap, 
  Trash2,
  Filter,
  MoreVertical
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function NotificationsPage() {
  const [filter, setFilter] = useState('all')
  const [items, setItems] = useState([
    { id: 1, type: 'critical', title: 'Security violation detected', desc: 'An unauthorized login attempt was blocked from a new location.', time: '2m ago', read: false },
    { id: 2, type: 'update', title: 'System upgrade completed', desc: 'The dashboard core has been updated to v4.2.0 with performance fixes.', time: '1h ago', read: true },
    { id: 3, type: 'alert', title: 'Database usage at 85%', desc: 'Consider scaling your storage cluster to avoid potential latency.', time: '4h ago', read: false },
    { id: 4, type: 'info', title: 'New team member joined', desc: 'Sarah Connor has been added to the Alpha-7 cluster as an Architect.', time: 'Yesterday', read: true },
    { id: 5, type: 'update', title: 'API Endpoint re-synced', desc: 'The JSONPlaceholder synchronization loop has stabilized.', time: '2 days ago', read: true },
  ])

  const filteredItems = items.filter(item => filter === 'all' || (filter === 'unread' && !item.read))

  return (
    <FadeIn className="flex flex-col gap-8 max-w-7xl pb-12">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold tracking-tight">Notification Center</h1>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mt-1">Timeline of system events</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="gap-2 h-9 text-[10px] hover:bg-muted cursor-pointer font-black uppercase tracking-widest">
            <Check className="h-4 w-4" />
            Clear All
          </Button>
          <Button variant="secondary" className="p-2 h-9 w-9 cursor-pointer">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex bg-muted/20 border border-gray-200 p-1.5 rounded-2xl w-fit">
        {['all', 'unread', 'archived'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={[
              'px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer',
              filter === f ? 'bg-background text-primary shadow-lg shadow-black/5 ring-1 ring-gray-100' : 'text-muted-foreground hover:text-foreground'
            ].join(' ')}
          >
            {f} {f === 'unread' && `(${items.filter(i => !i.read).length})`}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={[
                'group flex items-start gap-4 p-5 rounded-2xl border transition-all hover:shadow-xl hover:shadow-primary/5 cursor-pointer',
                item.read ? 'bg-background border-gray-100 opacity-80' : 'bg-background border-primary/20 shadow-md ring-1 ring-primary/5'
              ].join(' ')}
            >
              <div className={[
                'h-12 w-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner',
                item.type === 'critical' ? 'bg-rose-500/10 text-rose-500' : 
                item.type === 'update' ? 'bg-primary/10 text-primary' : 
                item.type === 'alert' ? 'bg-amber-500/10 text-amber-500' : 'bg-muted/50 text-muted-foreground'
              ].join(' ')}>
                {item.type === 'critical' ? <AlertCircle className="h-6 w-6" /> : 
                 item.type === 'update' ? <Zap className="h-6 w-6" /> : <Bell className="h-6 w-6" />}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-bold truncate pr-4">{item.title}</h3>
                  <div className="flex items-center gap-2 shrink-0">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{item.time}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground font-medium leading-relaxed mb-4">
                  {item.desc}
                </p>
                <div className="flex items-center gap-3">
                  <Button variant="secondary" className="h-7 px-3 text-[9px] font-black uppercase tracking-widest hover:bg-primary/10 hover:text-primary border-none cursor-pointer">
                    Manage Event
                  </Button>
                  {!item.read && (
                    <Button variant="secondary" className="h-7 px-3 text-[9px] font-black uppercase tracking-widest hover:bg-emerald-500/10 hover:text-emerald-500 border-none cursor-pointer">
                      Mark as Read
                    </Button>
                  )}
                </div>
              </div>

              <div className="opacity-0 group-hover:opacity-100 transition-opacity self-start pt-1 flex flex-col gap-2">
                <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground transition-all cursor-pointer">
                  <MoreVertical className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => setItems(prev => prev.filter(i => i.id !== item.id))}
                  className="p-2 hover:bg-rose-500/10 hover:text-rose-500 rounded-lg text-muted-foreground transition-all cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-muted/10 rounded-3xl border border-dashed border-gray-200">
            <div className="h-16 w-16 bg-muted/20 rounded-2xl flex items-center justify-center text-muted-foreground/40 mb-4">
              <Check className="h-8 w-8" />
            </div>
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">All caught up!</p>
          </div>
        )}
      </div>
    </FadeIn>
  )
}
