import { motion } from 'framer-motion';
import { useThemeStore } from '../store';

// --- Sticker Component ---
const Sticker = ({ text, rotate, color, top, left, textColor = "text-black" }) => (
  <motion.div
    className={`absolute px-4 py-2 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] ${color} z-30`}
    style={{ top, left, rotate }}
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    whileHover={{ scale: 1.2, rotate: 0 }}
    transition={{ type: "spring", bounce: 0.6 }}
  >
    <span className={`font-marker text-xl md:text-2xl ${textColor} uppercase`}>{text}</span>
  </motion.div>
);

// --- Glitch Square Component ---
const GlitchSquare = ({ size, color, top, left, delay }) => (
    <motion.div 
        className={`absolute z-20 ${size} ${color} opacity-70 mix-blend-screen`}
        style={{ top, left, clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)' }}
        animate={{ y: [0, -20, 0], x: [0, 10, 0], skewX: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 3, delay: delay, ease: "easeInOut" }}
    />
);

const HeroSpiderVerse = () => {
  const { isDarkMode } = useThemeStore();

  return (
    <section className={`h-full w-full relative overflow-hidden flex flex-col items-center justify-center transition-colors duration-700
      ${isDarkMode ? 'bg-[#100a1a]' : 'bg-[#f0f0f0]'}
    `}>
      
      {/* ================= BACKGROUND LAYERS ================= */}

      {/* 1. Halftone Pattern */}
      <div className={`absolute inset-0 pointer-events-none z-0 transition-opacity duration-700 ${isDarkMode ? 'opacity-10' : 'opacity-15'}`}
        style={{
            backgroundImage: `radial-gradient(circle, ${isDarkMode ? '#ffffff' : '#000000'} 3px, transparent 3.5px)`,
            backgroundSize: '40px 40px',
        }}
      />

      {/* 2. Cityscape Silhouette */}
      <div 
          className={`absolute bottom-0 left-0 w-full h-[40%] z-10 transition-colors duration-700 ${isDarkMode ? 'bg-[#1a0f2e] opacity-80' : 'bg-[#b91c1c] opacity-90'}`}
          style={{ clipPath: 'polygon(0% 100%, 0% 20%, 10% 30%, 20% 10%, 30% 35%, 40% 15%, 50% 40%, 60% 10%, 70% 30%, 80% 5%, 90% 25%, 100% 10%, 100% 100%)' }}
      ></div>
      <div 
          className={`absolute bottom-0 left-0 w-full h-[25%] z-10 transition-colors duration-700 ${isDarkMode ? 'bg-black' : 'bg-[#1e3a8a]'}`}
          style={{ clipPath: 'polygon(0% 100%, 5% 30%, 15% 50%, 25% 20%, 35% 40%, 45% 10%, 55% 50%, 65% 20%, 75% 40%, 85% 15%, 95% 35%, 100% 20%, 100% 100%)' }}
      ></div>

      {/* 3. Spider Webs */}
      <svg className={`absolute top-0 left-0 w-64 h-64 z-10 opacity-40 transition-colors duration-700 ${isDarkMode ? 'text-gray-500' : 'text-red-900'}`} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
         <path d="M0 0 L100 0 L0 100 Z" fill="none"/>
         <path d="M10 0 Q 10 10 0 10" /><path d="M30 0 Q 30 30 0 30" /><path d="M60 0 Q 60 60 0 60" /><path d="M90 0 Q 90 90 0 90" />
         <line x1="0" y1="0" x2="100" y2="20" /><line x1="0" y1="0" x2="80" y2="50" /><line x1="0" y1="0" x2="50" y2="80" /><line x1="0" y1="0" x2="20" y2="100" />
      </svg>
      <svg className={`absolute top-0 right-0 w-96 h-96 z-10 opacity-30 transition-colors duration-700 ${isDarkMode ? 'text-cyan-800' : 'text-blue-900'}`} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1" transform="scale(-1, 1)">
         <path d="M0 0 L100 0 L0 100 Z" fill="none"/>
         <path d="M20 0 Q 20 20 0 20" /><path d="M50 0 Q 50 50 0 50" /><path d="M80 0 Q 80 80 0 80" />
         <line x1="0" y1="0" x2="100" y2="30" /><line x1="0" y1="0" x2="70" y2="70" /><line x1="0" y1="0" x2="30" y2="100" />
      </svg>

      {/* 4. Glitch Particles (Dark Mode Only) */}
      {isDarkMode && (
        <>
            <GlitchSquare size="w-16 h-16" color="bg-cyan-500" top="15%" left="10%" delay={0} />
            <GlitchSquare size="w-24 h-24" color="bg-pink-500" top="60%" left="80%" delay={1} />
        </>
      )}

      {/* ================= MAIN CONTENT ================= */}

      <Sticker text="Web Slinger" rotate="-15deg" top="15%" left="5%" color={isDarkMode ? "bg-yellow-400" : "bg-blue-500"} textColor={isDarkMode ? "text-black" : "text-white"} />
      <Sticker text="ML Sense" rotate="10deg" top="20%" left="70%" color={isDarkMode ? "bg-pink-500" : "bg-red-500"} textColor={isDarkMode ? "text-black" : "text-white"} />

      <div className="relative z-30 text-center flex flex-col items-center py-10">
        
        {/* Intro Tag */}
        <motion.div 
          className="bg-white px-6 py-2 border-4 border-black shadow-[6px_6px_0px_#ff0055] mb-4 transform -rotate-2"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <p className="font-marker text-xl md:text-2xl text-black">
            {isDarkMode ? "Alright, let's do this one last time..." : "With great power comes great code."}
          </p>
        </motion.div>

        {/* THE NAME - FIXED COLORS */}
        <motion.div
            className="relative p-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
        >
            {/* Shadow Layers */}
            {/* DARK MODE: Cyan Ghost / LIGHT MODE: Navy Blue Ghost */}
            <h1 className={`absolute top-[18px] left-[4px] text-7xl md:text-9xl font-comic leading-normal tracking-tighter italic opacity-70 mix-blend-screen blur-[1px] select-none transition-colors duration-700
                ${isDarkMode ? 'text-cyan-500' : 'text-[#000080]'}`}>
                SAUMYA SHAH
            </h1>
            
            {/* DARK MODE: Red Ghost / LIGHT MODE: Black Ghost */}
            <h1 className={`absolute top-[14px] left-[-4px] text-7xl md:text-9xl font-comic leading-normal tracking-tighter italic opacity-70 mix-blend-screen blur-[1px] select-none transition-colors duration-700
                ${isDarkMode ? 'text-red-600' : 'text-black'}`}>
                SAUMYA SHAH
            </h1>

            {/* MAIN TEXT */}
            {/* DARK MODE: White Text / LIGHT MODE: Classic Spidey Red */}
            <h1 
                className={`relative z-10 text-7xl md:text-9xl font-comic leading-normal tracking-tighter italic drop-shadow-[5px_5px_0px_rgba(0,0,0,1)] transition-colors duration-700
                    ${isDarkMode ? 'text-white' : 'text-[#e62429]'}`} 
                style={{ WebkitTextStroke: '2px black' }}
            >
                SAUMYA SHAH
            </h1>
        </motion.div>

        {/* Subtitle */}
        <div className={`mt-4 border-2 px-6 py-2 shadow-[4px_4px_0px_#00FFFF] transform rotate-1 transition-colors duration-700
            ${isDarkMode ? 'bg-black border-cyan-400' : 'bg-white border-blue-600'}`}>
            <p className={`font-mono tracking-widest text-sm md:text-base font-bold
                ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
                YOUR FRIENDLY NEIGHBORHOOD DEVELOPER
            </p>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className={`absolute -bottom-40 font-marker text-3xl z-30 transition-colors duration-700 ${isDarkMode ? 'text-white' : 'text-black'}`}
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          Scroll to Enter the Multiverse ↓
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSpiderVerse;