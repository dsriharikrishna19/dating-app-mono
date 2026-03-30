'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Zap, RefreshCcw, Star, Sparkles, MapPin, Info, Loader2 } from 'lucide-react';
import { discoveryService, DiscoveryUser } from '@/services/discovery.service';

export default function DiscoverPage() {
  const [users, setUsers] = useState<DiscoveryUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFeed = async () => {
    try {
      setRefreshing(true);
      const response = await discoveryService.getFeed();
      const rawUsers = response.data;
      
      // Map backend profiles to frontend DiscoveryUser format
      const mappedUsers = rawUsers.map((p: any) => ({
        id: p.userId, // Using userId as the identifier
        name: p.name || 'User',
        age: p.birthDate ? new Date().getFullYear() - new Date(p.birthDate).getFullYear() : 24,
        bio: p.bio || 'Finding connections.',
        distance: p.distance ? `${p.distance} miles` : 'Nearby',
        image: p.images?.[0]?.url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
        interests: p.interests?.map((i: any) => i.name) || [],
      }));

      setUsers(mappedUsers);
    } catch (error) {
      console.error('Failed to fetch discovery feed:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const handleAction = async (id: string, action: 'nope' | 'like') => {
    // Optimistic UI: remove immediately
    setUsers(curr => curr.filter(u => u.id !== id));

    try {
      const direction = action === 'like' ? 'LIKE' : 'PASS';
      const response = await discoveryService.swipe(id, direction);
      
      if (response.data.match) {
        // TODO: Handle match overlay
        console.log('IT\'S A MATCH!', response.data.matchId);
      }
    } catch (error) {
      console.error('Action failed:', error);
      // Optional: restore the user if the server fails? 
      // For dating apps, it's usually better to just move on.
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="size-10 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 lg:p-5 flex flex-col gap-6 max-w-[1600px] mx-auto w-full overflow-y-auto pb-24 lg:pb-12">
      
      {/* Header: More Compact */}
      <header className="flex flex-col gap-1 px-1">
        <h1 className="text-xl font-black text-white tracking-tight leading-none">Discover</h1>
        <p className="text-slate-600 font-bold uppercase tracking-widest text-[8px]">Matches for you</p>
      </header>

      {/* Optimized Multi-Card Grid */}
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
              {/* Image Section */}
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

              {/* Info Section */}
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

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 mt-0.5">
                  <button 
                    onClick={() => handleAction(user.id, 'nope')}
                    className="flex items-center justify-center py-2 rounded-xl bg-white/5 border border-white/10 text-slate-500 hover:text-primary hover:bg-primary/5 hover:border-primary/20 transition-all font-black text-[9px] uppercase tracking-widest"
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

        {users.length === 0 && !loading && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 gap-5 opacity-30 text-center">
            {refreshing ? (
               <Loader2 className="size-8 text-slate-600 animate-spin" />
            ) : (
              <RefreshCcw className="size-8 text-slate-600" />
            )}
            <div className="flex flex-col gap-1.5">
              <h2 className="text-lg font-black text-white">All Caught Up</h2>
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600">More people soon</p>
            </div>
            <button 
              onClick={fetchFeed}
              disabled={refreshing}
              className="px-6 py-2.5 rounded-xl brand-gradient text-white font-black uppercase text-xs tracking-widest shadow-xl disabled:opacity-50"
            >
              Refresh Feed
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
