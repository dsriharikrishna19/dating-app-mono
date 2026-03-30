'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Heart, X, Info, MapPin, Sparkles } from 'lucide-react';

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
  isTopCard?: boolean;
}

export default function UserCard({ user, onSwipe, isTopCard = true }: UserCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const heartOpacity = useTransform(x, [50, 150], [0, 1]);
  const xOpacity = useTransform(x, [-50, -150], [0, 1]);

  const handleDragEnd = (_: any, info: any) => {
    if (!isTopCard) return;
    if (info.offset.x > 100) onSwipe('right');
    else if (info.offset.x < -100) onSwipe('left');
  };

  return (
    <motion.div
      style={{ x: isTopCard ? x : 0, rotate: isTopCard ? rotate : 0, opacity }}
      drag={isTopCard ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className={`absolute inset-0 transition-transform duration-500 ${isTopCard ? 'cursor-grab active:cursor-grabbing z-10' : 'z-0'}`}
      initial={{ scale: 0.9, y: 10, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ x: x.get() > 0 ? 500 : -500, opacity: 0, transition: { duration: 0.3 } }}
    >
      <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 bg-slate-900">
        <img 
          src={user.image} 
          alt={user.name} 
          className="h-full w-full object-cover pointer-events-none"
        />
        
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
        
        {/* Swipe Indicators - Only show on top card */}
        {isTopCard && (
          <>
            <motion.div style={{ opacity: heartOpacity }} className="absolute top-10 left-10 border-4 border-emerald-500 rounded-2xl px-4 py-1 rotate-[-20deg] z-20">
              <span className="text-4xl font-black text-emerald-500 uppercase tracking-tighter">Like</span>
            </motion.div>
            <motion.div style={{ opacity: xOpacity }} className="absolute top-10 right-10 border-4 border-primary rounded-2xl px-4 py-1 rotate-[20deg] z-20">
              <span className="text-4xl font-black text-primary uppercase tracking-tighter">Nope</span>
            </motion.div>
          </>
        )}

        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 p-8 pt-20">
          <div className="flex items-end justify-between gap-4">
            <div className="flex-1 min-w-0 flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-black text-white truncate">{user.name}, {user.age}</h2>
                <div className="bg-primary/20 p-1 rounded-full border border-primary/30 shrink-0">
                  <Sparkles className="size-4 text-primary" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                <MapPin className="size-3.5 text-primary" />
                <span>{user.distance} away</span>
              </div>
            </div>
            
            <button className="size-11 rounded-xl glass-panel border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all shrink-0">
              <Info className="size-5" />
            </button>
          </div>

          <p className="text-slate-400 text-xs font-medium leading-relaxed mt-4 line-clamp-2">
            {user.bio}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {user.interests.slice(0, 3).map((interest, i) => (
              <span key={i} className="px-3 py-1 rounded-xl bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest text-slate-500">
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
