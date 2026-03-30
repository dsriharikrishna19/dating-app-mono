'use client';

import { motion } from 'framer-motion';
import { Send, Phone, Video, Info, ChevronLeft, MoreVertical, Image as ImageIcon, Smile } from 'lucide-react';
import Link from 'next/link';

const MESSAGES = [
  { id: 1, sender: 'Sarah', text: 'Hey! I saw your profile and loved your travel photos.', time: '12:45 PM', isMe: false },
  { id: 2, sender: 'Me', text: 'Thanks Sarah! Where was your favorite trip?', time: '12:47 PM', isMe: true },
  { id: 3, sender: 'Sarah', text: 'Definitely Japan. The food there is incredible!', time: '12:48 PM', isMe: false },
  { id: 4, sender: 'Sarah', text: 'That sushi place sounds amazing! Let\'s do it.', time: '12:50 PM', isMe: false },
];

export default function ChatDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex-1 flex flex-col h-full bg-[#05070A]">
      {/* Header: Compact Flex Row, High Density */}
      <header className="px-4 py-3 border-b border-white/5 bg-[#05070A]/80 backdrop-blur-xl flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/messages" className="lg:hidden size-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-white transition-all">
            <ChevronLeft className="size-5" />
          </Link>
          <div className="relative shrink-0">
            <div className="size-9 rounded-full overflow-hidden border border-white/10 shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" 
                alt="Sarah" 
                className="size-full object-cover" 
              />
            </div>
            <div className="absolute bottom-0 right-0 size-2.5 bg-emerald-500 rounded-full border-2 border-[#05070A]" />
          </div>
          <div className="flex flex-col gap-0.5">
            <h2 className="text-sm font-black text-white tracking-tight leading-none">Sarah Jordan</h2>
            <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest leading-none">Online</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="size-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-all">
            <Phone className="size-4" />
          </button>
          <button className="size-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-all">
            <Video className="size-4" />
          </button>
          <button className="size-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-all">
            <Info className="size-4" />
          </button>
          <button className="size-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-all">
            <MoreVertical className="size-4" />
          </button>
        </div>
      </header>

      {/* Message Area: Dense Flex-Col + Gap */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {MESSAGES.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex flex-col gap-1.5 ${msg.isMe ? 'items-end' : 'items-start'}`}
          >
            <div 
              className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-xs font-medium shadow-xl relative leading-relaxed ${
                msg.isMe 
                ? 'brand-gradient text-white rounded-br-sm' 
                : 'glass-panel border border-white/5 text-slate-200 rounded-bl-sm'
              }`}
            >
              {msg.text}
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-600 px-1">{msg.time}</span>
          </motion.div>
        ))}
      </div>

      {/* Input Area: Compact & Modern */}
      <div className="p-4 bg-[#05070A] border-t border-white/5">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="flex items-center gap-1 shrink-0">
            <button className="size-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-all">
              <ImageIcon className="size-5" />
            </button>
            <button className="size-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-all">
              <Smile className="size-5" />
            </button>
          </div>
          
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Type a message..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-2.5 px-4 text-xs text-white outline-none focus:ring-1 focus:ring-primary/40 focus:bg-white/10 transition-all font-medium"
            />
          </div>

          <button className="size-11 rounded-2xl brand-gradient flex items-center justify-center text-white shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
            <Send className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
