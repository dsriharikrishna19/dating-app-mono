'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';

interface AuthFormProps {
  type: 'login' | 'register';
}

export default function AuthForm({ type }: AuthFormProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;

    setLoading(true);
    setError(null);

    try {
      await authService.authenticate(phoneNumber);
      // If successful, redirect to OTP verification
      router.push(`/verify?phone=${encodeURIComponent(phoneNumber)}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="glass-panel p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 size-40 brand-gradient rounded-full blur-[80px] opacity-10 -z-10 translate-x-1/2 -translate-y-1/2"></div>
        
        <h2 className="text-3xl font-black text-white mb-2 leading-tight">
          {type === 'login' ? 'Welcome Back.' : 'Join the Club.'}
        </h2>
        <p className="text-slate-400 mb-8 font-medium">Enter your phone number to {type === 'login' ? 'login' : 'register'}.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Phone Number</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Phone className="size-5 text-slate-500 group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1 234 567 890"
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-600 focus:ring-2 focus:ring-primary/40 focus:bg-white/10 transition-all outline-none"
                required
              />
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-primary text-sm font-bold bg-primary/10 p-3 rounded-xl border border-primary/20"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl brand-gradient text-white font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {loading ? (
              <Loader2 className="size-6 animate-spin" />
            ) : (
              <>
                Continue
                <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
