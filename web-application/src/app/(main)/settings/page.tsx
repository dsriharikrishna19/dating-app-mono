'use client';

import { motion } from 'framer-motion';
import { Bell, Shield, Lock, Eye, ArrowLeft, ChevronRight, Zap, Star, Smartphone, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const sections = [
    {
      title: 'Account Settings',
      items: [
        { icon: Smartphone, label: 'Phone Number', value: '+1 234 **** 890' },
        { icon: Bell, label: 'Notifications', value: 'On' },
        { icon: Lock, label: 'Privacy', value: 'Managed' },
      ]
    },
    {
      title: 'Safety & Support',
      items: [
        { icon: Shield, label: 'Safety Center', value: 'Verified' },
        { icon: HelpCircle, label: 'Help & Support', value: '' },
      ]
    },
    {
      title: 'Premium Membership',
      items: [
        { icon: Star, label: 'Friendly Buddy Gold', value: 'Upgrade', highlight: true },
        { icon: Zap, label: 'Boost My Profile', value: '3 Remaining' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-6 lg:p-12">
      <div className="w-full max-w-2xl">
        <header className="flex items-center gap-4 mb-12">
          <Link href="/profile" className="size-12 rounded-2xl glass-panel border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all">
            <ArrowLeft className="size-6" />
          </Link>
          <h1 className="text-4xl font-black text-white">Settings.</h1>
        </header>

        <div className="space-y-12">
          {sections.map((section, si) => (
            <section key={si}>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-6 ml-2">{section.title}</h2>
              <div className="glass-panel rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
                {section.items.map((item, ii) => (
                  <button 
                    key={ii}
                    className={`w-full flex items-center justify-between p-6 hover:bg-white/5 transition-all text-left ${ii !== section.items.length - 1 && 'border-b border-white/5'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`size-10 rounded-xl flex items-center justify-center ${item.highlight ? 'brand-gradient text-white' : 'glass-panel text-slate-400'}`}>
                        <item.icon className="size-5" />
                      </div>
                      <span className="font-bold text-white">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-bold ${item.highlight ? 'text-primary' : 'text-slate-500'} uppercase tracking-tight`}>{item.value}</span>
                      <ChevronRight className="size-4 text-slate-700" />
                    </div>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Friendly Buddy Version 1.0.0</p>
          <button className="text-primary/50 text-xs font-black uppercase tracking-widest hover:text-primary transition-colors">Deactivate Account</button>
        </div>
      </div>
    </div>
  );
}
