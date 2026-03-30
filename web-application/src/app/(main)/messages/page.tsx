'use client';

import { motion } from 'framer-motion';
import { Search, MessageSquare, Plus, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

const CONVERSATIONS = [
  {
    id: '1',
    name: 'Sarah Jordan',
    lastMessage: 'That sushi place sounds amazing! Let\'s do it.',
    time: '2m ago',
    unread: true,
    online: true,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '2',
    name: 'Jessica Lee',
    lastMessage: 'Are you free for yoga this weekend?',
    time: '1h ago',
    unread: false,
    online: true,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '3',
    name: 'Emily Chen',
    lastMessage: 'Haha, exactly! I love that movie.',
    time: '4h ago',
    unread: false,
    online: false,
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '4',
    name: 'Chloe Simmons',
    lastMessage: 'Sent a photo',
    time: '1d ago',
    unread: false,
    online: false,
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
  }
];

export default function MessagesPage() {
  return (
    <div className="flex-1 flex flex-col h-full bg-[#05070A] p-4 lg:p-6 gap-6">
      {/* Header: Compact Flex Row */}
      <header className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-black text-white tracking-tight leading-none">In messages</h1>
          <p className="text-slate-600 font-bold uppercase tracking-widest text-[9px]">1 Unread</p>
        </div>
        <button className="size-9 rounded-xl glass-panel border border-white/5 flex items-center justify-center text-white hover:bg-white/5 transition-all active:scale-95">
          <Plus className="size-5" />
        </button>
      </header>

      {/* Search Bar: Compact Design */}
      <div className="relative group">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-500 group-focus-within:text-primary transition-colors" />
        <input 
          type="text" 
          placeholder="Search matches..."
          className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white outline-none focus:ring-1 focus:ring-primary/40 focus:bg-white/10 transition-all font-medium"
        />
      </div>

      {/* List: High Density Rows (p-3) */}
      <div className="flex-1 flex flex-col gap-1.5 pb-6 overflow-y-auto">
        {CONVERSATIONS.map((chat, i) => (
          <motion.div
            key={chat.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <Link 
              href={`/messages/${chat.id}`}
              className={`flex items-center gap-3.5 p-3 rounded-2xl transition-all border group relative h-16 ${
                chat.unread 
                ? 'bg-primary/5 border-primary/20' 
                : 'border-transparent hover:bg-white/5'
              }`}
            >
              <div className="relative shrink-0">
                <div className="size-11 rounded-full overflow-hidden border border-white/10 shadow-lg">
                  <img src={chat.image} alt={chat.name} className="size-full object-cover" />
                </div>
                {chat.online && (
                  <div className="absolute bottom-0 right-0 size-2.5 bg-emerald-500 rounded-full border-2 border-[#05070A]" />
                )}
              </div>

              <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <h3 className={`font-bold tracking-tight truncate text-sm ${chat.unread ? 'text-white' : 'text-slate-300'}`}>
                    {chat.name}
                  </h3>
                  <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{chat.time}</span>
                </div>
                <p className={`text-xs truncate max-w-[200px] lg:max-w-none ${chat.unread ? 'text-slate-300 font-bold' : 'text-slate-500 font-medium'}`}>
                  {chat.lastMessage}
                </p>
              </div>

              {chat.unread && (
                <div className="size-2 brand-gradient rounded-full shadow-lg shadow-primary/40" />
              )}
              
              <button className="opacity-0 group-hover:opacity-100 size-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-white transition-all active:scale-95">
                <MoreHorizontal className="size-4" />
              </button>
            </Link>
          </motion.div>
        ))}

        {/* Empty State/Prompt: Minimalist */}
        <div className="pt-8 text-center flex flex-col items-center gap-2 opacity-20">
          <MessageSquare className="size-6 text-slate-700" />
          <p className="text-slate-700 font-bold uppercase tracking-widest text-[8px]">End of inbox</p>
        </div>
      </div>
    </div>
  );
}
