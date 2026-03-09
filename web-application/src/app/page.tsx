'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import Features from '@/components/home/Features';
import HowItWorks from '@/components/home/HowItWorks';
import Showcase from '@/components/home/Showcase';
import Testimonials from '@/components/home/Testimonials';
import Safety from '@/components/home/Safety';
import CTA from '@/components/home/CTA';
import AppDownload from '@/components/home/AppDownload';
import HomeFooter from '@/components/home/HomeFooter';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const featuresRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Feature cards animation
      if (featuresRef.current) {
        gsap.from('.feature-card', {
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 80%',
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out'
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col gap-6 min-h-screen bg-background-dark">
      <Hero />
      <Stats />
      <Features ref={featuresRef} />

      {/* New section */}
      <div id="how-it-works"><HowItWorks /></div>

      <Showcase />
      <Testimonials />
      <Safety />
      <AppDownload />
      <CTA />
      <HomeFooter />
    </div>
  );
}
