import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowUpRight, Github, ExternalLink, X, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Project {
  title: string;
  category: string;
  description: string;
  longDescription: string;
  techStack: string[];
  image: string;
  color: string;
  demoLink: string;
  sourceLink: string;
}

const projects: Project[] = [
  {
    title: 'Nova Crypto',
    category: 'Web3 Platform',
    description: 'Transforming decentralized finance with a cinematic trader interface.',
    longDescription: 'Nova Crypto required a high-fidelity interface for their next-gen trading platform. We implemented a glassmorphism-heavy design with real-time data streaming and complex SVG animations.',
    techStack: ['Next.js', 'Solidity', 'Tailwind CSS', 'Framer Motion', 'Chart.js'],
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=800&fit=crop',
    color: 'primary',
    demoLink: '#',
    sourceLink: '#',
  },
  {
    title: 'Pulse AI',
    category: 'SaaS Dashboard',
    description: 'AI-driven analytics platform for healthcare professionals.',
    longDescription: 'Pulse AI streamlines healthcare data through predictive modeling. We crafted a clean, high-performance dashboard that processes millions of data points with ease.',
    techStack: ['React', 'Python', 'FastAPI', 'Radix UI', 'D3.js'],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=800&fit=crop',
    color: 'secondary',
    demoLink: '#',
    sourceLink: '#',
  },
  {
    title: 'Quantum Labs',
    category: 'Research Hub',
    description: 'Interactive portfolio for an AI-first research organization.',
    longDescription: 'For Quantum Labs, we built an immersive web experience featuring 3D particle systems and kinetic typography to showcase their research breakthroughs.',
    techStack: ['Three.js', 'React Three Fiber', 'GSAP', 'TypeScript'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop',
    color: 'accent',
    demoLink: '#',
    sourceLink: '#',
  },
  {
    title: 'EcoVenture',
    category: 'E-commerce',
    description: 'Luxury sustainable marketplace with zero-friction checkout.',
    longDescription: 'A premium shopping experience for eco-conscious consumers. We focused on micro-interactions and performance optimization to create a seamless flow.',
    techStack: ['Shopify', 'Hydrogen', 'GraphQL', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop',
    color: 'primary',
    demoLink: '#',
    sourceLink: '#',
  },
];

const CaseStudies = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['5%', '-25%']);

  return (
    <section id="work" className="py-20 md:py-40 bg-transparent overflow-hidden" ref={containerRef}>
      <div className="container-custom mb-20">
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-2xl">
            <motion.span
              className="inline-block text-blue-500 font-bold tracking-[0.3em] uppercase text-xs mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Selected Portfolio
            </motion.span>
            <h2 className="text-5xl md:text-8xl font-display font-bold tracking-tighter">
              Featured <br />
              <span className="gradient-text">Projects</span>
            </h2>
          </div>
          <div className="flex flex-col gap-4 items-start">
            <p className="text-muted-foreground text-lg max-w-sm font-light">
              A curated selection of digital products that redefine industry standards.
            </p>
            <motion.button
              whileHover={{ x: 10 }}
              className="group flex items-center gap-3 text-white font-medium"
            >
              <span>Explore all works</span>
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>

      <div className="relative">
        <motion.div
          className="flex gap-10 cursor-grab active:cursor-grabbing"
          style={{ x }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="relative flex-shrink-0 w-[80vw] md:w-[600px] lg:w-[800px] group"
              whileHover={{ scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-white/5">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />

                <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                  <div className="max-w-md">
                    <Badge className="bg-white/10 backdrop-blur-md text-white border-white/10 mb-4">{project.category}</Badge>
                    <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-white/70 text-lg font-light leading-snug">{project.description}</p>
                  </div>
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-black shadow-2xl">
                    <Plus className="w-8 h-8" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-6xl h-[85vh] overflow-y-auto p-0 border-none bg-black/95 backdrop-blur-3xl rounded-[3rem]">
          {selectedProject && (
            <div className="flex flex-col lg:flex-row h-full">
              <div className="lg:w-1/2 h-full relative">
                <img src={selectedProject.image} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black lg:block hidden" />
              </div>
              <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center gap-10">
                <Badge className="w-fit bg-primary/10 text-primary border-primary/20">{selectedProject.category}</Badge>
                <div>
                  <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">{selectedProject.title}</h2>
                  <p className="text-xl text-muted-foreground font-light leading-relaxed">{selectedProject.longDescription}</p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Core Technologies</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.techStack.map(t => (
                      <span key={t} className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-light">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-6">
                  <Button asChild size="lg" className="rounded-full px-10 h-16 text-lg bg-white text-black hover:bg-gray-200">
                    <a href={selectedProject.demoLink}>Live Performance</a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full px-10 h-16 text-lg border-white/20 hover:bg-white/5">
                    <a href={selectedProject.sourceLink}><Github className="mr-2" /> Source</a>
                  </Button>
                </div>
              </div>
              <button onClick={() => setSelectedProject(null)} className="absolute top-10 right-10 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all z-50">
                <X className="w-6 h-6" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CaseStudies;
