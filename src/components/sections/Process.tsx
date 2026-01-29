import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Search, Lightbulb, Code2, Rocket, ArrowDown } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discovery & Audit',
    description: 'We tear down your current systems to find the friction points. No fluff, just deep data-driven insights into your market position.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    number: '02',
    icon: Lightbulb,
    title: 'Strategic Architecture',
    description: 'We build the blueprint of your success. Every pixel and every line of code is mapped to a specific business outcome.',
    color: 'from-indigo-500 to-blue-500'
  },
  {
    number: '03',
    icon: Code2,
    title: 'Elite Construction',
    description: 'Our engineers and designers work in perfect sync to build a platform that doesn’t just work—it dominates.',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Hyper-Growth Launch',
    description: 'Deployment is just the beginning. We optimize, scale, and refine to ensure your brand stays at the cutting edge.',
    color: 'from-blue-600 to-indigo-600'
  },
];

const Process = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section id="process" className="py-20 md:py-40 bg-transparent relative" ref={containerRef}>
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Left Side: Sticky Content */}
          <div className="lg:w-1/3 lg:sticky lg:top-40 h-fit">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Our Methodology</span>
              <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tighter leading-[0.9]">
                The <span className="gradient-text">Formula</span> For Success
              </h2>
              <p className="text-muted-foreground text-lg font-light leading-relaxed mb-10">
                Stripping away the noise to focus on what truly moves the needle for your brand.
              </p>

              <div className="flex items-center gap-4 text-white/50 group cursor-default">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:text-primary transition-all duration-500">
                  <ArrowDown className="w-5 h-5 animate-bounce" />
                </div>
                <span className="text-sm font-medium tracking-widest uppercase">Explore Step by Step</span>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Steps */}
          <div className="lg:w-2/3 space-y-20 md:space-y-40">
            {steps.map((step, idx) => (
              <motion.div
                key={step.number}
                className="relative pl-12 md:pl-24"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Number Background */}
                <div className="absolute top-0 left-0 text-7xl md:text-9xl font-display font-black text-white/[0.03] select-none -translate-y-1/2">
                  {step.number}
                </div>

                <div className="relative z-10 group">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-4 mb-8 shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)] group-hover:scale-110 transition-transform duration-500`}>
                    <step.icon className="w-full h-full text-white" />
                  </div>

                  <h3 className="text-3xl md:text-5xl font-display font-bold mb-6 tracking-tight group-hover:text-primary transition-colors duration-500">
                    {step.title}
                  </h3>

                  <p className="text-muted-foreground text-xl md:text-2xl font-light leading-relaxed max-w-xl group-hover:text-gray-300 transition-colors duration-500">
                    {step.description}
                  </p>

                  <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent mt-10 rounded-full group-hover:w-40 transition-all duration-700" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
