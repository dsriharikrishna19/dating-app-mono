'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Heart, ArrowRight, ArrowLeft, Camera, Sparkles, User, Star, Check } from 'lucide-react';

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

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...formData.images];
        newImages[index] = reader.result as string;
        setFormData({ ...formData, images: newImages });
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleComplete = async () => {
    router.push('/discover');
  };

  return (
    <div className="min-h-screen bg-[#05070A] flex flex-col lg:flex-row overflow-hidden font-sans">
      
      {/* Left Panel: Visual/Branding (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center p-12 overflow-hidden border-r border-white/5">
        <div className="absolute inset-0 brand-gradient opacity-20 blur-[120px] -z-10 animate-pulse"></div>
        <div className="absolute top-0 right-0 size-96 brand-gradient rounded-full blur-[100px] opacity-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 size-80 bg-primary/20 rounded-full blur-[100px] opacity-10 -translate-x-1/2 translate-y-1/2"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center space-y-8"
        >
          <div className="size-32 brand-gradient rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-primary/40 rotate-3">
            <Heart className="size-16 text-white fill-white shadow-lg" />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-5xl font-black text-white leading-tight tracking-tighter">
              Discover your <br />
              <span className="text-gradient">Perfect Match.</span>
            </h2>
            <p className="text-slate-400 text-lg font-medium max-w-sm mx-auto leading-relaxed">
              Join thousands of people finding real connection every single day.
            </p>
          </div>

          <div className="flex justify-center gap-4 pt-8">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="size-12 rounded-full border-2 border-[#05070A] bg-slate-800 flex items-center justify-center overflow-hidden">
                  <div className="size-full bg-gradient-to-br from-slate-700 to-slate-900 group-hover:scale-110 transition-transform"></div>
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="size-3 text-primary fill-primary" />)}
              </div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">4.9/5 Rating</p>
            </div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none"></div>
      </div>

      {/* Right Panel: Interactive Form Area */}
      <div className="flex-1 relative flex flex-col h-screen overflow-y-auto">
        
        {/* Integrated Progress Bar (Slim Header Style) */}
        <div className="sticky top-0 z-50 bg-[#05070A]/80 backdrop-blur-xl border-b border-white/5 py-4 px-6 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="size-10 brand-gradient rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Heart className="size-5 text-white fill-white" />
            </div>
            <span className="text-sm font-black text-white tracking-tight uppercase">Friendly Buddy</span>
          </div>

          <div className="flex flex-col items-end gap-1 flex-1 max-w-[200px] ml-auto">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Step {step} of 4</span>
              <span className="text-xs font-black text-primary leading-none">{Math.round((step / 4) * 100)}%</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full brand-gradient"
                initial={{ width: 0 }}
                animate={{ width: `${(step / 4) * 100}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              />
            </div>
          </div>
        </div>

        {/* Dynamic Form Content */}
        <main className="flex-1 p-8 lg:p-24 lg:pt-20 lg:max-w-3xl mx-auto w-full flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-10"
              >
                <div className="space-y-4">
                  <h1 className="text-5xl font-black text-white leading-none tracking-tighter">The Basics.</h1>
                  <p className="text-slate-400 text-lg font-medium leading-relaxed">Tell us a bit about yourself to get started.</p>
                </div>
                
                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="size-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                      </div>
                      <input 
                        type="text" 
                        placeholder="John Doe"
                        className="w-full pl-12 pr-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white/10 transition-all font-medium text-lg placeholder:text-slate-700"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Birthday</label>
                    <input 
                      type="date"
                      className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white/10 transition-all font-medium text-lg color-scheme-dark"
                      value={formData.birthDate}
                      onChange={e => setFormData({...formData, birthDate: e.target.value})}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Gender Identification</label>
                    <div className="flex gap-4">
                      {['Male', 'Female', 'Other'].map(g => (
                        <button
                          key={g}
                          onClick={() => setFormData({...formData, gender: g})}
                          className={`flex-1 py-5 rounded-2xl font-black text-sm transition-all border uppercase tracking-tighter ${
                            formData.gender === g 
                            ? 'brand-gradient border-transparent text-white shadow-xl shadow-primary/30 scale-[1.02]' 
                            : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/20 hover:bg-white/10'
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-10"
              >
                <div className="space-y-4">
                  <h1 className="text-5xl font-black text-white leading-none tracking-tighter">Your Interests.</h1>
                  <p className="text-slate-400 text-lg font-medium leading-relaxed">Select at least 5 things you love.</p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {['Travel', 'Music', 'Cooking', 'Art', 'Sports', 'Gaming', 'Reading', 'Movies', 'Tech', 'Yoga', 'Nature', 'Coffee', 'Wine', 'Dancing', 'Design', 'Fashion', 'Fitness', 'Foodie'].map(interest => (
                    <button
                      key={interest}
                      onClick={() => {
                        const newInterests = formData.interests.includes(interest)
                          ? formData.interests.filter(i => i !== interest)
                          : [...formData.interests, interest];
                        setFormData({...formData, interests: newInterests});
                      }}
                      className={`px-8 py-3.5 rounded-full font-bold text-sm transition-all border ${
                        formData.interests.includes(interest)
                        ? 'brand-gradient border-transparent text-white shadow-xl shadow-primary/30 scale-[1.05]'
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-10"
              >
                <div className="space-y-4">
                  <h1 className="text-5xl font-black text-white leading-none tracking-tighter">Show Yourself.</h1>
                  <p className="text-slate-400 text-lg font-medium leading-relaxed">Add high-quality photos to get more matches.</p>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Primary Photo Slot */}
                  <div 
                    onClick={() => document.getElementById('image-0')?.click()}
                    className="col-span-2 row-span-2 aspect-[3/4] rounded-[2.5rem] border-2 border-dashed border-primary/20 bg-primary/5 flex flex-col items-center justify-center hover:border-primary/50 transition-all cursor-pointer group relative overflow-hidden"
                  >
                    {formData.images[0] ? (
                      <img src={formData.images[0]} alt="Primary" className="size-full object-cover" />
                    ) : (
                      <>
                        <div className="size-20 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Camera className="size-10 text-primary" />
                        </div>
                        <span className="text-sm font-black uppercase tracking-widest text-primary">Main Photo</span>
                      </>
                    )}
                    <div className="absolute top-4 right-4 bg-primary px-3 py-1.5 rounded-full text-[10px] font-black text-white uppercase tracking-widest">Required</div>
                    <input 
                      id="image-0"
                      type="file" 
                      accept="image/*"
                      className="hidden" 
                      onChange={(e) => handleImageUpload(0, e)}
                    />
                  </div>

                  {/* Secondary Photo Slots */}
                  {[1, 2, 3, 4, 5].map(i => (
                    <div 
                      key={i}
                      onClick={() => document.getElementById(`image-${i}`)?.click()}
                      className="aspect-square rounded-3xl border-2 border-dashed border-white/10 bg-white/5 flex flex-col items-center justify-center hover:border-primary/50 transition-all cursor-pointer group relative overflow-hidden"
                    >
                      {formData.images[i] ? (
                        <img src={formData.images[i]} alt={`Extra ${i}`} className="size-full object-cover" />
                      ) : (
                        <Camera className="size-6 text-slate-500 group-hover:text-primary transition-colors" />
                      )}
                      <input 
                        id={`image-${i}`}
                        type="file" 
                        accept="image/*"
                        className="hidden" 
                        onChange={(e) => handleImageUpload(i, e)}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-12 py-12"
              >
                <div className="relative inline-block">
                  <div className="size-32 brand-gradient rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-primary/40">
                    <Sparkles className="size-16 text-white" />
                  </div>
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -inset-4 brand-gradient rounded-full blur-[40px] -z-10"
                  />
                </div>

                <div className="space-y-4">
                  <h1 className="text-6xl font-black text-white tracking-tighter leading-none">You're Ready.</h1>
                  <p className="text-slate-400 text-lg font-medium max-w-sm mx-auto leading-relaxed">
                    Welcome to the club! Your profile is now visible to people near you.
                  </p>
                </div>
                
                <button
                  onClick={handleComplete}
                  className="w-full lg:max-w-md mx-auto py-6 rounded-[2rem] brand-gradient text-white font-black text-2xl shadow-2xl shadow-primary/40 flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-tighter"
                >
                  Enter Discovery
                  <Heart className="size-8 fill-current" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Global Navigation Fixed Bottom Area */}
        {step < 4 && (
          <div className="sticky bottom-0 bg-[#05070A]/80 backdrop-blur-xl border-t border-white/5 p-4 flex gap-4 w-full">
            <div className="flex gap-4 w-full max-w-3xl mx-auto">
              {step > 1 && (
                <button
                  onClick={prevStep}
                  className="size-2xl p-4 rounded-2xl glass-panel border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all text-slate-400 shrink-0"
                >
                  <ArrowLeft className="size-8" />
                </button>
              )}
              <button
                onClick={nextStep}
                className="flex-1 size-2xl p-4 rounded-2xl brand-gradient text-white font-black text-2xl flex items-center justify-center gap-3 shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-tighter"
              >
                Continue
                <ArrowRight className="size-8" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
