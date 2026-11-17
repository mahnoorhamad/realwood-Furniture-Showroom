import type {ReactNode} from 'react';
import {motion} from 'motion/react';

const LUXURY_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeUp({children, className = '', delay = 0}: FadeUpProps) {
  return (
    <motion.div
      initial={{opacity: 0, y: 16}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.05}}
      transition={{duration: 0.55, delay, ease: LUXURY_EASE}}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerGridProps {
  children: ReactNode;
  className?: string;
}

export function StaggerGrid({children, className = ''}: StaggerGridProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{once: true, amount: 0.05}}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.07,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: {opacity: 0, y: 16},
        visible: {
          opacity: 1,
          y: 0,
          transition: {duration: 0.5, ease: LUXURY_EASE},
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
