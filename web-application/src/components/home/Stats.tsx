'use client';

import { forwardRef, memo, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STATS_DATA } from '@/constants/stats';

gsap.registerPlugin(ScrollTrigger);

const Stats = memo(forwardRef<HTMLDivElement>((props, ref) => {
    const stats = useMemo(() => STATS_DATA, []);
    const statsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const numbers = document.querySelectorAll('.stat-number');
            numbers.forEach((num) => {
                const target = parseFloat(num.getAttribute('data-target') || '0');
                gsap.to(num, {
                    innerText: target,
                    duration: 2,
                    snap: { innerText: 1 },
                    scrollTrigger: {
                        trigger: num,
                        start: 'top 90%',
                    },
                    ease: 'power2.out'
                });
            });
        }, statsRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={ref} id="stats" className="py-20 border-y border-white/5 bg-white/[0.02] backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div ref={statsRef} className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="stat-item text-center group cursor-default flex flex-col gap-1">
                        <div className="flex items-baseline justify-center gap-0">
                            <span
                                className="stat-number text-4xl md:text-5xl font-black text-white"
                                data-target={stat.value}
                            >
                                0
                            </span>
                            <span className="text-4xl md:text-5xl font-black text-primary">
                                {stat.suffix}
                            </span>
                        </div>
                        <p className="text-slate-500 text-[10px] uppercase tracking-[0.25em] font-black group-hover:text-slate-400 transition-colors">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}));

Stats.displayName = 'Stats';

export default Stats;
