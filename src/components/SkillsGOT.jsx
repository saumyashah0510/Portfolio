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
        <stop offset="0%" style={{ stopColor: 'currentColor', stopOpacity: 0.9 }} />
        <stop offset="50%" style={{ stopColor: 'currentColor', stopOpacity: 0.6 }} />
        <stop offset="100%" style={{ stopColor: 'currentColor', stopOpacity: 0.9 }} />
      </linearGradient>
    </defs>
    <rect x="10" y="380" width="80" height="20" fill="url(#pillarGrad)" />
    <rect x="20" y="360" width="60" height="20" fill="url(#pillarGrad)" />
    <rect x="30" y="40" width="40" height="320" fill="url(#pillarGrad)" />
    <line x1="40" y1="40" x2="40" y2="360" stroke="black" strokeOpacity="0.3" strokeWidth="2" />
    <line x1="60" y1="40" x2="60" y2="360" stroke="black" strokeOpacity="0.3" strokeWidth="2" />
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
  {
    id: "HOUSE STARK",
    name: "HOUSE STARK",
    role: "WARDENS OF THE SYNTAX",
    icon: <Terminal size={40} />,
    desc: "Winter is Coming. Core languages of the realm.",
    houseColor: "text-slate-400",
    techs: [
      { name: "C++", logo: "cpp" },
      { name: "C", logo: "c" },
      { name: "Python", logo: "python" },
      { name: "JavaScript", logo: "js" },
      { name: "TypeScript", logo: "ts" }
    ]
  },
  {
    id: "HOUSE LANNISTER",
    name: "HOUSE LANNISTER",
    role: "MASTERS OF THE CANVAS",
    icon: <Globe size={40} />,
    desc: "Hear Me Roar. Sculpting interfaces of gold.",
    houseColor: "text-amber-500",
    techs: [
      { name: "React", logo: "react" },
      { name: "HTML5", logo: "html5" },
      { name: "CSS3", logo: "css3" }
    ]
  },
  {
    id: "HOUSE GREYJOY",
    name: "HOUSE GREYJOY",
    role: "LORDS OF THE NETWORKS",
    icon: <Layers size={40} />,
    desc: "We Do Not Sow. We reap and route data at speed.",
    houseColor: "text-teal-500",
    techs: [
      { name: "FastAPI", logo: "fastapi" },
      { name: "GraphQL", logo: "graphql" },
      { name: "REST API", logo: "restapi" }
    ]
  },
  {
    id: "HOUSE TARGARYEN",
    name: "HOUSE TARGARYEN",
    role: "THREE-EYED DRAGONS",
    icon: <Brain size={40} />,
    desc: "Fire and Blood. Unleashing models on data.",
    houseColor: "text-red-600",
    techs: [
      { name: "TensorFlow", logo: "tensorflow" },
      { name: "NumPy", logo: "numpy" },
      { name: "Pandas", logo: "pandas" },
      { name: "scikit-learn", logo: "scikit" },
      { name: "SciPy", logo: "scipy" },
      { name: "Matplotlib", logo: "matplotlib" },
      { name: "Seaborn", logo: "seaborn" },
      { name: "Joblib", logo: "joblib" }
    ]
  },
  {
    id: "HOUSE BARATHEON",
    name: "HOUSE BARATHEON",
    role: "KEEPERS OF THE VAULT",
    icon: <Database size={40} />,
    desc: "Ours is the Fury. Keeping the state locked down.",
    houseColor: "text-yellow-600",
    techs: [
      { name: "PostgreSQL", logo: "postgres" },
      { name: "Redis", logo: "redis" },
      { name: "Supabase", logo: "supabase" }
    ]
  },
  {
    id: "HOUSE TYRELL",
    name: "HOUSE TYRELL",
    role: "NIGHT'S WATCH OF CODE",
    icon: <GitBranch size={40} />,
    desc: "Growing Strong. Guards of the pipelines.",
    houseColor: "text-green-600",
    techs: [
      { name: "Git", logo: "git" },
      { name: "GitHub", logo: "github" },
      { name: "Postman", logo: "postman" },
      { name: "Vercel", logo: "vercel" },
      { name: "Render", logo: "render" }
    ]
  }
];

