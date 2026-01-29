import { motion } from 'framer-motion';
import { Palette, Code, Zap, ArrowUpRight } from 'lucide-react';

const services = [
  {
    icon: Palette,
    title: 'Design',
    description: 'Cinematic interfaces and brand experiences that push the boundaries of digital aesthetics.',
    features: ['UI/UX Design', 'Brand Identity', 'Motion Graphics', 'Design Systems'],
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-400',
    glowColor: 'group-hover:shadow-[0_0_80px_-10px_rgba(59,130,246,0.35)]',
  },
  {
    icon: Code,
    title: 'Development',
    description: 'High-performance, scalable engineering utilizing the modern web ecosystem.',
    features: ['React & Next.js', 'Full-Stack Apps', 'API Integration', 'Cloud Native'],
    gradient: 'from-indigo-500/20 to-blue-500/20',
    iconColor: 'text-indigo-400',
    glowColor: 'group-hover:shadow-[0_0_80px_-10px_rgba(99,102,241,0.35)]',
  },
  {
    icon: Zap,
    title: 'Optimization',
    description: 'Data-driven performance tuning and SEO strategies to maximize ROI and visibility.',
    features: ['Performance Audit', 'SEO Strategy', 'A/B Testing', 'Conversion Flow'],
    gradient: 'from-cyan-500/20 to-blue-500/20',
    iconColor: 'text-cyan-400',
    glowColor: 'group-hover:shadow-[0_0_80px_-10px_rgba(6,182,212,0.35)]',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const Services = () => {
  return (
    <section id="services" className="section-padding relative bg-transparent">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-20 lg:mb-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-block px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-bold tracking-[0.2em] uppercase mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Specializations
          </motion.div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold mb-8 tracking-tight">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            We bridge the gap between imagination and digital reality with
            cutting-edge engineering and visionary design.
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`group relative glass p-8 sm:p-10 transition-all duration-700 ${service.glowColor} border-white/5 hover:border-white/10`}
              variants={cardVariants}
              whileHover={{ y: -12, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
            >
              {/* Animated Border */}
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent group-hover:via-blue-400 transition-all duration-700" />

              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-all duration-700 rounded-2xl`} />

              {/* Content */}
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${service.iconColor}`}>
                  <service.icon className="w-8 h-8" />
                </div>

                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-display font-medium tracking-tight group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
                </div>

                <p className="text-muted-foreground text-lg mb-8 leading-relaxed font-light transition-colors group-hover:text-gray-300">
                  {service.description}
                </p>

                <div className="w-full h-px bg-white/5 mb-8" />

                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm tracking-wide text-muted-foreground/80 font-light group-hover:text-muted-foreground transition-colors">
                      <div className={`w-1 h-1 rounded-full ${service.iconColor.replace('text', 'bg')} group-hover:scale-150 transition-transform`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
