import { motion } from 'framer-motion';
import GlowButton from '../ui/GlowButton';
import { ArrowRight } from 'lucide-react';

const CTABanner = () => {
  return (
    <section className="py-20 md:py-40 relative overflow-hidden bg-transparent">
      {/* Intense Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-blue-900/20 via-indigo-900/20 to-blue-900/20 blur-[150px] opacity-40 animate-pulse" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          className="relative glass-strong p-12 md:p-24 lg:p-32 rounded-[3rem] text-center overflow-hidden border-white/10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Animated Gradient Border */}
          <div className="absolute inset-0 p-px bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-[3rem] pointer-events-none" />

          {/* Internal Orbs */}
          <motion.div
            className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-blue-500/10 blur-[100px]"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-indigo-500/10 blur-[100px]"
            animate={{
              x: [0, -50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />

          <div className="relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="text-secondary font-bold tracking-[0.4em] uppercase text-xs mb-8 block">Project Inquiry</span>
              <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold mb-10 tracking-tighter leading-[0.85]">
                Let's Build <br />
                <span className="gradient-text">The Future.</span>
              </h2>
            </motion.div>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-16 font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Whether you're a startup or a global brand, we're ready to push the boundaries of what's possible for your digital experience.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-8 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <GlowButton variant="primary" className="px-12 py-6 text-xl rounded-full group">
                Establish Contact <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </GlowButton>
              <GlowButton variant="outline" className="px-12 py-6 text-xl rounded-full border-white/10 hover:border-white/20">
                Book Agency Call
              </GlowButton>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Extreme Bottom Glow */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 shadow-[0_0_100px_2px_rgba(59,130,246,0.5)]" />
    </section>
  );
};

export default CTABanner;