const renderTechLogo = (logo, className) => {
  switch (logo) {
    case 'cpp':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H8v-3H5v-2h3V8h2v3h3v2h-3v3zm8-2h-2v2h-2v-2h-2v-2h2v-2h2v2h2v2z" />
        </svg>
      );
    case 'c':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5c1.66 0 3.13.81 4.05 2.05l-1.64 1.23C13.84 9.61 13 9 12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c1 0 1.84-.61 2.41-1.28l1.64 1.23C15.13 16.19 13.66 17 12 17z" />
        </svg>
      );
    case 'python':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M14.25.18a3.18 3.18 0 0 0-3.22 3.19v2.18h6.44a1.59 1.59 0 0 1 1.59 1.59v6.44h2.18a3.19 3.19 0 0 0 3.19-3.22v-6.4a3.83 3.83 0 0 0-3.8-3.8H14.25zm-4.5 2.18A3.19 3.19 0 0 0 6.56 5.55v6.4a3.83 3.83 0 0 0 3.8 3.8h6.44V13.6a1.59 1.59 0 0 1-1.59-1.59H8.78V5.55a2.18 2.18 0 0 0-2.18-2.18h3.15z" />
        </svg>
      );
    case 'js':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M3 3h18v18H3V3zm12.54 12.38c-.37-.73-.83-1.12-1.67-1.12-.7 0-1.15.35-1.15.86 0 .54.43.78 1.13 1.08l.38.16c1.13.48 1.88.94 1.88 2.21 0 1.34-1.03 2.13-2.5 2.13-1.46 0-2.35-.74-2.8-1.74l1.1-.64c.28.53.64.88 1.48.88.7 0 1.08-.28 1.08-.85 0-.58-.38-.79-1.07-1.09l-.38-.16c-1.02-.43-1.83-.89-1.83-2.16 0-1.26.96-2.03 2.3-2.03 1.24 0 2.05.59 2.44 1.4l-1.09.68z" />
        </svg>
      );
    case 'ts':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M3 3h18v18H3V3zm7.3 12.18H8v-8.8h6.6v1.86h-2.1v6.94h-2.2zM17 11.2h-2.15v1.64H17v1.8H14.85v1.86H17v1.88h-4.35v-9h4.35v1.82z" />
        </svg>
      );
    case 'react':
      return (
        <svg viewBox="-11.5 -10.2 23 20.4" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
          <circle cx="0" cy="0" r="2" fill="currentColor" />
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </svg>
      );
    case 'html5':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm10.5 4.5v3.4h5.6l-.3 3.3H12v3.4l3.6-1.2.2-2.1h3.3l-.6 6.8-6.1 2-6.1-2 .4-4.8h3.3l-.2 2 2.6.9v-3.4H9.6L9.3 7.9h2.7v-3.4H12z" />
        </svg>
      );
    case 'css3':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm10.5 4.5v3.4H7.8l.2 2H12v3.4H9.6l.2 2 2.2.7 2.2-.7.2-2.1h3.3l-.5 5.5-5.4 1.8-5.4-1.8.5-5.3h3.3v-3.4H6.8l.3-3.3H12v-3.4h4.5z" />
        </svg>
      );
    case 'fastapi':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12 2L2 13h9v9l10-11h-9z" />
        </svg>
      );
    case 'node':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm1 14.5v-5.2l3 1.7v1.8l-3 1.7zm-2 1.2l-3-1.7v-3.5l3 1.7v3.5zm5-6.2l-3-1.7v-1.8l3 1.7v1.8z" />
        </svg>
      );
    case 'graphql':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12 2L2 7.78v8.44L12 22l10-5.78v-8.44L12 2zm0 3.2L18.8 9.1v5.8L12 18.8 5.2 14.9V9.1L12 5.2z" />
        </svg>
      );
    case 'restapi':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
          <path d="M16 3h5v5M8 21H3v-5M21 3L14 10M3 21l7-7M14 14l3 3M10 10l-3-3" />
        </svg>
      );
    case 'postgres':
      return (
        <svg viewBox="0 0 64 64" fill="currentColor" className={className}>
          <path d="M32 4C16.5 4 4 16.5 4 32c0 10.3 5.5 19.3 13.8 24.3.4.2.9-.1.9-.6v-4c0-3.3 2.7-6 6-6h14.6c3.3 0 6 2.7 6 6v4c0 .5.5.8.9.6C54.5 51.3 60 42.3 60 32 60 16.5 47.5 4 32 4z" />
        </svg>
      );
    case 'redis':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12 2L2 7.5l10 5.5 10-5.5L12 2zm0 11.5L2.8 8.4V16l9.2 5 9.2-5V8.4l-9.2 5.1z" />
        </svg>
      );
    case 'supabase':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M13.2 2H4c-.6 0-1 .6-.7 1.1l4 7.2c.2.4.6.7 1.1.7h9.2c.6 0 1-.6.7-1.1l-4-7.2c-.2-.4-.6-.7-1.1-.7zM10.8 22H20c.6 0 1-.6.7-1.1l-4-7.2c-.2-.4-.6-.7-1.1-.7H6.4c-.6 0-1 .6-.7 1.1l4 7.2c.2.4.6.7 1.1.7z" />
        </svg>
      );
    case 'tensorflow':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12 2L2 7.78v8.44L12 22l10-5.78v-8.44L12 2zm-1 4.5v11L6 14.7v-5.4L11 6.5zm7 8.2l-5 2.8v-11l5 2.8v5.4z" />
        </svg>
      );
    case 'numpy':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12 2L2 7l10 5 10-5-10-5zm0 10L2 17l10 5 10-5-10-5z" />
        </svg>
      );
    case 'pandas':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-2h2v2zm0-4H7v-2h2v2zm0-4H7V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z" />
        </svg>
      );
    case 'scikit':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v6M12 16v6M2 12h6M16 12h6" />
        </svg>
      );
    case 'scipy':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
          <path d="M2 12c4-8 8-8 10 0s6 8 10 0" />
        </svg>
      );
    case 'matplotlib':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
          <path d="M3 3v18h18M7 16l4-6 4 3 6-8" />
        </svg>
      );
    case 'seaborn':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
          <path d="M3 12c3-4 6-4 9 0s6 4 9 0M3 18c3-4 6-4 9 0s6 4 9 0" />
        </svg>
      );
    case 'joblib':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H7" />
        </svg>
      );
    case 'git':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
          <path d="M18 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 3v6m6-3h6" />
        </svg>
      );
    case 'github':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
      );
    case 'postman':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
          <path d="M4.5 16.5c-1.5 1.5-2.5 3.5-2.5 5.5C4 22 6 21 7.5 19.5m9-9L12 15m-1.5-1.5L6 18m13.5-13.5c-3-3-9-1.5-12 1.5s-4.5 9-1.5 12l12-12z" />
        </svg>
      );
    case 'vercel':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12 2L2 22h20z" />
        </svg>
      );
    case 'render':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
          <rect x="2" y="3" width="20" height="6" rx="2" />
          <rect x="2" y="15" width="20" height="6" rx="2" />
          <path d="M6 6h.01M6 18h.01" />
        </svg>
      );
    default:
      return null;
  }
};

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
            <p className={`font-serif text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-1 transition-colors duration-1000 ${isDarkMode ? 'text-gray-400' : 'text-[#8b0000]'}`}>
              {skills[activeIndex].role}
            </p>
            <h2 className={`text-3xl md:text-5xl font-black tracking-widest uppercase mb-2 transition-colors duration-500 ${isDarkMode ? skills[activeIndex].houseColor : 'text-[#2a0a0a]'}`}
              style={{ fontFamily: 'Cinzel, serif', textShadow: isDarkMode ? '0 0 10px rgba(255,255,255,0.2)' : 'none' }}>
              {skills[activeIndex].name}
            </h2>
            <div className="flex items-center justify-center gap-3 opacity-85 mb-4">
              <Sword size={16} className={`rotate-45 ${isDarkMode ? 'text-gray-500' : 'text-[#4a0404]'}`} />
              <p className={`font-typewriter text-xs md:text-sm font-bold italic ${isDarkMode ? 'text-gray-300' : 'text-[#2a0a0a]'}`}>"{skills[activeIndex].desc}"</p>
              <Sword size={16} className={`-rotate-45 ${isDarkMode ? 'text-gray-500' : 'text-[#4a0404]'}`} />
            </div>

            {/* Technologies Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4 px-2 pb-8 max-h-[180px] overflow-y-auto">
              {skills[activeIndex].techs.map(tech => (
                <div key={tech.name} className={`flex items-center gap-2 px-3 py-1.5 rounded-sm border transition-all duration-300
                      ${isDarkMode
                    ? 'bg-zinc-900/60 border-zinc-700 hover:border-gray-400 text-gray-300 hover:text-white'
                    : 'bg-[#faf0d9] border-[#8b4513]/30 hover:border-[#4a0404] text-[#5c4033] hover:text-[#4a0404]'
                  }`}
                >
                  <div className="w-5 h-5 flex items-center justify-center shrink-0 opacity-80">
                    {renderTechLogo(tech.logo, "w-full h-full")}
                  </div>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider">{tech.name}</span>
                </div>
              ))}
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