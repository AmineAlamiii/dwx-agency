import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlowButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
  className?: string;
}

const GlowButton = ({ children, variant = 'primary', onClick, className = '' }: GlowButtonProps) => {
  const baseStyles = 'relative px-8 py-4 font-display font-semibold text-base rounded-xl overflow-hidden transition-all duration-300';
  
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:shadow-[0_0_40px_hsl(var(--primary)/0.4)]',
    secondary: 'bg-secondary text-secondary-foreground hover:shadow-[0_0_40px_hsl(var(--secondary)/0.4)]',
    outline: 'bg-transparent border border-primary/50 text-primary hover:border-primary hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)]',
  };

  return (
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Animated glow effect */}
      <motion.div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: variant === 'primary' 
            ? 'radial-gradient(circle at center, hsl(var(--primary) / 0.3) 0%, transparent 70%)'
            : variant === 'secondary'
            ? 'radial-gradient(circle at center, hsl(var(--secondary) / 0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle at center, hsl(var(--primary) / 0.2) 0%, transparent 70%)',
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default GlowButton;
