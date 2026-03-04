"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap'; // We'll install core GSAP and import standard way later if needed, assuming gsap from index for now
import { useGSAP } from '@gsap/react';
import { Shield, Sparkles, HeartPulse, Zap } from 'lucide-react';

// Using standard gsap
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const features = [
    {
        icon: <Sparkles className="w-8 h-8 text-primary" />,
        title: "AI-Powered Matching",
        description: "Our proprietary algorithm learns your preferences to suggest profiles you're most likely to connect with."
    },
    {
        icon: <Shield className="w-8 h-8 text-secondary" />,
        title: "Verified Profiles Only",
        description: "Mandatory photo and ID verification means you never have to worry about catfishes or fake accounts."
    },
    {
        icon: <HeartPulse className="w-8 h-8 text-rose-400" />,
        title: "Meaningful Prompts",
        description: "Go beyond photos with engaging profile prompts that spark natural, genuine conversations."
    },
    {
        icon: <Zap className="w-8 h-8 text-amber-400" />,
        title: "Lightning Fast Chat",
        description: "Real-time messaging built on modern infrastructure for a seamless, delay-free experience."
    }
];

export default function FeaturesSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        // Register scroll trigger safely only on client
        gsap.registerPlugin(ScrollTrigger);

        const cards = cardsRef.current;

        gsap.fromTo(cards,
            {
                y: 100,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom 60%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section id="features" ref={sectionRef} className="py-32 relative bg-surface-light overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

            <div className="container relative z-10" ref={containerRef}>
                <div className="text-center max-w-3xl mx-auto mb-20 px-4">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Built for Intentional Dating.</h2>
                    <p className="text-xl text-text-muted">
                        We've reimagined every aspect of the dating app experience to prioritize quality, safety, and modern design.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            ref={(el: HTMLDivElement | null) => { cardsRef.current[index] = el; }}
                            className="glass p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 border border-border group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-black/20">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-semibold mb-4 text-white">{feature.title}</h3>
                            <p className="text-text-muted leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
