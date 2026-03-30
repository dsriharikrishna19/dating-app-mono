'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Heart, ArrowRight, ArrowLeft, Check, Camera, Sparkles } from 'lucide-react';

// Steps: 1. Profile, 2. Interests, 3. Photos, 4. Success
export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    gender: '',
    bio: '',
    interests: [] as string[],
    images: [] as string[],
  });

  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleComplete = async () => {
    // In a real app, send all data to the backend here
    router.push('/discover');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-12 px-6">
      {/* Progress Bar */}
      <div className="w-full max-w-md flex flex-col gap-4 mb-12">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Step {step} of 4</span>
          <span className="text-xs font-black text-primary">{Math.round((step / 4) * 100)}%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full brand-gradient"
            initial={{ width: 0 }}
            animate={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      <div className="w-full max-w-md pb-20">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <h1 className="text-4xl font-black text-white">The Basics.</h1>
              <p className="text-slate-400 font-medium">Tell us a bit about yourself to get started.</p>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white/10 transition-all font-medium"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Birthday</label>
                  <input 
                    type="date"
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white/10 transition-all font-medium"
                    value={formData.birthDate}
                    onChange={e => setFormData({...formData, birthDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Gender</label>
                  <div className="flex gap-4">
                    {['Male', 'Female', 'Other'].map(g => (
                      <button
                        key={g}
                        onClick={() => setFormData({...formData, gender: g})}
                        className={`flex-1 py-4 rounded-2xl font-bold transition-all border ${
                          formData.gender === g 
                          ? 'brand-gradient border-transparent text-white shadow-lg shadow-primary/20' 
                          : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <h1 className="text-4xl font-black text-white">Your Interests.</h1>
              <p className="text-slate-400 font-medium">Select at least 5 things you love.</p>
              
              <div className="flex flex-wrap gap-3">
                {['Travel', 'Music', 'Cooking', 'Art', 'Sports', 'Gaming', 'Reading', 'Movies', 'Tech', 'Yoga', 'Nature', 'Coffee', 'Wine', 'Dancing'].map(interest => (
                  <button
                    key={interest}
                    onClick={() => {
                      const newInterests = formData.interests.includes(interest)
                        ? formData.interests.filter(i => i !== interest)
                        : [...formData.interests, interest];
                      setFormData({...formData, interests: newInterests});
                    }}
                    className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all border ${
                      formData.interests.includes(interest)
                      ? 'brand-gradient border-transparent text-white shadow-lg shadow-primary/20'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <h1 className="text-4xl font-black text-white">Show Yourself.</h1>
              <p className="text-slate-400 font-medium">Add at least 2 photos to stand out.</p>
              
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div 
                    key={i}
                    className="aspect-[3/4] rounded-3xl border-2 border-dashed border-white/10 bg-white/5 flex flex-col items-center justify-center hover:border-primary/50 transition-colors cursor-pointer group"
                  >
                    <div className="size-12 rounded-full bg-white/5 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <Camera className="size-6 text-slate-500" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Upload Photo</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="size-24 brand-gradient rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/40">
                <Sparkles className="size-12 text-white" />
              </div>
              <h1 className="text-4xl font-black text-white mb-4">You're All Set!</h1>
              <p className="text-slate-400 max-w-xs mx-auto mb-12">Your profile is ready. Start meeting amazing people near you.</p>
              
              <button
                onClick={handleComplete}
                className="w-full py-5 rounded-2xl brand-gradient text-white font-black text-xl shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 uppercase tracking-tighter"
              >
                Start Discovery
                <Heart className="size-6 fill-current" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        {step < 4 && (
          <div className="fixed bottom-10 left-0 right-0 px-6 max-w-md mx-auto flex gap-4">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="size-16 rounded-2xl glass-panel border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all text-slate-400"
              >
                <ArrowLeft className="size-6" />
              </button>
            )}
            <button
              onClick={nextStep}
              className="flex-1 rounded-2xl brand-gradient text-white font-black text-xl flex items-center justify-center gap-3 shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Continue
              <ArrowRight className="size-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
