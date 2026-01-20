import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useThemeStore } from '../store';
import { Brain, Terminal, Cpu, Globe, Code, Database, Layers, GitBranch, Sword, ChevronRight, ChevronLeft } from 'lucide-react';

// --- ASSETS ---
const StoneTexture = ({ isDark }) => (
  <div className={`absolute inset-0 z-0 mix-blend-overlay pointer-events-none transition-opacity duration-1000 ${isDark ? 'opacity-40' : 'opacity-20 sepia'}`}
         style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/black-scales.png")` }} 
  />
);

const ParchmentTexture = ({ isDark }) => (
    <div className={`absolute inset-0 z-0 mix-blend-multiply pointer-events-none transition-opacity duration-1000 ${isDark ? 'opacity-0' : 'opacity-80'}`} // Increased opacity for texture
           style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/aged-paper.png")` }} 
    />
);

const Pillar = ({ className }) => (
    <svg viewBox="0 0 100 400" className={className} preserveAspectRatio="none">
        <defs>
            <linearGradient id="pillarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor:'currentColor', stopOpacity:0.9}} />
                <stop offset="50%" style={{stopColor:'currentColor', stopOpacity:0.6}} />
                <stop offset="100%" style={{stopColor:'currentColor', stopOpacity:0.9}} />
            </linearGradient>
        </defs>
        <rect x="10" y="380" width="80" height="20" fill="url(#pillarGrad)" />
        <rect x="20" y="360" width="60" height="20" fill="url(#pillarGrad)" />
        <rect x="30" y="40" width="40" height="320" fill="url(#pillarGrad)" />
        <line x1="40" y1="40" x2="40" y2="360" stroke="black" strokeOpacity="0.3" strokeWidth="2"/>
        <line x1="60" y1="40" x2="60" y2="360" stroke="black" strokeOpacity="0.3" strokeWidth="2"/>
        <rect x="20" y="20" width="60" height="20" fill="url(#pillarGrad)" />
        <rect x="10" y="0" width="80" height="20" fill="url(#pillarGrad)" />
    </svg>
);

const BackgroundSigil = ({ isDark }) => (
    <div className="absolute inset-0 flex items-center justify-center z-0 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" className={`w-[600px] h-[600px] transition-colors duration-1000 ${isDark ? 'text-gray-300' : 'text-[#4a0404]'}`}>
            <path d="M100 20 L180 180 L20 180 Z" fill="currentColor" className="animate-pulse-slow" />
            <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="5" />
        </svg>
    </div>
);

// --- RESUME DATA ---
const skills = [
  { id: "HOUSE AI", name: "ML / AI", role: "THE THREE-EYED RAVEN", icon: <Brain size={40} />, desc: "Sees the future. Predicts the unknown.", houseColor: "text-purple-500" },
  { id: "HOUSE PY", name: "PYTHON", role: "HAND OF THE KING", icon: <Terminal size={40} />, desc: "Executes the will of the realm.", houseColor: "text-green-600" },
  { id: "HOUSE CPP", name: "C++", role: "THE MOUNTAIN", icon: <Cpu size={40} />, desc: "Unmatched raw power and speed.", houseColor: "text-red-600" },
  { id: "HOUSE REACT", name: "REACT", role: "MASTER OF COIN", icon: <Globe size={40} />, desc: "Architect of the realm's interface.", houseColor: "text-cyan-500" },
  { id: "HOUSE JS", name: "JAVASCRIPT", role: "GRAND MAESTER", icon: <Code size={40} />, desc: "The universal language of the citadel.", houseColor: "text-yellow-500" },
  { id: "HOUSE SQL", name: "SQL", role: "MASTER OF WHISPERS", icon: <Database size={40} />, desc: "Keeper of all secrets and data.", houseColor: "text-orange-500" },
  { id: "HOUSE API", name: "FAST API", role: "THE RAVEN", icon: <Layers size={40} />, desc: "Swift communication.", houseColor: "text-teal-500" },
  { id: "HOUSE GIT", name: "GITHUB", role: "NIGHT'S WATCH", icon: <GitBranch size={40} />, desc: "The shield that guards the code.", houseColor: "text-gray-400" },
];

// --- 3D ITEM COMPONENT ---
const RADIUS = 260; 

