import { motion } from 'framer-motion';

const TvStatic = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] pointer-events-none mix-blend-hard-light"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: [0, 1, 0] }} // Flashes static when scrolled into view
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.3 }}
    >
      <svg className="w-full h-full opacity-50">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
      
      {/* The White Flash */}
      <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
    </motion.div>
  );
};

export default TvStatic;