'use client';

import { motion } from 'framer-motion';
import { Shield, Bell, Eye, LogOut, ChevronRight, Moon, UserMinus, HelpCircle } from 'lucide-react';

const SETTINGS_GROUPS = [
  {
    title: 'Discovery Preferences',
    items: [
      { icon: ChevronRight, label: 'Location', value: 'San Francisco, CA' },
      { icon: ChevronRight, label: 'Distance', value: '50 mi' },
      { icon: ChevronRight, label: 'Age Range', value: '18 - 35' },
    ]
  },
  {
    title: 'Account Settings',
    items: [
      { icon: Bell, label: 'Notifications', value: 'On' },
      { icon: Shield, label: 'Privacy & Safety', value: '' },
      { icon: UserMinus, label: 'Blocked', value: '0' },
    ]
  },
  {
    title: 'App Preferences',
    items: [
      { icon: Moon, label: 'Dark Mode', value: 'Always On' },
      { icon: Eye, label: 'Incognito', value: 'Off' },
    ]
  }
];

export default function SettingsPage() {
  return (
    <div className="flex-1 px-6 py-4 flex flex-col gap-10 w-full overflow-y-auto">
      
      {/* Header Area: Compact Style */}
      <header className="flex flex-col gap-1.5 px-2">
        <h1 className="text-2xl font-black text-white tracking-tight">Settings</h1>
        <p className="text-slate-600 font-bold uppercase tracking-widest text-[9px]">Manage preferences</p>
      </header>

      {/* Settings Groups: Flex-Col + Gap instead of Margins */}
      <div className="flex flex-col gap-8">
        {SETTINGS_GROUPS.map((group, i) => (
          <section key={i} className="flex flex-col gap-3">
            <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-4">{group.title}</h2>
            
            <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden divide-y divide-white/5 shadow-2xl transition-all">
              {group.items.map((item, j) => (
                <button 
                  key={j} 
                  className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                      <item.icon className="size-4.5 text-slate-500 group-hover:text-primary transition-colors" />
                    </div>
                    <span className="font-bold text-white tracking-tight text-sm">{item.label}</span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-500">
                    <span className="text-xs font-semibold">{item.value}</span>
                    <ChevronRight className="size-3.5 opacity-30 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>
          </section>
        ))}

        {/* Action Zone: Compact Buttons */}
        <section className="flex flex-col gap-6 pt-6 border-t border-white/5">
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 p-3.5 rounded-xl glass-panel border border-white/5 text-slate-500 font-bold text-xs hover:text-white transition-all active:scale-95">
              <HelpCircle className="size-4" />
              Help Center
            </button>
            <button className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-primary/5 border border-primary/20 text-primary font-bold text-xs hover:bg-primary/10 transition-all shadow-lg active:scale-95">
              <LogOut className="size-4" />
              Sign Out
            </button>
          </div>
          
          <button className="w-full py-2 text-center text-rose-500/20 hover:text-rose-500 font-bold text-[9px] uppercase tracking-widest transition-all">
            Delete Account
          </button>
        </section>
      </div>

      {/* Fixed Save CTA: Scaled Down for Density */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="px-8 py-3 rounded-xl brand-gradient text-white font-black uppercase text-xs tracking-widest shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all">
          Save Changes
        </button>
      </div>
    </div>
  );
}
