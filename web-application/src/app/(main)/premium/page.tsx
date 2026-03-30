'use client';

import { motion } from 'framer-motion';
import { Check, Star, Zap, Shield, Crown } from 'lucide-react';

const PLANS = [
  {
    name: 'Plus',
    price: '$9.99',
    description: 'The basics to get you started.',
    icon: Star,
    features: ['Unlimited Likes', '1 Free Boost/mo', 'See Who Likes You'],
    color: 'slate',
  },
  {
    name: 'Gold',
    price: '$19.99',
    description: 'Our most popular choice.',
    icon: Zap,
    features: ['Everything in Plus', '5 Super Likes/d', 'Passport to any City'],
    color: 'primary',
    popular: true,
  },
  {
    name: 'Platinum',
    price: '$29.99',
    description: 'Maximum visibility & matches.',
    icon: Crown,
    features: ['Everything in Gold', 'Priority Likes', 'Message before Matching'],
    color: 'indigo',
  }
];

export default function PremiumPage() {
  return (
    <div className="flex-1 p-4 lg:p-6 flex flex-col gap-12 max-w-6xl mx-auto w-full pb-20 overflow-y-auto">
      
      {/* Header: Compact Professional Style */}
      <header className="text-center flex flex-col gap-3">
        <div className="flex items-center justify-center gap-2 text-primary">
          <Crown className="size-4 fill-current" />
          <span className="font-bold uppercase tracking-widest text-[10px]">Membership Tier</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">Level Up Your Game</h1>
        <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-sm mx-auto">
          Choose a plan that fits your dating style and speed.
        </p>
      </header>

      {/* Pricing Cards: High Density (p-5) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLANS.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-panel border rounded-2xl p-5 flex flex-col gap-6 relative shadow-2xl group transition-all ${
              plan.popular ? 'border-primary/40 bg-primary/[0.03]' : 'border-white/5'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full brand-gradient text-[8px] font-black text-white uppercase tracking-widest shadow-xl">
                Most Popular
              </div>
            )}

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <plan.icon className="size-5 text-primary" />
                <h3 className="text-lg font-black text-white tracking-tight leading-none">{plan.name}</h3>
              </div>
              <p className="text-slate-500 text-[11px] font-medium leading-tight">{plan.description}</p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-white tracking-tighter">{plan.price}</span>
              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">/ Month</span>
            </div>

            <button className={`w-full py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-xl transition-all active:scale-95 ${
              plan.popular ? 'brand-gradient text-white' : 'glass-panel border border-white/10 text-slate-300 hover:text-white'
            }`}>
              Select {plan.name}
            </button>

            <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
              {plan.features.map((feature, j) => (
                <div key={j} className="flex items-center gap-2.5 text-slate-400 group-hover:text-slate-300 transition-colors">
                  <Check className="size-3.5 text-primary shrink-0" />
                  <span className="text-[11px] font-semibold tracking-tight">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comparison: Dense Grid */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <h2 className="text-[10px] font-black text-white uppercase tracking-widest">Detailed Comparison</h2>
          <div className="h-px flex-1 bg-white/5" />
        </div>

        <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-2 p-4 lg:p-5 items-center bg-white/[0.02]">
            <span className="text-xs font-bold text-slate-300">Boosts and Super Likes</span>
            <div className="flex items-center gap-1.5 justify-end">
              <Zap className="size-3.5 text-primary" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Premium Only</span>
            </div>
          </div>
          <div className="h-px bg-white/5" />
          <div className="grid grid-cols-2 p-4 lg:p-5 items-center">
            <span className="text-xs font-bold text-slate-300">Identity Verification</span>
            <div className="flex items-center gap-1.5 justify-end">
              <Shield className="size-3.5 text-emerald-500" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">All Tiers</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
