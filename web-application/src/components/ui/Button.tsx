"use client";

import { useAppDispatch } from '@/store/hooks';
import { openWaitlistModal } from '@/store/slices/uiSlice';
import { forwardRef, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    onMouseEnter,
    onMouseLeave,
    onClick,
    ...props
}, ref) => {
    const dispatch = useAppDispatch();

    // Fallback internal ref if none provided from parent to animate
    const internalRef = useRef<HTMLButtonElement>(null);

    const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-primary text-white hover:bg-primary-hover shadow-[0_0_20px_rgba(244,63,94,0.3)]",
        secondary: "bg-secondary text-white hover:bg-secondary/90 shadow-[0_0_20px_rgba(139,92,246,0.3)]",
        outline: "border border-border bg-transparent hover:bg-surface-light text-text",
        ghost: "bg-transparent hover:bg-surface-light text-text",
    };

    const sizes = {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-8 text-base",
        lg: "h-14 px-10 text-lg",
    };

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = (ref as React.RefObject<HTMLButtonElement>)?.current || internalRef.current;
        if (target) {
            gsap.to(target, { scale: 1.05, duration: 0.2, ease: "power2.out" });
        }
        if (onMouseEnter) onMouseEnter(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = (ref as React.RefObject<HTMLButtonElement>)?.current || internalRef.current;
        if (target) {
            gsap.to(target, { scale: 1, duration: 0.2, ease: "power2.out" });
        }
        if (onMouseLeave) onMouseLeave(e);
    };

    const handleMouseDown = () => {
        const target = (ref as React.RefObject<HTMLButtonElement>)?.current || internalRef.current;
        if (target) gsap.to(target, { scale: 0.95, duration: 0.1 });
    };

    const handleMouseUp = () => {
        const target = (ref as React.RefObject<HTMLButtonElement>)?.current || internalRef.current;
        if (target) gsap.to(target, { scale: 1.05, duration: 0.1 });
    };

    return (
        <button
            ref={(node) => {
                // Pass the ref to both parent and internal
                if (typeof ref === 'function') ref(node);
                else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
                (internalRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
            }}
            className={classes}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
});

Button.displayName = 'Button';

export default Button;
