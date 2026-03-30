'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Camera, MapPin, Heart, Edit3, Settings, LogOut, ChevronRight, Shield, Bell, Star } from 'lucide-react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-6 lg:p-12">
      <div className="w-full max-w-4xl">
        <header className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-black text-white">My Profile.</h1>
          <div className="flex gap-4">
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-3 rounded-2xl glass-panel border border-white/10 flex items-center gap-2 text-sm font-bold text-white hover:bg-white/5 transition-all"
            >
              <Edit3 className="size-4" />
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
            <Link 
              href="/settings"
              className="size-12 rounded-2xl glass-panel border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"
            >
              <Settings className="size-6" />
            </Link>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Photos & Basic Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="relative group">
              <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80" 
                  className="size-full object-cover"
                />
              </div>
              <button className="absolute bottom-4 right-4 size-12 rounded-2xl brand-gradient flex items-center justify-center text-white shadow-xl shadow-primary/30 hover:scale-110 transition-transform">
                <Camera className="size-6" />
              </button>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
              <div className="flex items-center gap-4 text-slate-300">
                <MapPin className="size-5 text-primary" />
                <span className="font-medium">San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <Heart className="size-5 text-primary" />
                <span className="font-medium">Looking for a long-term relationship</span>
              </div>
            </div>

            <button 
              onClick={handleLogout}
              className="w-full py-4 rounded-2xl glass-panel border border-white/5 text-primary font-black flex items-center justify-center gap-3 hover:bg-primary/5 transition-all"
            >
              <LogOut className="size-5" />
              Logout Account
            </button>
          </div>

          {/* Right: Bio, Interests, Stats */}
          <div className="lg:col-span-2 space-y-8">
            <section className="glass-panel p-8 rounded-[2.5rem] border border-white/5">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-6 flex items-center gap-2">
                <User className="size-4" /> About Me
              </h2>
              <p className="text-slate-300 font-medium leading-relaxed text-lg">
                Hi, I'm Alex! I'm a UX designer with a passion for minimalism, specialty coffee, and hiking on weekends. I'm looking for someone who shares my love for adventure and deep conversations about design and technology.
              </p>
            </section>

            <section className="glass-panel p-8 rounded-[2.5rem] border border-white/5">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-6 flex items-center gap-2">
                <Star className="size-4" /> Interests
              </h2>
              <div className="flex flex-wrap gap-2">
                {['UX Design', 'Hiking', 'Specialty Coffee', 'Minimalism', 'Tech', 'Travel', 'Art', 'Nature'].map(interest => (
                  <span key={interest} className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-400 capitalize">
                    {interest}
                  </span>
                ))}
              </div>
            </section>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { label: 'Popularity', value: 'High', color: 'emerald' },
                { label: 'Verified', value: 'Active', color: 'blue' },
                { label: 'Membership', value: 'Gold', color: 'primary' },
              ].map((stat, i) => (
                <div key={i} className="glass-panel p-6 rounded-3xl border border-white/5 text-center group hover:border-primary/20 transition-all">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{stat.label}</p>
                  <p className={`text-lg font-black text-${stat.color === 'primary' ? 'primary' : stat.color + '-400'} uppercase tracking-tighter`}>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
