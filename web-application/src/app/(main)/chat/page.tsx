'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Image, Plus, MoreVertical, Heart, ArrowLeft, Loader2, Search, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const DUMMY_MATCHES = [
  { id: '1', name: 'Sarah', lastMsg: 'Hey! How are you?', time: '2m', active: true, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80' },
  { id: '2', name: 'Jessica', lastMsg: 'That sounds like fun!', time: '1h', active: false, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80' },
  { id: '3', name: 'Emily', lastMsg: 'See you there 😊', time: '5h', active: false, image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80' },
];

const DUMMY_MESSAGES = [
  { id: '1', sender: 'them', text: 'Hey there!', time: '10:30 AM' },
  { id: '2', sender: 'me', text: 'Hi Sarah! How is it going?', time: '10:32 AM' },
  { id: '3', sender: 'them', text: 'Pretty good! Just finished my class. How about you?', time: '10:35 AM' },
  { id: '4', sender: 'me', text: 'Just started working on a new project. It\'s quite exciting!', time: '10:37 AM' },
  { id: '5', sender: 'them', text: 'That\'s great to hear! Tell me more about it.', time: '10:40 AM' },
];

export default function ChatPage() {
  const [selectedMatch, setSelectedMatch] = useState<any>(DUMMY_MATCHES[0]);
  const [messages, setMessages] = useState(DUMMY_MESSAGES);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg = {
      id: Date.now().toString(),
      sender: 'me',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMsg]);
    setInputText('');
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Matches List */}
      <aside className={`w-full lg:w-96 border-r border-white/5 flex flex-col bg-slate-900/50 backdrop-blur-xl ${selectedMatch && 'hidden lg:flex'}`}>
        <header className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-black text-white">Messages.</h1>
            <div className="bg-primary/10 p-2 rounded-xl text-primary border border-primary/20">
              <Plus className="size-5" />
            </div>
          </div>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-500 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search conversations..."
              className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-600 focus:ring-2 focus:ring-primary/40 outline-none"
            />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 space-y-2">
          {DUMMY_MATCHES.map((match) => (
            <button
              key={match.id}
              onClick={() => setSelectedMatch(match)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all border ${
                selectedMatch?.id === match.id 
                ? 'bg-primary/10 border-primary/20' 
                : 'hover:bg-white/5 border-transparent'
              }`}
            >
              <div className="relative">
                <img src={match.image} className="size-14 rounded-2xl object-cover" />
                {match.active && <div className="absolute -top-1 -right-1 size-4 bg-emerald-500 rounded-full border-4 border-slate-900" />}
              </div>
              <div className="flex-1 text-left">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-white">{match.name}</h3>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{match.time}</span>
                </div>
                <p className="text-sm text-slate-400 font-medium line-clamp-1">{match.lastMsg}</p>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Conversation Area */}
      <main className={`flex-1 flex flex-col relative ${!selectedMatch && 'hidden lg:flex'}`}>
        {selectedMatch ? (
          <>
            {/* Header */}
            <header className="p-4 lg:p-6 border-b border-white/5 flex items-center justify-between glass-panel">
              <div className="flex items-center gap-4">
                <button onClick={() => setSelectedMatch(null)} className="lg:hidden p-2 text-slate-400">
                  <ArrowLeft className="size-6" />
                </button>
                <div className="relative">
                  <img src={selectedMatch.image} className="size-12 lg:size-14 rounded-2xl object-cover" />
                  {selectedMatch.active && <div className="absolute -top-1 -right-1 size-4 bg-emerald-500 rounded-full border-4 border-slate-900" />}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">{selectedMatch.name}</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-500">Online now</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="size-12 rounded-xl glass-panel border border-white/10 flex items-center justify-center text-slate-400 hover:text-white">
                  <Heart className="size-5" />
                </button>
                <button className="size-12 rounded-xl glass-panel border border-white/10 flex items-center justify-center text-slate-400 hover:text-white">
                  <MoreVertical className="size-5" />
                </button>
              </div>
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col">
              {messages.map((msg, i) => (
                <div 
                  key={msg.id} 
                  className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`max-w-[75%] p-4 rounded-[2rem] text-sm font-medium leading-relaxed ${
                    msg.sender === 'me' 
                    ? 'brand-gradient text-white rounded-tr-none shadow-xl shadow-primary/10' 
                    : 'glass-panel text-slate-200 border border-white/5 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 mt-2 mx-2">{msg.time}</span>
                </div>
              ))}
              <div ref={scrollRef} />
            </div>

            {/* Input */}
            <div className="p-6 pt-2">
              <div className="glass-panel p-3 rounded-3xl border border-white/10 flex items-center gap-3 shadow-2xl">
                <button className="size-12 rounded-2xl hover:bg-white/5 flex items-center justify-center text-slate-400 transition-colors">
                  <Plus className="size-6" />
                </button>
                <button className="size-12 rounded-2xl hover:bg-white/5 flex items-center justify-center text-slate-400 transition-colors">
                  <Image className="size-6" />
                </button>
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent text-white font-medium placeholder-slate-600 outline-none px-2"
                />
                <button 
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className="size-12 rounded-2xl brand-gradient flex items-center justify-center text-white shadow-lg shadow-primary/20 disabled:opacity-30 transition-all active:scale-90"
                >
                  <Send className="size-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-12">
            <div className="size-24 rounded-full brand-gradient flex items-center justify-center mb-8 shadow-2xl shadow-primary/20 opacity-20">
              <MessageCircle className="size-10 text-white" />
            </div>
            <h2 className="text-3xl font-black text-white mb-3">Select a conversation.</h2>
            <p className="text-slate-500 max-w-xs font-medium">Click on a match to start a chat and find your real connection.</p>
          </div>
        )}
      </main>
    </div>
  );
}
