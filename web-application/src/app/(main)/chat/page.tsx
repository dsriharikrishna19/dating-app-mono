'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Image as ImageIcon, Plus, MoreVertical, Heart, ArrowLeft, Search, MessageCircle, Loader2 } from 'lucide-react';
import { chatService, Conversation, ChatMessage } from '@/services/chat.service';
import { socketService } from '@/services/socket.service';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const DUMMY_MATCHES = [
  { id: '1', name: 'Sarah', lastMsg: 'Hey! How are you?', time: '2m', active: true, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80' },
  { id: '2', name: 'Jessica', lastMsg: 'That sounds like fun!', time: '1h', active: false, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80' },
  { id: '3', name: 'Emily', lastMsg: 'See you there 😊', time: '5h', active: false, image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80' },
];

const DUMMY_MESSAGES = [
  { id: '1', sender: 'them', text: 'Hey there!', time: '10:30 AM' },
  { id: '2', sender: 'me', text: 'Hi Sarah! How is it going?', time: '10:32 AM' },
  { id: '3', sender: 'them', text: 'Pretty good! Just finished my class. How about you?', time: '10:35 AM' },
];

export default function ChatPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch conversations
  useEffect(() => {
    const fetchConvs = async () => {
      try {
        const data = await chatService.getConversations();
        setConversations(data);
      } catch (err) {
        console.error('Failed to fetch conversations:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchConvs();
  }, []);

  // Fetch messages when selection changes
  useEffect(() => {
    if (!selectedConv) return;
    const fetchMsgs = async () => {
      try {
        const data = await chatService.getMessages(selectedConv.id);
        setMessages(data);
      } catch (err) {
        console.error('Failed to fetch messages:', err);
      }
    };
    fetchMsgs();
  }, [selectedConv]);

  // Real-time listener
  useEffect(() => {
    if (!user) return;
    socketService.connect(user.id);
    
    const unbind = socketService.on('new_message', (payload: any) => {
      if (selectedConv && payload.conversationId === selectedConv.id) {
        setMessages(prev => [...prev, payload.message]);
      }
      
      // Update last message in the list
      setConversations(prev => prev.map(c => {
        if (c.id === payload.conversationId) {
          return { ...c, lastMessage: payload.message };
        }
        return c;
      }));
    });

    return () => unbind();
  }, [user, selectedConv]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || !selectedConv) return;
    const text = inputText;
    setInputText('');
    
    try {
      const msg = await chatService.sendMessage(selectedConv.id, text);
      setMessages(prev => [...prev, msg]);
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  return (
    <div className="flex h-screen bg-[#05070A] overflow-hidden">
      {/* Matches List: Refactored for Density */}
      <aside className={`w-full lg:w-80 border-r border-white/5 flex flex-col bg-slate-900/10 backdrop-blur-xl shrink-0 ${selectedConv && 'hidden lg:flex'}`}>
        <header className="p-5 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-black text-white tracking-tight">Messages</h1>
            <button className="size-8 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center hover:bg-primary/20 transition-all">
              <Plus className="size-4" />
            </button>
          </div>
          <div className="relative group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-500 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-600 outline-none focus:ring-1 focus:ring-primary/40 transition-all"
            />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-2 flex flex-col gap-1">
          {loading ? (
             <div className="flex-1 flex items-center justify-center">
               <Loader2 className="size-6 text-primary animate-spin" />
             </div>
          ) : conversations.length === 0 ? (
            <p className="text-center text-slate-500 text-xs mt-10">No messages yet.</p>
          ) : conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConv(conv)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all border group relative ${
                selectedConv?.id === conv.id 
                ? 'bg-primary/10 border-primary/10' 
                : 'hover:bg-white/5 border-transparent text-slate-400'
              }`}
            >
              <div className="relative shrink-0">
                <img src={conv.otherUser.image || '/placeholder-user.png'} className="size-11 rounded-xl object-cover border border-white/5" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className={`font-bold text-sm tracking-tight truncate ${selectedConv?.id === conv.id ? 'text-white' : 'text-slate-300'}`}>
                    {conv.otherUser.name}
                  </h3>
                  <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest leading-none">
                    {new Date(conv.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium truncate leading-tight">{conv.lastMessage?.content || 'No messages yet'}</p>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Conversation Area: Refactored with Flex + Gap */}
      <main className={`flex-1 flex flex-col relative ${!selectedConv && 'hidden lg:flex'}`}>
        {selectedConv ? (
          <>
            <header className="px-4 py-3 border-b border-white/5 flex items-center justify-between glass-panel shrink-0">
              <div className="flex items-center gap-3">
                <button onClick={() => setSelectedConv(null)} className="lg:hidden p-2 text-slate-500 hover:text-white transition-colors">
                  <ArrowLeft className="size-5" />
                </button>
                <div className="relative size-9">
                  <img src={selectedConv.otherUser.image || '/placeholder-user.png'} className="size-full rounded-xl object-cover border border-white/5" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <h3 className="font-bold text-white text-sm tracking-tight leading-none">{selectedConv.otherUser.name}</h3>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-500 leading-none">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button className="size-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-all">
                  <Heart className="size-4.5" />
                </button>
                <button className="size-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-all">
                  <MoreVertical className="size-4.5" />
                </button>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex flex-col gap-1.5 ${msg.senderId === user?.id ? 'items-end' : 'items-start'}`}
                >
                  <div className={`max-w-[70%] p-3.5 rounded-2xl text-[13px] font-medium leading-relaxed shadow-xl ${
                    msg.senderId === user?.id 
                    ? 'brand-gradient text-white rounded-br-none' 
                    : 'glass-panel text-slate-200 border border-white/5 rounded-bl-none'
                  }`}>
                    {msg.content}
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-600 px-1">
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
              <div ref={scrollRef} />
            </div>

            <div className="p-4 pt-1">
              <div className="glass-panel p-2 rounded-2xl border border-white/10 flex items-center gap-2 shadow-2xl">
                <button className="size-9 rounded-xl hover:bg-white/5 flex items-center justify-center text-slate-500 transition-colors">
                  <Plus className="size-5" />
                </button>
                <button className="size-9 rounded-xl hover:bg-white/5 flex items-center justify-center text-slate-500 transition-colors">
                  <ImageIcon className="size-5" />
                </button>
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent text-white text-sm placeholder-slate-600 outline-none px-2 font-medium"
                />
                <button 
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className="size-10 rounded-xl brand-gradient flex items-center justify-center text-white shadow-lg disabled:opacity-20 transition-all active:scale-90"
                >
                  <Send className="size-4.5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 gap-6 opacity-40">
            <div className="size-20 rounded-2xl brand-gradient flex items-center justify-center shadow-2xl shadow-primary/20 rotate-3">
              <MessageCircle className="size-10 text-white fill-current" />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-black text-white tracking-tight">Select a conversation</h2>
              <p className="text-slate-500 max-w-xs font-medium text-sm leading-relaxed">
                Connect with your matches and start something real today.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
