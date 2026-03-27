'use client'

import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion'

interface MotionProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
}

export const FadeIn = ({ children, className, ...props }: MotionProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
)

export const SlideUp = ({ children, className, ...props }: MotionProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
)

export const StaggerContainer = ({
  children,
  className,
  staggerDelay = 0.1,
  ...props
}: MotionProps & { staggerDelay?: number }) => (
  <motion.div
    initial="initial"
    animate="animate"
    variants={{
      animate: {
        transition: {
          staggerChildren: staggerDelay,
        },
      },
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
)
