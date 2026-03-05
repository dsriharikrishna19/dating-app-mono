import { ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface BadgeProps {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'pink' | 'default';
    size?: 'sm' | 'md';
    className?: string;
}

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
    const variants = {
        primary: 'bg-primary/10 border-primary/20 text-primary',
        secondary: 'bg-secondary/10 border-secondary/20 text-secondary',
        pink: 'bg-pink-500/10 border-pink-500/20 text-pink-400',
        default: 'bg-white/5 border-white/10 text-slate-300',
    };

    const sizes = {
        sm: 'px-3 py-1 text-[10px]',
        md: 'px-4 py-1.5 text-xs',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center gap-1 rounded-full border font-bold uppercase tracking-widest',
                variants[variant],
                sizes[size],
                className
            )}
        >
            {children}
        </span>
    );
}
