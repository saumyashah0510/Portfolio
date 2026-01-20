import { motion } from 'framer-motion';
import { useThemeStore } from '../store';
import { Folder, ExternalLink, Github, Database, Flag, Network, ScanLine, Briefcase } from 'lucide-react';

// --- ASSETS ---
const MarbleWall = ({ isDark }) => (
  <div className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 ${isDark ? 'opacity-20' : 'opacity-15'}`}
    style={{
      backgroundImage: `url("https://www.transparenttextures.com/patterns/black-mamba.png")`,
      backgroundSize: '400px',
      filter: isDark ? 'invert(0)' : 'invert(1)'
    }}
  />
);

const CitySkyline = ({ isDark }) => (
    <div className={`absolute bottom-0 w-full h-[60%] z-0 transition-opacity duration-1000 ${isDark ? 'opacity-50' : 'opacity-30'}`}>
        {/* Buildings */}
        <div className="absolute bottom-0 left-[5%] w-[12%] h-[70%] bg-current opacity-80" style={{ color: isDark ? '#0f172a' : '#94a3b8' }}></div>
        <div className="absolute bottom-0 left-[20%] w-[10%] h-[50%] bg-current opacity-60" style={{ color: isDark ? '#1e293b' : '#cbd5e1' }}></div>
        <div className="absolute bottom-0 right-[15%] w-[14%] h-[80%] bg-current opacity-70" style={{ color: isDark ? '#0f172a' : '#94a3b8' }}></div>
        <div className="absolute bottom-0 right-[2%] w-[8%] h-[40%] bg-current opacity-90" style={{ color: isDark ? '#1e293b' : '#cbd5e1' }}></div>
        
        {/* Night Lights */}
        {isDark && [...Array(30)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-0.5 h-0.5 bg-yellow-100 rounded-full"
                style={{ 
                    bottom: Math.random() * 50 + '%', 
                    left: Math.random() * 100 + '%',
                }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: Math.random() * 4 + 2, repeat: Infinity, delay: Math.random() * 5 }}
            />
        ))}
    </div>
);

// --- CUSTOM SVG: BASKETBALL ---
const BasketballIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <circle cx="50" cy="50" r="45" fill="#e65100" stroke="currentColor" strokeWidth="2" />
    <path d="M50 5 L50 95" fill="none" stroke="#222" strokeWidth="3" />
    <path d="M5 50 L95 50" fill="none" stroke="#222" strokeWidth="3" />
    <path d="M20 15 Q 80 50 20 85" fill="none" stroke="#222" strokeWidth="3" />
    <path d="M80 15 Q 20 50 80 85" fill="none" stroke="#222" strokeWidth="3" />
  </svg>
);

// --- RESUME DATA ---
const cases = [
  {
    id: "CASE #2024-F1",
    title: "F1 PREDICTION HUB",
    client: "Racing Strategy Dept",
    status: "LIVE // DEPLOYED",
    tech: ["React", "FastAPI", "Scikit-Learn"],
    desc: "Full-stack ML platform predicting race outcomes. Features driver comparisons, live standings, and visualization dashboards.",
    icon: <Flag size={32} />,
    link: "https://f1-prediction-hub-one.vercel.app/",
    github: "https://github.com/saumyashah0510/f1-prediction-hub"
  },
  {
    id: "CASE #P2P-SYS",
    title: "P2P FILE TRANSFER",
    client: "Network Infrastructure",
    status: "CLOSED // OPTIMIZED",
    tech: ["C", "Sockets", "Linux"],
    desc: "BitTorrent-inspired system with multi-source parallel downloads, chunk reassembly, and tracker-peer architecture.",
    icon: <Network size={32} />,
    link: null, 
    github: "https://github.com/saumyashah0510/Peer-to-Peer-File-Transfer"
  },
  {
    id: "CASE #SYN-26",
    title: "SYNAPSE WEBSITE",
    client: "University Event Board",
    status: "EXECUTED",
    tech: ["Backend", "PostgreSQL", "API"],
    desc: "Official event platform handling registrations and live updates. Built robust data models and API architecture.",
    icon: <Database size={32} />,
    link: null,
    github: "https://github.com/vaishcodescape/Synapse-26"
  }
];

const CaseFile = ({ project, isDark, index }) => {
  return (
    <motion.div
      className="relative w-full md:max-w-sm h-72 perspective-1000 group cursor-pointer"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
    >
      {/* 1. FOLDER COVER (Z-30) */}
      <div className={`absolute inset-0 rounded-sm shadow-2xl p-6 flex flex-col justify-between border-t-[1px] transition-all duration-700 transform origin-bottom group-hover:rotate-x-180 group-hover:opacity-0 z-30 pointer-events-none group-hover:pointer-events-none
        ${isDark ? 'bg-[#1c1c1c] border-gray-600' : 'bg-[#d8c29d] border-[#b08d55]'} 
      `}>
         <div className={`absolute -top-4 left-0 w-24 h-6 rounded-t-sm border-t border-l border-r 
            ${isDark ? 'bg-[#1c1c1c] border-gray-600' : 'bg-[#d8c29d] border-[#b08d55]'}`}>
            <span className="absolute top-1 left-2 text-[8px] font-bold opacity-50 uppercase tracking-widest">{project.id}</span>
         </div>

         <div className="mt-6 border-b-2 border-current pb-4">
            <h2 className={`text-xl font-serif font-bold tracking-[0.1em] uppercase ${isDark ? 'text-gray-200' : 'text-[#3e2723]'}`}>
              {project.title}
            </h2>
            <p className="text-[9px] uppercase tracking-[0.3em] opacity-60 mt-2">Client: {project.client}</p>
         </div>

         <div className="border-4 border-red-800/40 p-2 transform -rotate-12 w-32 text-center opacity-70 mix-blend-multiply self-center">
            <span className="text-red-900 font-black text-lg uppercase tracking-widest">CONFIDENTIAL</span>
         </div>
         
         <div className="self-end opacity-20">
            <Folder size={32} />
         </div>
      </div>

      {/* 2. INSIDE PAPER (Fixed Z-Index: jumps to z-40 on hover) */}
      <div className={`absolute inset-0 top-2 rounded-sm p-6 flex flex-col justify-between shadow-inner transition-all duration-500 group-hover:-translate-y-4 group-hover:z-40 overflow-hidden
        ${isDark ? 'bg-gray-200 text-gray-900' : 'bg-white text-gray-900'}`}
      >
        <div className="absolute inset-0 bg-blue-500/10 translate-y-full group-hover:animate-scan pointer-events-none z-10">
            <div className="w-full h-1 bg-blue-400 shadow-[0_0_15px_#60a5fa]"></div>
        </div>

        <div>
          <div className="flex justify-between items-start mb-4">
             <div className="flex items-center gap-2">
                <ScanLine size={14} className="text-blue-600 animate-pulse" />
                <span className="text-[9px] font-mono font-bold text-blue-600">READING...</span>
             </div>
             {project.icon}
          </div>
          
          <h3 className="font-bold font-serif text-base tracking-wide uppercase border-b border-gray-300 pb-1 mb-2">{project.title}</h3>
          <p className="font-typewriter text-[11px] leading-relaxed mb-4 opacity-80">{project.desc}</p>
          
          <div className="flex flex-wrap gap-2">
             {project.tech.map(t => (
               <span key={t} className="text-[9px] border border-gray-800 px-1 py-0.5 uppercase font-bold tracking-wider">{t}</span>
             ))}
          </div>
        </div>
        
        {/* LINKS (Increased Z-index to 50 to be safe) */}
        <div className="flex justify-end gap-4 mt-2 border-t border-gray-200 pt-2 z-50 relative">
           {project.github && (
             <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[10px] font-bold hover:text-blue-700 transition-colors cursor-pointer">
                <Github size={12} /> CODE
             </a>
           )}
           {project.link && (
             <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[10px] font-bold hover:text-blue-700 transition-colors cursor-pointer">
                <ExternalLink size={12} /> LIVE
             </a>
           )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSuits = () => {
  const { isDarkMode } = useThemeStore();

  return (
    <section className={`h-full w-full relative flex flex-col items-center justify-center overflow-hidden transition-colors duration-1000
      ${isDarkMode ? 'bg-[#0f0f12]' : 'bg-[#eef2f3]'}
    `}>
      
      {/* ================= BACKGROUND ================= */}
      <MarbleWall isDark={isDarkMode} />
      <CitySkyline isDark={isDarkMode} />
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-30"></div>

      {/* ================= EASTER EGGS: HARVEY & MIKE ================= */}
      
      {/* HARVEY: The Basketball (Bottom Left) */}
      <motion.div 
         className="absolute bottom-6 left-6 hidden xl:flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity duration-500 z-30 group"
         whileHover={{ rotate: 360, scale: 1.1 }}
      >
         <BasketballIcon className="w-16 h-16 drop-shadow-xl" />
         {/* Tooltip: Grows Upwards */}
         <div className="absolute bottom-20 left-0 bg-black text-white px-3 py-1 text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white">
            Client: Michael Jordan
         </div>
      </motion.div>

      {/* MIKE: The Briefcase (Bottom Right - Shifted Left) */}
      <motion.div 
         className="absolute bottom-6 right-24 hidden xl:flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity duration-500 z-30 group"
         whileHover={{ scale: 1.1, rotate: -5 }}
      >
         <Briefcase size={56} className={isDarkMode ? 'text-gray-400' : 'text-gray-700'} strokeWidth={1.5} />
         
         {/* Tooltip: Aligned to Right Edge to prevent overflow */}
         <div className="absolute bottom-20 right-0 bg-black text-white px-3 py-1 text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white">
            The Rookie's Secret
         </div>
      </motion.div>


      {/* ================= MAIN CONTENT ================= */}
      
      <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center">
        
        {/* THE NAME ON THE WALL */}
        <motion.div 
           className="mb-12 text-center"
           initial={{ scale: 0.95, opacity: 0 }}
           whileInView={{ scale: 1, opacity: 1 }}
           transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-center gap-4 mb-2 opacity-50">
             <div className={`h-[1px] w-20 ${isDarkMode ? 'bg-white' : 'bg-black'}`}></div>
             <span className={`text-[10px] font-sans font-bold tracking-[0.3em] uppercase ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Managing Partner
             </span>
             <div className={`h-[1px] w-20 ${isDarkMode ? 'bg-white' : 'bg-black'}`}></div>
          </div>

          <h1 className="text-6xl md:text-9xl font-serif font-thin tracking-tighter uppercase relative inline-block">
             <span className={`relative z-10 ${isDarkMode 
                ? 'text-transparent bg-clip-text bg-gradient-to-b from-gray-100 to-gray-600 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]' 
                : 'text-transparent bg-clip-text bg-gradient-to-b from-gray-800 to-black drop-shadow-lg'}`}>
                SAUMYA SHAH
             </span>
          </h1>
          
          <h2 className={`text-xl md:text-2xl font-bold tracking-[0.8em] uppercase mt-2 -ml-2 ${isDarkMode ? 'text-cyan-500' : 'text-[#b08d55]'}`}>
             The Closer
          </h2>
        </motion.div>

        {/* GLASS DESK AREA */}
        <div className="relative z-30">
             <div className="absolute -inset-4 bg-white/5 blur-xl rounded-full z-0 pointer-events-none"></div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full max-w-6xl mx-auto px-4 relative z-10">
                {cases.map((c, i) => (
                    <CaseFile key={c.id} project={c} isDark={isDarkMode} index={i} />
                ))}
             </div>
        </div>

        {/* DYNAMIC QUOTE */}
        <motion.div 
            className="mt-20 text-center opacity-60 hover:opacity-100 transition-opacity duration-500"
            whileHover={{ scale: 1.05 }}
        >
            <div className={`h-12 w-[1px] mx-auto mb-4 ${isDarkMode ? 'bg-gradient-to-b from-transparent to-white' : 'bg-gradient-to-b from-transparent to-black'}`}></div>
            <p className={`text-sm md:text-base font-serif italic tracking-wide ${isDarkMode ? 'text-white' : 'text-black'}`}>
              {isDarkMode ? '"Life is this. I like this."' : '"I don\'t play the odds, I play the man."'}
            </p>
            <p className="text-[10px] font-bold uppercase mt-2 opacity-50">— Harvey Specter</p>
        </motion.div>

      </div>
    </section>
  );
};

export default ProjectsSuits;