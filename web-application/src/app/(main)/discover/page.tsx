'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Zap, RefreshCcw, Star, Sparkles, MapPin, Info } from 'lucide-react';

const DUMMY_USERS = [
  {
    id: '1',
    name: 'Sarah',
    age: 24,
    bio: 'Architecture student and coffee lover.',
    distance: '3 miles',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    interests: ['Design', 'Coffee', 'Music'],
  },
  {
    id: '2',
    name: 'Jessica',
    age: 22,
    bio: 'Yoga instructor and nature enthusiast.',
    distance: '5 miles',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    interests: ['Yoga', 'Nature', 'Wellness'],
  },
  {
    id: '3',
    name: 'Emily',
    age: 26,
    bio: 'Professional foodie and traveler.',
    distance: '2 miles',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    interests: ['Sushi', 'Travel', 'Dining'],
  },
  {
    id: '4',
    name: 'Chloe',
    age: 23,
    bio: 'Digital artist and plant lover.',
    distance: '1 mile',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    interests: ['Art', 'Plants', 'Museums'],
  }
];

export default function DiscoverPage() {
  const [users, setUsers] = useState(DUMMY_USERS);

  const handleAction = (id: string, action: string) => {
    setUsers(curr => curr.filter(u => u.id !== id));
  };

  return (
    <div className="flex-1 p-4 lg:p-5 flex flex-col gap-6 max-w-[1600px] mx-auto w-full overflow-y-auto pb-24 lg:pb-12">
      
      {/* Header: More Compact */}
      <header className="flex flex-col gap-1 px-1">
        <h1 className="text-xl font-black text-white tracking-tight leading-none">Discover</h1>
        <p className="text-slate-600 font-bold uppercase tracking-widest text-[8px]">Matches for you</p>
      </header>

      {/* Optimized Multi-Card Grid: Higher column count (4) and reduced card size */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {users.map((user) => (
            <motion.div
              key={user.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="group relative flex flex-col glass-panel rounded-2xl border border-white/5 overflow-hidden shadow-xl transition-all hover:border-white/10"
            >
              {/* Image Section: Aspect ratio reduced for density (aspect-[4/5.2]) */}
              <div className="aspect-[4/5.2] relative overflow-hidden">
                <img src={user.image} className="size-full object-cover transition-transform duration-700 group-hover:scale-105" alt={user.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60" />
                
                <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1 max-w-[85%]">
                  {user.interests.slice(0, 2).map((tag, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded bg-black/40 backdrop-blur-md border border-white/10 text-[7px] font-black uppercase tracking-widest text-white/80">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Info Section: Reduced Padding (p-3) */}
              <div className="p-3.5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-1.5">
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-black text-white tracking-tight leading-none truncate">{user.name}, {user.age}</h3>
                      <Sparkles className="size-3 text-primary shrink-0" />
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <MapPin className="size-2.5 text-primary/60" />
                      <span className="text-[9px] font-bold uppercase tracking-widest leading-none truncate">{user.distance} away</span>
                    </div>
                  </div>
                  <button className="size-8 rounded-lg glass-panel border border-white/5 flex items-center justify-center text-slate-500 hover:text-white transition-all shrink-0">
                    <Info className="size-3.5" />
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 font-medium line-clamp-1 leading-normal">
                  {user.bio}
                </p>

                {/* Actions: Scaled Down Buttons */}
                <div className="grid grid-cols-2 gap-2 mt-0.5">
                  <button 
                    onClick={() => handleAction(user.id, 'nope')}
                    className="flex items-center justify-center py-2 rounded-xl bg-white/5 border border-white/5 text-slate-500 hover:text-primary hover:bg-primary/5 hover:border-primary/20 transition-all font-black text-[9px] uppercase tracking-widest"
                  >
                    <X className="size-3.5 mr-1" />
                    Nope
                  </button>
                  <button 
                    onClick={() => handleAction(user.id, 'like')}
                    className="flex items-center justify-center py-2 rounded-xl brand-gradient text-white shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all font-black text-[9px] uppercase tracking-widest"
                  >
                    <Heart className="size-3.5 mr-1 fill-current" />
                    Like
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {users.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 gap-5 opacity-30 text-center">
            <RefreshCcw className="size-8 text-slate-600 animate-spin-slow" />
            <div className="flex flex-col gap-1.5">
              <h2 className="text-lg font-black text-white">All Caught Up</h2>
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600">More people soon</p>
            </div>
            <button 
              onClick={() => setUsers(DUMMY_USERS)}
              className="px-6 py-2.5 rounded-xl brand-gradient text-white font-black uppercase text-xs tracking-widest shadow-xl"
            >
              Refresh Feed
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
