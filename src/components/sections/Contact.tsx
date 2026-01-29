import { motion } from 'framer-motion';
import { ArrowRight, Mail, MapPin, Phone, MessageSquare } from 'lucide-react';
import GlowButton from '../ui/GlowButton';

const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-40 relative bg-transparent">
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-24">
          {/* Information Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-bold tracking-widest uppercase text-primary">Establish Contact</span>
            </div>

            <h2 className="text-5xl md:text-8xl font-display font-bold mb-10 tracking-tighter leading-[0.9]">
              Let's craft <br />
              <span className="gradient-text">the future</span>
            </h2>

            <p className="text-xl text-muted-foreground font-light leading-relaxed mb-16 max-w-md">
              Whether you have a fully formed idea or just a spark of inspiration, we're here to ignite the digital fire.
            </p>

            <div className="space-y-10">
              <div className="flex items-start gap-6 group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:border-primary/50 group-hover:bg-primary/5">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Direct Mail</h4>
                  <p className="text-2xl font-display font-bold group-hover:text-primary transition-colors cursor-pointer tracking-tight">hello@dwx.agency</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:border-secondary/50 group-hover:bg-secondary/5">
                  <Phone className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Voice Consultation</h4>
                  <p className="text-2xl font-display font-bold group-hover:text-secondary transition-colors cursor-pointer tracking-tight">+1 (555) 0123 4567</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:border-accent/50 group-hover:bg-accent/5">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">HQ Location</h4>
                  <p className="text-2xl font-display font-bold group-hover:text-accent transition-colors tracking-tight">Silicon Valley, CA</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full" />

            <form className="relative glass-strong p-10 md:p-16 rounded-[3rem] border-white/10 border space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary ml-1">Full Identity</label>
                <input
                  type="text"
                  placeholder="What should we call you?"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-lg font-light focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted-foreground/30"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary ml-1">Digital Coordinates</label>
                <input
                  type="email"
                  placeholder="your@nexus.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-lg font-light focus:outline-none focus:border-secondary/50 transition-all placeholder:text-muted-foreground/30"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent ml-1">The Vision</label>
                <textarea
                  rows={5}
                  placeholder="Describe the project scope..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-lg font-light focus:outline-none focus:border-accent/50 transition-all placeholder:text-muted-foreground/30 resize-none"
                />
              </div>

              <GlowButton variant="primary" className="w-full py-6 text-xl rounded-2xl group flex items-center justify-center gap-3">
                Initialize Transmission <MessageSquare className="w-5 h-5 group-hover:scale-125 transition-transform" />
              </GlowButton>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
