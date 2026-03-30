'use client';

import { motion } from 'framer-motion';
import { Heart, Lock, Star, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

const LIKED_USERS = [
  { id: 1, name: 'Chloe', age: 22, image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80' },
  { id: 2, name: 'Mia', age: 24, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80' },
  { id: 3, name: 'Sofia', age: 23, image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80' },
  { id: 4, name: 'Isabella', age: 25, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80' },
  { id: 5, name: 'Aria', age: 21, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
  { id: 6, name: 'Zoe', age: 26, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80' },
  { id: 7, name: 'Luna', age: 23, image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80' },
  { id: 8, name: 'Lily', age: 25, image: 'https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?auto=format&fit=crop&w=400&q=80' },
];

export default function LikesPage() {
  const router = useRouter();
  return (
    <div className="flex-1 p-4 lg:p-6 flex flex-col gap-8 overflow-y-auto">
      {/* Header: Compact Flex Row/Col */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-primary">
            <Heart className="size-4 fill-current" />
            <span className="font-bold uppercase tracking-widest text-[10px]">Premium Feature</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Who Likes You</h1>
          <p className="text-slate-500 text-sm font-medium leading-tight max-w-sm">
            Unlock your likes to match instantly.
          </p>
        </div>

        <button className="px-5 py-2.5 rounded-xl brand-gradient text-white text-xs font-black uppercase tracking-widest shadow-xl flex items-center gap-2 max-w-fit active:scale-95 transition-all">
          <Star className="size-4 fill-current" />
          Get Premium
        </button>
      </header>

      {/* Grid: High Density (6 cols on XL) */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 relative overflow-hidden">
        {LIKED_USERS.map((user, i) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group relative aspect-[3/4.2] rounded-2xl overflow-hidden glass-panel border border-white/5 hover:border-primary/20 transition-all cursor-pointer"
          >
            <div className="absolute inset-0">
              <img
                src={user.image}
                className="size-full object-cover blur-[18px] scale-110 opacity-30 group-hover:opacity-40 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-transparent to-transparent opacity-60" />
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center gap-2">
              <div className="size-10 rounded-xl bg-white/5 backdrop-blur-md border border-white/5 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Lock className="size-4 text-slate-500" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-bold text-white tracking-tight leading-none">{user.name}, {user.age}</h3>
                <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Recently Active</span>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Upgrade Overlay: Centered Flex Call-to-Action */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4">
          <motion.div
            initial={{ scale: 0.98, opacity: 1 }}
            className="pointer-events-auto p-6 rounded-[2rem] bg-[#05070A]/80 backdrop-blur-2xl border border-white/10 shadow-3xl text-center flex flex-col items-center gap-6 max-w-[320px]"
          >
            <div className="size-16 rounded-2xl brand-gradient flex items-center justify-center shadow-2xl shadow-primary/30">
              <Zap className="size-8 text-white fill-current" />
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-black text-white tracking-tight">Unlock Likes</h2>
              <p className="text-slate-500 font-medium text-xs leading-relaxed">
                You have <span className="text-white font-bold">14 new likes</span>. Upgrade now to see who they are.
              </p>
            </div>

            <button className="w-full py-3.5 rounded-xl brand-gradient text-white font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all"
              onClick={() => router.push('/premium')}
            >
              Upgrade Now
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}