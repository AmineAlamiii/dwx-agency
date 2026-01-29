import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import AnimatedText from '../ui/AnimatedText';
import GlowButton from '../ui/GlowButton';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const subheadingLines = [
    'We craft high-end digital experiences',
    'for the next generation of startups.',
    'Where elite design meets technical excellence.'
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center section-padding overflow-hidden bg-transparent"
    >
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-secondary/20 rounded-full blur-[150px]"
          animate={{
            x: [0, -40, 0],
            y: [0, -60, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <motion.div
        style={{ y: y1, opacity }}
        className="container-custom text-center relative z-10"
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border border-primary/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-sm font-medium tracking-wider uppercase text-primary/80">
            Digital Meets Experience
          </span>
        </motion.div>

        {/* Main headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold leading-[0.9] tracking-tight mb-8">
          <div className="overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.4 }}
            >
              DWX <span className="gradient-text">—</span>
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span
              className="block gradient-text brightness-125"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.6 }}
            >
              Beyond
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span
              className="block text-foreground/90"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.8 }}
            >
              Digital.
            </motion.span>
          </div>
        </h1>

        {/* Subheading */}
        <div className="max-w-3xl mx-auto mb-12 space-y-2">
          {subheadingLines.map((line, index) => (
            <motion.p
              key={index}
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-light leading-relaxed"
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{
                duration: 1,
                delay: 1.2 + index * 0.2,
                ease: "easeOut",
              }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <GlowButton variant="primary" className="px-10 py-4 text-lg">
            Start a Project
          </GlowButton>
          <GlowButton variant="outline" className="px-10 py-4 text-lg border-white/10 hover:border-primary/50">
            Book a Call
          </GlowButton>
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-20" />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50">Scroll</span>
          <motion.div
            className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"
            animate={{ scaleY: [0, 1, 0], y: [0, 10, 20] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
