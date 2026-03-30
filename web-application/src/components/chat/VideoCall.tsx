'use client';

import { motion } from 'framer-motion';
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff, Maximize, Heart } from 'lucide-react';
import { useState } from 'react';

export default function VideoCall({ onLeave }: { onLeave: () => void }) {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex flex-col p-6 lg:p-12"
    >
      <div className="flex-1 relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80" 
          className="size-full object-cover"
          alt="Video Call"
        />
        
        {/* Local Preview */}
        <div className="absolute top-8 right-8 w-40 lg:w-60 aspect-[3/4] rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl bg-slate-900 group">
          <div className="size-full bg-slate-800 flex items-center justify-center">
            <User className="size-12 text-slate-700" />
          </div>
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <div className="size-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">You</span>
          </div>
        </div>

        {/* Call Info */}
        <div className="absolute top-8 left-8 flex flex-col gap-2">
          <div className="inline-flex px-4 py-2 rounded-full glass-panel border border-white/10 items-center gap-2">
            <div className="size-2 bg-primary rounded-full animate-ping" />
            <span className="text-xs font-black uppercase tracking-widest text-white">Live Call • 04:22</span>
          </div>
          <h2 className="text-4xl font-black text-white ml-2">Sarah</h2>
        </div>

        {/* Controls Overlay */}
        <div className="absolute bottom-10 left-0 right-0 flex items-center justify-center gap-6">
          <button 
            onClick={() => setMicOn(!micOn)}
            className={`size-16 rounded-full flex items-center justify-center transition-all ${micOn ? 'glass-panel text-white' : 'bg-primary text-white shadow-xl shadow-primary/20'}`}
          >
            {micOn ? <Mic className="size-6" /> : <MicOff className="size-6" />}
          </button>
          
          <button 
            onClick={onLeave}
            className="size-20 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/40 hover:scale-110 active:scale-95 transition-all"
          >
            <PhoneOff className="size-8 stroke-[3]" />
          </button>

          <button 
            onClick={() => setVideoOn(!videoOn)}
            className={`size-16 rounded-full flex items-center justify-center transition-all ${videoOn ? 'glass-panel text-white' : 'bg-primary text-white shadow-xl shadow-primary/20'}`}
          >
            {videoOn ? <Video className="size-6" /> : <VideoOff className="size-6" />}
          </button>
        </div>

        <button className="absolute bottom-10 right-10 size-16 rounded-full glass-panel flex items-center justify-center text-white hover:bg-white/10 transition-all">
          <Maximize className="size-6" />
        </button>
      </div>
      
      <div className="mt-8 flex items-center justify-center gap-2 text-slate-500">
        <Heart className="size-4 text-primary fill-current" />
        <span className="text-xs font-black uppercase tracking-[0.2em]">Encrypted Connection</span>
      </div>
    </motion.div>
  );
}

function User({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
