import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/ui/Hero";
import Link from 'next/link';
import { Heart, MessageCircle, Star, Users } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      
      {/* Features Grid */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Why Friendly Buddy?</h2>
          <p className="text-slate-400 max-w-xl mx-auto">We've reimagined dating with a focus on chemistry and real-time interactions.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Users, title: "Smart Matching", desc: "Our algorithm finds people you actually want to talk to." },
            { icon: MessageCircle, title: "Real-time Chat", desc: "Instant messaging with presence indicators and typing states." },
            { icon: Heart, title: "Gold Exclusive", desc: "See who likes you before you even swipe. No waiting." },
            { icon: Star, title: "Premium Perks", desc: "Verified profiles, unlimited rewinds, and global passport." },
          ].map((feature, i) => (
            <div key={i} className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-primary/20 transition-all group">
              <div className="size-14 rounded-2xl brand-gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="size-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 text-center">
        <div className="glass-panel max-w-4xl mx-auto p-12 rounded-[2.5rem] border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 size-80 brand-gradient rounded-full blur-[100px] opacity-10 -z-10 translate-x-1/2 -translate-y-1/2"></div>
          
          <h2 className="text-4xl font-black text-white mb-8 leading-tight">Ready to find your <br/><span className="text-gradient">favorite human?</span></h2>
          <Link href="/register" className="inline-flex px-12 py-5 rounded-2xl brand-gradient text-xl font-black text-white shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-tighter">
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center">
        <p className="text-slate-500 text-sm">© 2026 Friendly Buddy. All rights reserved. Crafted with ❤️ for real connections.</p>
      </footer>
    </main>
  );
}
