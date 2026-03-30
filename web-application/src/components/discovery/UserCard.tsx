'use client';

import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Heart, X, Info, MapPin, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface UserCardProps {
  user: {
    id: string;
    name: string;
    age: number;
    bio: string;
    distance: string;
    image: string;
    interests: string[];
  };
  onSwipe: (direction: 'left' | 'right') => void;
}

export default function UserCard({ user, onSwipe }: UserCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const heartOpacity = useTransform(x, [50, 150], [0, 1]);
  const xOpacity = useTransform(x, [-50, -150], [0, 1]);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 100) onSwipe('right');
    else if (info.offset.x < -100) onSwipe('left');
  };

  return (
    <motion.div
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
    >
      <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 bg-slate-900">
        <img 
          src={user.image} 
          alt={user.name} 
          className="h-full w-full object-cover pointer-events-none"
        />
        
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
        
        {/* Swipe Indicators */}
        <motion.div style={{ opacity: heartOpacity }} className="absolute top-10 left-10 border-4 border-emerald-500 rounded-2xl px-4 py-1 rotate-[-20deg]">
          <span className="text-4xl font-black text-emerald-500 uppercase tracking-tighter">Like</span>
        </motion.div>
        <motion.div style={{ opacity: xOpacity }} className="absolute top-10 right-10 border-4 border-primary rounded-2xl px-4 py-1 rotate-[20deg]">
          <span className="text-4xl font-black text-primary uppercase tracking-tighter">Nope</span>
        </motion.div>

        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 p-8 pt-20">
          <div className="flex items-end justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-4xl font-black text-white">{user.name}, {user.age}</h2>
                <div className="bg-primary/20 p-1.5 rounded-full border border-primary/30">
                  <Sparkles className="size-4 text-primary" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-300 font-medium">
                <MapPin className="size-4" />
                <span>{user.distance} away</span>
              </div>
            </div>
            <button className="size-14 rounded-full glass-panel border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
              <Info className="size-6 text-white" />
            </button>
          </div>

          <p className="text-slate-300 text-sm mb-6 line-clamp-2 font-medium leading-relaxed">
            {user.bio}
          </p>

          <div className="flex flex-wrap gap-2">
            {user.interests.slice(0, 3).map((interest, i) => (
              <span key={i} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400">
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
