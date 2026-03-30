'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, X, Zap, RefreshCcw, Star, MessageCircle, Users, Settings, User } from 'lucide-react';
import UserCard from '@/components/discovery/UserCard';
import Link from 'next/link';

const DUMMY_USERS = [
  {
    id: '1',
    name: 'Sarah',
    age: 24,
    bio: 'Architecture student and coffee lover. Let\'s explore the city together!',
    distance: '3 miles',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    interests: ['Design', 'Coffee', 'Music'],
  },
  {
    id: '2',
    name: 'Jessica',
    age: 22,
    bio: 'Yoga instructor and nature enthusiast. Finding peace in the chaos.',
    distance: '5 miles',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    interests: ['Yoga', 'Nature', 'Wellness'],
  },
  {
    id: '3',
    name: 'Emily',
    age: 26,
    bio: 'Professional foodie and part-time traveler. Always looking for the next best sushi spot.',
    distance: '2 miles',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    interests: ['Sushi', 'Travel', 'Dining Out'],
  }
];

export default function DiscoverPage() {
  const [users, setUsers] = useState(DUMMY_USERS);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction: 'left' | 'right') => {
    console.log(`Swiped ${direction} on ${users[currentIndex].name}`);
    setCurrentIndex(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar Navigation */}
      <aside className="w-20 lg:w-72 border-r border-white/5 flex flex-col p-6 h-screen sticky top-0">
        <Link href="/" className="size-12 rounded-2xl brand-gradient flex items-center justify-center mb-12 shadow-xl shadow-primary/20 mx-auto lg:mx-0">
          <Heart className="size-7 text-white fill-current" />
        </Link>

        <nav className="flex-1 flex flex-col gap-4">
          {[
            { icon: Users, label: 'Discover', href: '/discover', active: true },
            { icon: Heart, label: 'Likes', href: '/likes' },
            { icon: MessageCircle, label: 'Messages', href: '/chat' },
            { icon: Star, label: 'Premium', href: '/premium' },
          ].map((item, i) => (
            <Link 
              key={i} 
              href={item.href}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                item.active 
                ? 'bg-primary/10 text-primary border border-primary/10' 
                : 'text-slate-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="size-6" />
              <span className="hidden lg:block font-black text-sm uppercase tracking-widest">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-4 pt-6 border-t border-white/5">
          <Link href="/profile" className="flex items-center gap-4 p-4 rounded-2xl text-slate-500 hover:text-white hover:bg-white/5 transition-all">
            <User className="size-6" />
            <span className="hidden lg:block font-black text-sm uppercase tracking-widest">Profile</span>
          </Link>
          <Link href="/settings" className="flex items-center gap-4 p-4 rounded-2xl text-slate-500 hover:text-white hover:bg-white/5 transition-all">
            <Settings className="size-6" />
            <span className="hidden lg:block font-black text-sm uppercase tracking-widest">Settings</span>
          </Link>
        </div>
      </aside>

      {/* Main Discover Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 relative overflow-hidden">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 right-0 size-[600px] brand-gradient rounded-full blur-[150px] opacity-10 -z-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 size-[400px] bg-primary rounded-full blur-[120px] opacity-10 -z-10 -translate-x-1/2 translate-y-1/2"></div>

        <div className="relative w-full max-w-[450px] aspect-[3/4.5] lg:aspect-[3/4]">
          <AnimatePresence>
            {currentIndex < users.length ? (
              <UserCard 
                key={users[currentIndex].id}
                user={users[currentIndex]}
                onSwipe={handleSwipe}
              />
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full w-full glass-panel rounded-[2.5rem] border border-white/10 flex flex-col items-center justify-center text-center p-12"
              >
                <div className="size-24 rounded-full bg-white/5 flex items-center justify-center mb-8 border border-white/10 animate-pulse">
                  <RefreshCcw className="size-10 text-slate-600" />
                </div>
                <h2 className="text-3xl font-black text-white mb-4">You've reached the end!</h2>
                <p className="text-slate-400 font-medium mb-8">We'll let you know when there are more people to meet in your area.</p>
                <button 
                  onClick={() => setCurrentIndex(0)}
                  className="px-8 py-4 rounded-2xl brand-gradient text-white font-black uppercase tracking-tight shadow-xl shadow-primary/20 hover:scale-105 transition-all"
                >
                  Refresh Feed
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Swipe Controls */}
        <div className="mt-12 flex items-center gap-6">
          <button className="size-16 rounded-full glass-panel border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-all">
            <RefreshCcw className="size-6" />
          </button>
          <button 
            onClick={() => handleSwipe('left')}
            className="size-20 rounded-full glass-panel border border-white/10 flex items-center justify-center text-primary hover:bg-primary/10 hover:border-primary/50 transition-all shadow-xl"
          >
            <X className="size-8" />
          </button>
          <button className="size-16 rounded-full glass-panel border border-white/10 flex items-center justify-center text-indigo-400 hover:text-indigo-300 transition-all">
            <Star className="size-6 fill-current" />
          </button>
          <button 
            onClick={() => handleSwipe('right')}
            className="size-20 rounded-full glass-panel border border-white/10 flex items-center justify-center text-emerald-400 hover:bg-emerald-400/10 hover:border-emerald-500 transition-all shadow-xl"
          >
            <Heart className="size-8 fill-current" />
          </button>
          <button className="size-16 rounded-full glass-panel border border-white/10 flex items-center justify-center text-orange-400 hover:text-orange-300 transition-all">
            <Zap className="size-6 fill-current" />
          </button>
        </div>
      </main>
    </div>
  );
}
