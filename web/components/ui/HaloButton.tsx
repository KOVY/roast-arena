import React from 'react';
import { motion } from 'framer-motion';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function HaloButton({ children, className = '', ...rest }: Props) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={elative px-4 py-2 rounded-lg text-white font-semibold transition-shadow \}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
        boxShadow: '0 6px 20px rgba(99,102,241,0.12)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
      {...rest}
    >
      {/* halo glow */}
      <span
        aria-hidden
        className='absolute inset-0 rounded-lg'
        style={{
          boxShadow: '0 0 24px 6px rgba(99,102,241,0.16)',
          filter: 'blur(6px)',
          zIndex: -1,
        }}
      />
      <span className='relative z-10'>{children}</span>
    </motion.button>
  );
}
