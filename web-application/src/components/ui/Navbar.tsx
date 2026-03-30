'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass-panel m-4 rounded-2xl bg-opacity-20 backdrop-blur-xl border border-white/5">
      <Link href="/" className="flex items-center gap-2">
        <div className="size-10 brand-gradient rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
          <Heart className="size-6 text-white fill-current" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">Friendly Buddy</span>
      </Link>
      
      <div className="hidden md:flex items-center gap-8">
        <Link href="#features" className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">Features</Link>
        <Link href="#premium" className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">Premium</Link>
        <Link href="#safety" className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">Safety</Link>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/login" className="px-5 py-2.5 rounded-xl border border-white/10 text-sm font-semibold hover:bg-white/5 transition-all">
          Login
        </Link>
        <Link href="/register" className="px-5 py-2.5 rounded-xl brand-gradient text-sm font-bold text-white shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
          Get Started
        </Link>
      </div>
    </nav>
  );
}