const SigilItem = ({ skill, index, activeIndex, total, onClick, isDark }) => {
  const theta = ((index - activeIndex) / total) * 2 * Math.PI;
  const x = Math.sin(theta) * RADIUS;
  const z = Math.cos(theta) * RADIUS;
  const scale = (z + RADIUS * 2) / (RADIUS * 3);
  const opacity = (z + RADIUS) / (RADIUS * 2);
  const isActive = index === activeIndex;

  return (
    <motion.div
      className={`absolute top-1/2 left-1/2 flex items-center justify-center cursor-pointer transition-all duration-500 ${isActive ? 'z-50' : 'z-10'}`}
      style={{ x: x - 40, y: -40, scale, opacity: Math.max(0.3, opacity), zIndex: Math.round(z + RADIUS) }}
      onClick={() => onClick(index)}
      animate={{ x: x - 40, scale, opacity: Math.max(0.3, opacity), zIndex: Math.round(z + RADIUS) }}
      transition={{ type: "spring", stiffness: 80, damping: 20 }}
    >
      <div className={`relative w-24 h-24 md:w-32 md:h-32 transition-all duration-500
        ${isActive ? 'drop-shadow-[0_0_25px_rgba(255,215,0,0.5)] scale-110' : 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100'}
      `}>
         {/* THE SHIELD BACKGROUND */}
         <div className={`absolute inset-0 shadow-2xl transition-colors duration-1000
              ${isDark ? 'bg-gradient-to-b from-gray-700 to-black border-gray-500' : 'bg-gradient-to-b from-[#f4e4bc] to-[#c2a25a] border-[#8b4513]'}
              ${isActive ? (isDark ? 'border-2 border-gray-200' : 'border-4 border-[#4a0404]') : 'border'}`}
              style={{ clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)' }}>
         </div>

         {/* THE ICON - OPTICALLY CENTERED */}
         {/* We use absolute positioning to force center, then -translate-y-1 to nudge it up slightly because the shield points down */}
         <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] z-10 transition-colors duration-500 
             ${isActive ? (isDark ? 'text-white' : 'text-[#4a0404]') : (isDark ? 'text-gray-500' : 'text-[#5c4033]')}`}>
             {skill.icon}
         </div>
      </div>
    </motion.div>
  );
};

const SkillsGOT = () => {
  const { isDarkMode } = useThemeStore();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % skills.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextSkill = () => setActiveIndex((prev) => (prev + 1) % skills.length);
  const prevSkill = () => setActiveIndex((prev) => (prev - 1 + skills.length) % skills.length);

  return (
    <section className={`h-full w-full relative flex flex-col items-center justify-center overflow-hidden transition-colors duration-1000
      ${isDarkMode ? 'bg-[#0f1015]' : 'bg-[#e6d0a1]'} 
    `}>
      {/* Backgrounds */}
      <StoneTexture isDark={isDarkMode} />
      <ParchmentTexture isDark={isDarkMode} />
      <BackgroundSigil isDark={isDarkMode} />

      {/* Vignette */}
      <div className={`absolute inset-0 z-10 pointer-events-none transition-colors duration-1000 mix-blend-overlay
         ${isDarkMode ? 'bg-[radial-gradient(circle_at_center,transparent_0%,#000000_80%)]' : 'bg-[radial-gradient(circle_at_center,transparent_0%,#5c4033_50%)]'}`} />

      {/* Particles */}
      {[...Array(30)].map((_, i) => (
         <motion.div 
           key={i}
           className={`absolute rounded-full ${isDarkMode ? 'bg-white/40' : 'bg-[#4a0404]/60'}`} // Dark ash in light mode
           style={{ width: Math.random() * 4 + 1, height: Math.random() * 4 + 1 }}
           initial={{ x: Math.random() * window.innerWidth, y: isDarkMode ? -10 : window.innerHeight + 10 }}
           animate={{ 
               y: isDarkMode ? window.innerHeight + 10 : -10, 
               x: `+=${Math.random() * 50 - 25}`,
               opacity: isDarkMode ? [0, 0.4, 0] : [0.6, 0, 0.6]
           }}
           transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, delay: Math.random() * 5, ease: 'linear' }}
         />
      ))}

      {/* Pillars */}
      <Pillar className={`absolute left-0 h-full w-16 lg:w-32 z-20 transition-colors duration-1000 ${isDarkMode ? 'text-[#1a1a1a]' : 'text-[#8b6b4f]'}`} />
      <Pillar className={`absolute right-0 h-full w-16 lg:w-32 z-20 transition-colors duration-1000 ${isDarkMode ? 'text-[#1a1a1a]' : 'text-[#8b6b4f]'}`} />

      {/* HEADER */}
      <div className="absolute top-10 z-30 text-center">
          <div className={`inline-block border-b-4 pb-2 mb-2 transition-colors duration-1000 ${isDarkMode ? 'border-gray-600' : 'border-[#4a0404]'}`}>
            <h1 className={`text-4xl md:text-6xl font-black tracking-[0.2em] uppercase transition-colors duration-1000 ${isDarkMode ? 'text-gray-200' : 'text-[#2a0a0a]'}`} style={{ fontFamily: 'Cinzel, serif' }}>
                {isDarkMode ? 'The Night\'s Watch' : 'Small Council'}
            </h1>
          </div>
          <p className={`text-sm font-bold uppercase tracking-widest font-serif transition-colors duration-1000 ${isDarkMode ? 'text-gray-400' : 'text-[#5c4033]'}`}>
            {isDarkMode ? 'And now my watch begins' : 'Power is Power'}
          </p>
      </div>

      {/* ROTATING RING */}
      <div className="relative w-full h-[400px] flex items-center justify-center perspective-1000 z-20 mt-10">
          {skills.map((skill, i) => (
             <SigilItem key={skill.id} skill={skill} index={i} activeIndex={activeIndex} total={skills.length} onClick={setActiveIndex} isDark={isDarkMode} />
          ))}
      </div>

      {/* ACTIVE BANNER (READABILITY FIX) */}
      <div className="absolute bottom-10 z-30 w-full flex justify-center px-4 pl-16 pr-16">
        <AnimatePresence mode='wait'>
            <motion.div 
                key={skills[activeIndex].id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={`backdrop-blur-md border-4 p-6 md:p-8 max-w-2xl text-center shadow-2xl relative overflow-hidden transition-colors duration-1000
                    ${isDarkMode ? 'bg-black/90 border-gray-500' : 'bg-[#f4e4bc] border-[#4a0404] shadow-[0_0_20px_rgba(74,4,4,0.3)]'}`}
                style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 85%, 50% 100%, 0% 85%)' }}
            >
                {/* Text Colors: Dark Red/Black for Light Mode to ensure contrast */}
                <p className={`font-serif text-sm font-bold tracking-[0.4em] uppercase mb-2 transition-colors duration-1000 ${isDarkMode ? 'text-gray-400' : 'text-[#8b0000]'}`}>
                    {skills[activeIndex].role}
                </p>
                <h2 className={`text-4xl md:text-6xl font-black tracking-widest uppercase mb-4 transition-colors duration-500 ${isDarkMode ? skills[activeIndex].houseColor : 'text-[#2a0a0a]'}`} 
                    style={{ fontFamily: 'Cinzel, serif', textShadow: isDarkMode ? '0 0 10px rgba(255,255,255,0.2)' : 'none' }}>
                    {skills[activeIndex].name}
                </h2>
                <div className="flex items-center justify-center gap-3 opacity-90">
                    <Sword size={20} className={`rotate-45 ${isDarkMode ? 'text-gray-500' : 'text-[#4a0404]'}`} />
                    <p className={`font-typewriter text-base md:text-lg font-bold italic ${isDarkMode ? 'text-gray-300' : 'text-[#2a0a0a]'}`}>"{skills[activeIndex].desc}"</p>
                    <Sword size={20} className={`-rotate-45 ${isDarkMode ? 'text-gray-500' : 'text-[#4a0404]'}`} />
                </div>
            </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="absolute bottom-1/2 w-full flex justify-between px-8 md:px-32 z-40 pointer-events-none">
          <button onClick={prevSkill} className={`pointer-events-auto p-3 rounded-full border-2 transition-colors duration-500 ${isDarkMode ? 'bg-black/50 border-gray-600 text-gray-400 hover:text-white' : 'bg-[#4a0404]/10 border-[#4a0404] text-[#4a0404] hover:bg-[#4a0404] hover:text-white'}`}><ChevronLeft size={32} /></button>
          <button onClick={nextSkill} className={`pointer-events-auto p-3 rounded-full border-2 transition-colors duration-500 ${isDarkMode ? 'bg-black/50 border-gray-600 text-gray-400 hover:text-white' : 'bg-[#4a0404]/10 border-[#4a0404] text-[#4a0404] hover:bg-[#4a0404] hover:text-white'}`}><ChevronRight size={32} /></button>
      </div>

    </section>
  );
};

export default SkillsGOT;