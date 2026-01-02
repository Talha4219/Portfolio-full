'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const FadeInUp = ({ children, className, delay = 0 }: AnimatedProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export const FadeIn = ({ children, className, delay = 0 }: AnimatedProps) => (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );

export const ScaleIn = ({ children, className, delay = 0 }: AnimatedProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerContainer = ({ children, className, delay = 0 }: AnimatedProps) => (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
            hidden: {},
            visible: {
                transition: {
                    staggerChildren: 0.15,
                    delayChildren: delay,
                }
            }
        }}
        className={className}
    >
        {children}
    </motion.div>
);

export const StaggerItem = ({ children, className }: { children: ReactNode, className?: string }) => (
    <motion.div
        variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.div>
);
