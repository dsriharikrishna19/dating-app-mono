'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, MessageCircle, Users, Star, Settings, User } from 'lucide-react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { icon: Users, label: 'Discover', href: '/discover' },
  { icon: Heart, label: 'Likes', href: '/likes' },
  { icon: MessageCircle, label: 'Messages', href: '/messages' },
  { icon: Star, label: 'Premium', href: '/premium' },
];

const SECONDARY_NAV = [
  { icon: User, label: 'Profile', href: '/profile' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Vertical Sidebar: Refactored with Flex + Gap, Compact Padding */}
      <aside className="hidden lg:flex w-64 border-r border-white/5 flex-col p-4 h-screen sticky top-0 bg-[#05070A] shrink-0 gap-8">
        <Link href="/" className="size-10 rounded-xl brand-gradient flex items-center justify-center shadow-xl shadow-primary/20 mx-auto lg:mx-0">
          <Heart className="size-6 text-white fill-current" />
        </Link>

        {/* Navigation Group: Flex-Col + Gap instead of Margins */}
        <nav className="flex-1 flex flex-col gap-2">
          {NAV_ITEMS.map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={i} 
                href={item.href}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all relative group h-11 ${
                  isActive 
                  ? 'bg-primary/10 text-primary border border-primary/10' 
                  : 'text-slate-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className={`size-5 ${isActive ? 'fill-current' : ''}`} />
                <span className="hidden lg:block font-bold text-[11px] uppercase tracking-[0.2em]">{item.label}</span>
                
                {isActive && (
                  <motion.div 
                    layoutId="activeNavDesktop"
                    className="absolute left-0 w-1 h-5 brand-gradient rounded-r-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Navigation: Compact and Aligned */}
        <div className="flex flex-col gap-2 pt-4 border-t border-white/5">
          {SECONDARY_NAV.map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={i}
                href={item.href} 
                className={`flex items-center gap-3 p-3 rounded-xl transition-all h-11 ${
                  isActive 
                  ? 'bg-white/5 text-white border border-white/10' 
                  : 'text-slate-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="size-5" />
                <span className="hidden lg:block font-bold text-[10px] uppercase tracking-widest">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Mobile Bottom Navigation: Refactored for Density */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-[#05070A]/80 backdrop-blur-2xl border-t border-white/10 px-4 py-3 flex items-center justify-between shadow-2xl safe-area-bottom gap-2">
        {[...NAV_ITEMS, ...SECONDARY_NAV].map((item, i) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={i} 
              href={item.href}
              className={`relative flex flex-col items-center gap-1 transition-all flex-1 min-w-0 ${
                isActive ? 'text-primary' : 'text-slate-500'
              }`}
            >
              <div className={`p-1.5 rounded-lg transition-all ${isActive ? 'bg-primary/10' : ''}`}>
                <item.icon className={`size-5 ${isActive ? 'fill-current' : ''}`} />
              </div>
              <span className="text-[7px] font-black uppercase tracking-tight truncate">{item.label}</span>
              
              {isActive && (
                <motion.div 
                  layoutId="activeNavMobile"
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-0.5 brand-gradient rounded-b-full shadow-lg shadow-primary/40"
                />
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
