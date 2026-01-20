import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  // Visual variants for the cursor
  const variants = {
    default: {
      x: mousePosition.x - 16, // Center the 32px circle
      y: mousePosition.y - 16,
    }
  };

  return (
    <>
      {/* The main glowing ring - Added shadow-glow-blue and increased stroke */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-neon-blue rounded-full pointer-events-none z-50 mix-blend-difference shadow-glow-blue"
        variants={variants}
        animate="default"
        transition={{
          type: "spring",
          stiffness: 800, // Was 100 (Much snappier now)
          damping: 35,    // Reduces the wobble
          mass: 0.5
        }} 
      />
      
      {/* The center sharp dot - Added neon-green for contrast */}
      <div 
        className="fixed top-0 left-0 w-2 h-2 bg-neon-purple shadow-glow-purple rounded-full pointer-events-none z-50"
        style={{ 
          left: mousePosition.x, 
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)'
        }}
      />
    </>
  );
};

export default CustomCursor;