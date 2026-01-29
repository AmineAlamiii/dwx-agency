import { motion, useScroll, useTransform } from 'framer-motion';

const AnimatedBackground = () => {
  const { scrollYProgress } = useScroll();

  // Parallax movement for the blobs - simplified for performance
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#020202]">
      {/* 
        Ultra-Optimized Blobs: 
        1. Using translate3d (via motion x/y)
        2. Fewer blobs
        3. Simple radial gradients
      */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] opacity-[0.15] will-change-transform"
      >
        <div
          className="w-full h-full rounded-full"
          style={{ background: 'radial-gradient(circle, #00a3ff 0%, transparent 70%)' }}
        />
      </motion.div>

      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-[-10%] left-[-10%] w-[70vw] h-[70vw] opacity-[0.1] will-change-transform"
      >
        <div
          className="w-full h-full rounded-full"
          style={{ background: 'radial-gradient(circle, #4f46e5 0%, transparent 70%)' }}
        />
      </motion.div>

      {/* Subtle scanline - CSS gradients are much faster than SVG filters */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] pointer-events-none opacity-10" />

      {/* Deep Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, #000 95%)',
          opacity: 0.9
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
