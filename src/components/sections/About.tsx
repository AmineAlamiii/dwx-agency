import { motion } from 'framer-motion';
import { Target, Cpu, Glasses, Globe } from 'lucide-react';

const reasons = [
  {
    icon: Target,
    title: 'Vision-Driven',
    description: 'We don’t just build websites; we architect digital destinations that align with your long-term legacy.',
    color: 'text-blue-500'
  },
  {
    icon: Cpu,
    title: 'Tech-First',
    description: 'Utilizing the bleeding edge of the React ecosystem to deliver unmatched site performance and stability.',
    color: 'text-indigo-500'
  },
  {
    icon: Glasses,
    title: 'Pixel Perfect',
    description: 'Every shadow, every animation, and every line of code is scrutinized to ensure a flawless user experience.',
    color: 'text-cyan-500'
  },
  {
    icon: Globe,
    title: 'Global Impact',
    description: 'Our solutions are built to scale, helping brands reach audiences across every continent with zero friction.',
    color: 'text-blue-400'
  },
];

const About = () => {
  return (
    <section id="about" className="py-20 md:py-40 relative bg-transparent overflow-hidden">
      {/* Background Decorative */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Legacy & Mission</span>
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tighter leading-tight">
              Why <span className="gradient-text">Brands Trust</span> DWX
            </h2>
            <p className="text-xl text-muted-foreground font-light leading-relaxed mb-10 max-w-xl">
              DWX Agency was built on the intersection of technical excellence and cinematic aesthetics.
              We don't settle for "good enough"—we push until the experience is unforgettable.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              {reasons.map((item, idx) => (
                <div key={idx} className="space-y-4 group">
                  <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform duration-500`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold tracking-tight">{item.title}</h4>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-indigo-600/20" />
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&h=1000&fit=crop"
                alt="Our Workspace"
                className="w-full h-full object-cover opacity-50 transition-all duration-1000 group-hover:scale-110 group-hover:opacity-60"
              />
              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-black to-transparent">
                <div className="flex gap-10">
                  <div>
                    <div className="text-4xl font-display font-bold text-white mb-1">98%</div>
                    <div className="text-[10px] uppercase tracking-widest text-primary font-bold">Client Success</div>
                  </div>
                  <div>
                    <div className="text-4xl font-display font-bold text-white mb-1">150+</div>
                    <div className="text-[10px] uppercase tracking-widest text-secondary font-bold">Global Projects</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Element */}
            <motion.div
              className="absolute -top-10 -right-10 glass-strong p-8 rounded-3xl border border-white/10 hidden md:block"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="text-5xl font-display font-black text-primary opacity-20 absolute -top-4 -left-2">DWX</div>
              <div className="relative z-10">
                <div className="text-2xl font-bold mb-1">Since 2019</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">Innovation Labs</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
