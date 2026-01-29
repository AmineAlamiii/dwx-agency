import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4 px-4 sm:px-6 lg:px-8' : 'py-6 px-6 sm:px-12 lg:px-20'
        }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <nav
        className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 ${isScrolled
          ? 'glass-strong px-6 py-3 rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
          : 'bg-transparent px-0 py-0 rounded-none border-none shadow-none'
          }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 group-hover:border-primary/50 transition-all duration-500 shadow-[0_0_20px_rgba(0,163,255,0.1)] group-hover:shadow-[0_0_30px_rgba(0,163,255,0.3)]">
            <svg viewBox="0 0 100 100" className="w-6 h-6">
              <path d="M25 30V70H45C55 70 60 65 60 50C60 35 55 30 45 30H25ZM35 40H45C50 40 52 42 52 50C52 58 50 60 45 60H35V40Z" fill="currentColor" className="text-primary" />
              <path d="M65 30L75 50L65 70H75L82 55L89 70H100L90 50L100 30H90L82 45L74 30H65Z" fill="white" transform="translate(-5, 0)" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-display font-bold gradient-text tracking-tighter leading-none">DWX</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold leading-none mt-1">Systems</span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <motion.a
          href="#contact"
          className="hidden md:inline-flex px-5 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Get Started
        </motion.a>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <motion.div
        className={`md:hidden fixed inset-x-4 top-20 glass-strong rounded-2xl p-6 ${isMenuOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : -20 }}
      >
        <div className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-lg text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-4 px-5 py-3 text-center font-medium bg-primary text-primary-foreground rounded-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Get Started
          </a>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;
