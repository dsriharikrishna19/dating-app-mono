'use client';

import { motion } from 'framer-motion';
import { Heart, Sparkles, Shield, Video } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden bg-background">
      {/* Background Blobs */}
      <div className="absolute top-1/4 left-1/4 size-[500px] brand-gradient rounded-full blur-[120px] opacity-20 -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 size-[400px] bg-primary rounded-full blur-[100px] opacity-10 -z-10 animate-pulse delay-700"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 border border-white/10 text-primary">
          <Sparkles className="size-4" />
          <span className="text-xs font-bold uppercase tracking-widest">Experience Modern Dating</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tighter text-white">
          Meet Your <br />
          <span className="text-gradient">Perfect Soulmate.</span>
        </h1>
        
        <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          Friendly Buddy is the next generation dating experience designed for meaningful connections, powered by real-time presence and safety first.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/register" className="w-full sm:w-auto px-10 py-5 rounded-2xl brand-gradient text-lg font-black text-white shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all uppercase tracking-tight flex items-center justify-center gap-3">
            Join the Club
            <Heart className="size-5" />
          </Link>
          <Link href="#features" className="w-full sm:w-auto px-10 py-5 rounded-2xl glass-panel text-lg font-bold text-white border border-white/10 hover:bg-white/5 transition-all">
            See What's New
          </Link>
        </div>
      </motion.div>

      {/* Floating Elements (Mocking Features) */}
      <div className="absolute hidden lg:flex flex-col gap-6 left-12 top-1/2 -translate-y-1/2">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl animate-bounce delay-100">
          <Video className="size-8 text-primary mb-2" />
          <p className="text-xs font-bold uppercase text-slate-400">Live Video</p>
        </div>
        <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl animate-bounce delay-300 translate-x-8">
          <Shield className="size-8 text-blue-400 mb-2" />
          <p className="text-xs font-bold uppercase text-slate-400">Verified</p>
        </div>
      </div>
    </div>
  );
}
