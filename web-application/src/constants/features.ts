import { ReactNode } from 'react';

export interface Feature {
    icon: ReactNode;
    title: string;
    desc: string;
    color: string;
    bg: string;
    accent: string;
}

// Icons are injected at component level via index mapping
export const FEATURES_DATA = [
    {
        iconKey: 'zap',
        title: 'Bio-Matching',
        desc: 'Deep compatibility mapping based on your biometric personality and values.',
        color: 'text-primary',
        bg: 'bg-primary/10',
        accent: 'shadow-primary/20',
    },
    {
        iconKey: 'shield',
        title: 'Real Identity',
        desc: 'Advanced biometric verification ensures every user is genuine and verified.',
        color: 'text-secondary',
        bg: 'bg-secondary/10',
        accent: 'shadow-secondary/20',
    },
    {
        iconKey: 'message',
        title: 'Pure Motion',
        desc: 'High-performance interface designed for seamless social interactions.',
        color: 'text-pink-500',
        bg: 'bg-pink-500/10',
        accent: 'shadow-pink-500/20',
    },
] as const;

export type FeatureKey = typeof FEATURES_DATA[number]['iconKey'];
