'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Loader2, ArrowRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/store/slices/authSlice';
import { authService } from '@/services/auth.service';

function VerifyContent() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState(30);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const phoneNumber = searchParams.get('phone') || '';

  useEffect(() => {
    if (!phoneNumber) router.push('/login');
    
    const interval = window.setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [phoneNumber, router]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value[value.length - 1];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length < 6) return;

    setLoading(true);
    setError(null);

    try {
      const response = await authService.verifyOtp(phoneNumber, otpString);
      const { user, token } = response.data;
      
      dispatch(setCredentials({ user, token }));
      
      if (user.onboarded) {
        router.push('/discover');
      } else {
        router.push('/onboarding');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid verification code.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (otp.join('').length === 6) {
      handleVerify();
    }
  }, [otp]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-background">
      <div className="w-full max-w-md glass-panel p-10 rounded-[2.5rem] border border-white/5 text-center">
        <h2 className="text-3xl font-black text-white mb-2">Verify Phone.</h2>
        <p className="text-slate-400 mb-10 font-medium">
          Enter the 6-digit code sent to <br/><span className="text-white">{phoneNumber}</span>
        </p>

        <div className="flex justify-between gap-2 mb-8">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="size-12 md:size-14 text-center text-2xl font-black bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none"
            />
          ))}
        </div>

        {error && (
          <p className="text-primary text-sm font-bold mb-6 bg-primary/10 p-3 rounded-xl border border-primary/20">
            {error}
          </p>
        )}

        <button
          onClick={handleVerify}
          disabled={loading || otp.join('').length < 6}
          className="w-full py-4 rounded-2xl brand-gradient text-white font-black text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-30 transition-all uppercase tracking-tight"
        >
          {loading ? <Loader2 className="size-6 animate-spin" /> : 'Verify Account'}
        </button>

        <div className="mt-8 text-slate-500 text-sm font-medium">
          {timer > 0 ? (
            <span>Resend code in <span className="text-white">{timer}s</span></span>
          ) : (
            <button 
              onClick={() => {
                authService.resendOtp(phoneNumber);
                setTimer(30);
              }}
              className="text-primary font-bold hover:underline"
            >
              Resend verification code
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="animate-spin text-primary" /></div>}>
      <VerifyContent />
    </Suspense>
  );
}
