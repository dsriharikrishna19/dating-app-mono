'use client';

import { motion } from 'framer-motion';
import { Edit2, Camera, MapPin, Briefcase, GraduationCap, Share2, Star, Link2 } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="flex-1 px-6 py-4 flex flex-col gap-12 w-full overflow-y-auto">
      {/* Profile Header Header: Compact Flex Col */}
      <section className="relative group flex flex-col gap-6">
        <div className="aspect-[24/8] rounded-2xl overflow-hidden glass-panel border border-white/5 relative">
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80" 
            alt="Cover" 
            className="size-full object-cover opacity-40 blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] to-transparent" />
        </div>

        <div className="flex flex-col lg:flex-row items-end lg:items-center justify-between gap-6 px-6 relative z-10 -translate-y-16 lg:-translate-y-12">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="size-32 rounded-2xl overflow-hidden border-4 border-[#05070A] shadow-2xl ring-1 ring-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80" 
                  alt="Profile" 
                  className="size-full object-cover" 
                />
              </div>
              <button className="absolute bottom-1 right-1 size-8 rounded-lg brand-gradient flex items-center justify-center shadow-xl border-2 border-[#05070A] hover:scale-110 transition-transform">
                <Camera className="size-4 text-white" />
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white tracking-tight">Sarah, 24</h1>
                <div className="px-2 py-0.5 rounded-full brand-gradient text-[8px] font-black text-white uppercase tracking-widest flex items-center gap-1.5 shadow-lg shadow-primary/20">
                  <Star className="size-2.5 fill-current" />
                  Premium
                </div>
              </div>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] flex items-center gap-1.5">
                <MapPin className="size-3.5 text-primary" />
                San Francisco, CA
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-xl glass-panel border border-white/10 text-xs text-white font-bold flex items-center gap-2 hover:bg-white/5 transition-all shadow-lg active:scale-95">
              <Share2 className="size-4" />
              Share
            </button>
            <button className="px-5 py-2 rounded-xl brand-gradient text-[11px] text-white font-black uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center gap-2 active:scale-95 transition-all">
              <Edit2 className="size-4" />
              Edit Profile
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Grid: Dense Col Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
        
        {/* Photo Gallery: Compact 4x aspect */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xs font-black text-white uppercase tracking-widest">Gallery</h2>
            <div className="h-px flex-1 bg-white/5 opacity-50" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden glass-panel border border-white/5 group relative">
              <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80" className="size-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="grid grid-rows-2 gap-3">
              <div className="rounded-2xl overflow-hidden glass-panel border border-white/5 relative">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80" className="size-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden glass-panel border border-white/10 flex items-center justify-center bg-primary/5 hover:bg-primary/10 transition-all border-dashed cursor-pointer">
                <PlusIcon className="size-6 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info & Stats: Compact Card Rows */}
        <div className="flex flex-col gap-6">
          <div className="glass-panel rounded-2xl border border-white/5 p-5 flex flex-col gap-6 shadow-xl">
            <div className="flex flex-col gap-2">
              <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-widest">About Me</h3>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">
                Architecture student and coffee lover. Sketching at a park or exploring city gems. ☕️🌆
              </p>
            </div>

            <div className="h-px bg-white/5" />

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-slate-500">
                <Briefcase className="size-4 text-primary" />
                <span className="font-bold text-xs">Architectural Designer</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500">
                <GraduationCap className="size-4 text-primary" />
                <span className="font-bold text-xs">UC Berkeley</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 hover:text-white transition-colors cursor-pointer">
                <Link2 className="size-4 text-pink-500" />
                <span className="font-bold text-xs">@sarah_arch</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="glass-panel rounded-2xl p-4 border border-white/5 text-center flex flex-col gap-1 shadow-lg">
              <span className="text-xl font-black text-white">124</span>
              <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Matches</span>
            </div>
            <div className="glass-panel rounded-2xl p-4 border border-white/5 text-center flex flex-col gap-1 shadow-lg">
              <span className="text-xl font-black text-white">2.4k</span>
              <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Likes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const PlusIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);
