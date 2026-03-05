import { ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    as?: 'div' | 'article' | 'section';
}

export function Card({ children, className, hover = false, as: Tag = 'div' }: CardProps) {
    return (
        <Tag
            className={cn(
                'glass-card',
                hover && 'hover:border-white/20 transition-all duration-300',
                className
            )}
        >
            {children}
        </Tag>
    );
}
