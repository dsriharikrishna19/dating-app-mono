"use client";

import { useState, useEffect, useRef } from 'react';
import { Flame, Menu, X } from 'lucide-react';
import Button from '../ui/Button';
import { useAppDispatch } from '@/store/hooks';
import { openWaitlistModal } from '@/store/slices/uiSlice';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dispatch = useAppDispatch();
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useGSAP(() => {
        if (!mobileMenuRef.current) return;

        if (isMobileMenuOpen) {
            gsap.to(mobileMenuRef.current, {
                y: 0,
                opacity: 1,
                display: 'flex',
                duration: 0.4,
                ease: 'power3.out'
            });
        } else {
            gsap.to(mobileMenuRef.current, {
                y: -20,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    if (mobileMenuRef.current) mobileMenuRef.current.style.display = 'none';
                }
            });
        }
    }, [isMobileMenuOpen]);

    const navLinks = [
        { name: 'Features', href: '#features' },
        { name: 'How it Works', href: '#how-it-works' },
        { name: 'Testimonials', href: '#testimonials' },
    ];

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-4 shadow-lg' : 'bg-transparent py-6'
                    }`}
            >
                <div className="container flex items-center justify-between">
                    <a href="#" className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                        <Flame className="w-8 h-8 text-primary" />
                        <span>Aura</span>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        <ul className="flex items-center gap-8 text-text-muted font-medium">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="hover:text-primary transition-colors">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <Button size="sm" onClick={() => dispatch(openWaitlistModal())}>
                            Join Waitlist
                        </Button>
                    </nav>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2 text-text"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            <div
                ref={mobileMenuRef}
                className="fixed inset-0 z-40 glass pt-24 px-6 md:hidden flex-col hidden opacity-0 translate-y-[-20px]"
            >
                <ul className="flex flex-col gap-6 text-xl font-medium mb-8">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <a
                                href={link.href}
                                className="block py-2 text-text hover:text-primary transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
                <Button
                    fullWidth
                    size="lg"
                    onClick={() => {
                        setIsMobileMenuOpen(false);
                        dispatch(openWaitlistModal());
                    }}
                >
                    Join Waitlist
                </Button>
            </div>
        </>
    );
}
