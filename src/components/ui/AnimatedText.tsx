import { motion, Variants } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    rotateX: -90,
    filter: 'blur(4px)',
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.03,
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

const AnimatedText = ({ text, className = '', delay = 0, once = true }: AnimatedTextProps) => {
  const words = text.split(' ');

  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-[0.25em]">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              variants={letterVariants}
              custom={delay + wordIndex * 5 + charIndex}
              style={{ transformOrigin: 'bottom' }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
};

export default AnimatedText;
