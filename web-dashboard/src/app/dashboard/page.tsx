'use client'

import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { useAuth } from '@/hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import { jsonPlaceholderClient } from '@/services/apiService'
import { ENDPOINTS } from '@/services/apiConfig'
import { 
  Users, 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  Activity,
  Zap,
  ArrowUpRight,
  PieChart,
  BarChart3,
  MousePointer2,
  Share2
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'

export default function DashboardPage() {
  const { user } = useAuth()

  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const [users, posts, comments] = await Promise.all([
        jsonPlaceholderClient.get<any[]>(ENDPOINTS.DASHBOARD.USERS),
        jsonPlaceholderClient.get<any[]>(ENDPOINTS.DASHBOARD.POSTS),
        jsonPlaceholderClient.get<any[]>(ENDPOINTS.DASHBOARD.COMMENTS),
      ])
      return {
        users: users.length,
        posts: posts.length,
        comments: comments.length,
      }
    },
  })

  const cards = [
    { title: 'Total Users', value: stats?.users, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10', trend: '+5.2%' },
    { title: 'Total Posts', value: stats?.posts, icon: FileText, color: 'text-purple-500', bg: 'bg-purple-500/10', trend: '+12.5%' },
    { title: 'Engagement', value: stats?.comments, icon: MessageSquare, color: 'text-emerald-500', bg: 'bg-emerald-500/10', trend: '+8.1%' },
  ]

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col gap-1">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-black tracking-tight text-foreground"
        >
          Insights <span className="text-primary">Overview</span>
        </motion.h1>
        <p className="text-muted-foreground font-medium uppercase tracking-widest text-[10px] font-black mt-1">
          Welcome back, <span className="text-foreground">{user?.name}</span>. Visual analytics suite.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group rounded-2xl border border-gray-200 bg-card/50 backdrop-blur-sm p-6 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 relative overflow-hidden cursor-pointer"
          >
            <div className="flex items-start justify-between relative z-10">
              <div className="space-y-4">
                <div className={[card.bg, card.color, 'p-3 rounded-xl w-fit shadow-inner'].join(' ')}>
                  <card.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{card.title}</h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-black text-foreground">
                      {isLoading ? '...' : card.value}
                    </span>
                    <span className="text-xs font-bold text-emerald-500 flex items-center gap-0.5">
                      <TrendingUp className="h-3 w-3" />
                      {card.trend}
                    </span>
                  </div>
                </div>
              </div>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors cursor-pointer" />
            </div>
            <div className="absolute -right-4 -bottom-4 h-24 w-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Performance Chart */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-background border border-gray-200 rounded-3xl overflow-hidden shadow-sm shadow-black/5 flex flex-col"
        >
          <div className="p-6 border-b border-gray-200 bg-muted/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-bold uppercase tracking-widest">Global Activity index</h2>
            </div>
            <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest">Live Sync</Badge>
          </div>
          <div className="p-8 flex-1 flex flex-col justify-end min-h-[350px]">
            <div className="flex w-full items-end gap-2 h-64">
              {[40, 70, 45, 90, 65, 80, 50, 60, 100, 75, 40, 85, 60, 95].map((h, i) => (
                <div key={i} className="flex-1 group relative">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.8, delay: i * 0.04 + 0.4 }}
                    className="w-full bg-primary/20 rounded-t-lg group-hover:bg-primary transition-all shadow-inner border-x border-t border-primary/10"
                  />
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all bg-foreground text-background text-[9px] font-black px-2 py-1 rounded shadow-xl scale-90 group-hover:scale-100">
                    {h}%
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-6 px-1">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <span key={day} className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">{day}</span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Traffic Sources */}
        <motion.section 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-1 bg-background border border-gray-200 rounded-3xl overflow-hidden shadow-sm shadow-black/5 flex flex-col"
        >
          <div className="p-6 border-b border-gray-200 bg-muted/20 flex items-center gap-3">
            <PieChart className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold uppercase tracking-widest">Traffic Origin</h2>
          </div>
          <div className="p-8 space-y-8">
            <div className="relative flex items-center justify-center h-48">
              <div className="h-40 w-40 rounded-full border-[20px] border-muted/30 relative flex items-center justify-center">
                <div className="absolute inset-[-20px] border-[20px] border-primary border-t-transparent border-r-transparent rounded-full rotate-[120deg]" />
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-black">72%</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Mobile</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Direct Traffic', val: '42%', color: 'bg-primary' },
                { label: 'Social Media', val: '26%', color: 'bg-blue-400' },
                { label: 'Referral Link', val: '32%', color: 'bg-emerald-400' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between group cursor-pointer hover:translate-x-1 transition-transform">
                  <div className="flex items-center gap-3">
                    <div className={`h-2.5 w-2.5 rounded-full ${item.color} shadow-glow`} />
                    <span className="text-xs font-bold text-muted-foreground group-hover:text-foreground">{item.label}</span>
                  </div>
                  <span className="text-xs font-black">{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: MousePointer2, label: 'Click Rate', val: '12.4k', color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
          { icon: Share2, label: 'Social Shares', val: '4.8k', color: 'text-rose-500', bg: 'bg-rose-500/10' },
          { icon: Zap, label: 'Real-time Avg', val: '142ms', color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { icon: Activity, label: 'CPU Load', val: '32%', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="bg-background border border-gray-200 rounded-2xl p-5 shadow-sm shadow-black/5 flex items-center gap-4 hover:border-primary/20 transition-all cursor-pointer group"
          >
            <div className={`${item.bg} ${item.color} p-2.5 rounded-xl group-hover:scale-110 transition-transform`}>
              <item.icon className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{item.label}</span>
              <span className="text-xl font-black mt-0.5">{item.val}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
