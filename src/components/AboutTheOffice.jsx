import { motion } from 'framer-motion';
import { Paperclip, Coffee, Printer } from 'lucide-react';
import { useThemeStore } from '../store';

// --- Effect 1: Blinds (Adapts to Mode) ---
const BlindsOverlay = ({ isDark }) => (
  <div className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-700"
    style={{
      opacity: isDark ? 0.3 : 0.2,
      mixBlendMode: isDark ? 'normal' : 'multiply',
      backgroundImage: `repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.1)'} 40px,
        ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.1)'} 80px
      )`
    }}
  />
);

// --- Effect 2: Highlighter (Adapts to Mode) ---
const Highlight = ({ children, isDark }) => (
  <span className="relative inline-block px-1">
    <span className={`absolute inset-0 -skew-x-3 transform -z-10 h-[90%] top-[10%] w-full opacity-60 mix-blend-overlay transition-colors duration-700
        ${isDark ? 'bg-cyan-600' : 'bg-yellow-200 opacity-80 mix-blend-multiply'}`} 
    />
    <span className={`relative z-10 font-bold transition-colors duration-700 ${isDark ? 'text-white' : 'text-black'}`}>
        {children}
    </span>
  </span>
);

const AboutTheOffice = () => {
  const { isDarkMode } = useThemeStore();

  return (
    <section className={`h-full w-full relative flex flex-col items-center justify-center py-10 lg:py-0 overflow-hidden transition-colors duration-700
        ${isDarkMode ? 'bg-[#121212] text-gray-200' : 'bg-[#fdfdfd] text-gray-800'}`}>
      
      {/* Background Texture */}
      <div className={`absolute inset-0 opacity-5 pointer-events-none transition-all duration-700 ${isDarkMode ? 'invert' : ''}`} 
        style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/notebook.png")` }} 
      />
      <BlindsOverlay isDark={isDarkMode} />
      
      {/* Coffee Stain */}
      <div className={`absolute top-[10%] right-[15%] w-48 h-48 rounded-full border-8 opacity-20 blur-sm pointer-events-none hidden lg:block transition-colors duration-700
        ${isDarkMode ? 'border-[#3d2b1f]' : 'border-[#6F4E37]'}`}></div>

      {/* Dundie Award */}
      <motion.div 
        className="absolute bottom-5 left-10 hidden xl:flex flex-col items-center"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <img src="../dundie.png" alt="Dundie Award" className={`w-24 transition-all duration-700 ${isDarkMode ? 'drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]' : 'drop-shadow-2xl'}`} onError={(e) => {e.target.style.display='none'}} />
        <span className={`text-[10px] px-2 py-1 mt-2 font-bold uppercase tracking-widest shadow-md transition-colors duration-700 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>Fine Work Award</span>
      </motion.div>

      <div className="container mx-auto px-6 relative z-30 flex flex-col lg:flex-row gap-12 xl:gap-24 items-center justify-center h-full">
        
        {/* LEFT: ID CARD */}
        <motion.div className="w-full lg:w-5/12 flex justify-center mt-10 lg:mt-0" initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
          <div className={`relative w-[300px] h-[480px] xl:w-[340px] xl:h-[520px] shadow-2xl rounded-xl overflow-hidden border transform rotate-[-2deg] hover:rotate-0 transition-all duration-700
            ${isDarkMode ? 'bg-[#1e1e1e] border-gray-700 shadow-[0_0_20px_rgba(0,0,0,0.5)]' : 'bg-white border-gray-300'}`}>
            
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-12 bg-black rounded-lg opacity-80 z-20 flex items-end justify-center pb-2">
                <div className="w-16 h-1 bg-gray-400 rounded-full"></div>
            </div>

            <div className="h-[70%] relative">
               <img src="../website_pic.png" alt="Saumya Shah" className="w-full h-full object-cover" onError={(e) => {e.target.style.display='none'}} />
               <div className={`absolute bottom-0 w-full py-2 text-center shadow-lg transition-colors duration-700 ${isDarkMode ? 'bg-[#1a3d5c] border-t border-gray-600' : 'bg-[#2b5f8c]'}`}>
                 <p className={`font-bold text-xs tracking-[0.3em] uppercase ${isDarkMode ? 'text-cyan-400' : 'text-white'}`}>Security Clearance: Level 5</p>
               </div>
            </div>
            
            <div className={`p-6 text-center relative transition-colors duration-700 ${isDarkMode ? 'bg-[#1e1e1e]' : 'bg-white'}`}>
                <h3 className={`text-3xl font-black uppercase tracking-tight leading-none mb-1 transition-colors duration-700 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>SAUMYA SHAH</h3>
                <p className={`text-sm font-bold uppercase tracking-widest transition-colors duration-700 ${isDarkMode ? 'text-cyan-500' : 'text-[#2b5f8c]'}`}>Dhirubhai Ambani University</p>
                <div className={`mt-4 border-t-2 border-dashed pt-2 transition-colors duration-700 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                    <p className="font-typewriter text-xs text-gray-500">Authorized Personnel</p>
                </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: CONTENT */}
        <motion.div className="w-full lg:w-6/12 max-w-3xl text-left relative" initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <div className={`inline-flex items-center gap-3 mb-6 px-4 py-1 rounded-sm shadow-lg transition-colors duration-700 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
             <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></div>
             <span className="font-mono uppercase text-sm tracking-widest font-bold">REC 00:04:20</span>
          </div>

          <h1 className={`text-5xl md:text-6xl xl:text-7xl font-extrabold font-sans mb-6 leading-[1.1] transition-colors duration-700 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Hi, I am <br/> 
            <span className={`decoration-4 underline underline-offset-8 transition-colors duration-700 ${isDarkMode ? 'text-cyan-400 decoration-pink-500' : 'text-[#2b5f8c] decoration-yellow-400'}`}>Saumya Shah</span>.
          </h1>

          <div className={`space-y-6 font-typewriter text-lg md:text-xl xl:text-2xl leading-relaxed relative z-10 transition-colors duration-700 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
            <p>I am a <Highlight isDark={isDarkMode}>Second Year Student</Highlight> at Dhirubhai Ambani University.</p>
            <p>I spend my days navigating the chaotic world of <span className={`font-bold ${isDarkMode ? 'text-cyan-400' : 'text-[#2b5f8c]'}`}>Web Development</span> and solving DSA puzzles faster than Dwight can shout "Identity Theft!"</p>
            <p>But my real passion? <Highlight isDark={isDarkMode}>Machine Learning.</Highlight> I teach computers to think, mostly so I don't have to.</p>
          </div>

          <div className="mt-12 flex flex-col md:flex-row gap-6 items-start">
             <a href="../resume.pdf" target="_blank" rel="noopener noreferrer"
               className={`px-10 py-4 font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all rounded-sm flex items-center gap-3 cursor-pointer z-30
               ${isDarkMode ? 'bg-white text-black hover:bg-cyan-400 hover:text-white' : 'bg-[#2b5f8c] text-white hover:bg-[#1f4363]'}`}>
               <Paperclip size={20} />
               Download Resume
             </a>
          </div>

          <p className="mt-8 text-xs text-gray-500 font-mono italic">"Bears. Beets. Binary Code."</p>

        </motion.div>
      </div>
    </section>
  );
};

export default AboutTheOffice;