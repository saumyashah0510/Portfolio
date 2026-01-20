import { motion } from 'framer-motion';
import { useState } from 'react';
import { useThemeStore } from '../store';
import { Mail, Linkedin, Github, Send, Instagram } from 'lucide-react';

// --- CUSTOM SVG: BLUE FRENCH HORN ---
const BlueFrenchHorn = () => (
  <svg viewBox="0 0 100 100" className="w-32 h-32 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]">
    <path d="M80 20 Q 90 10 95 25 Q 100 40 85 45 L 70 40" fill="#2563eb" />
    <path d="M70 40 Q 50 35 40 50 Q 30 65 50 75 Q 70 85 80 60" fill="none" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
    <path d="M40 50 Q 20 40 20 60 Q 20 80 40 80 Q 60 80 60 60" fill="none" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
    <line x1="60" y1="60" x2="65" y2="55" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
  </svg>
);

// --- CUSTOM SVG: YELLOW UMBRELLA ---
const YellowUmbrella = () => (
  <svg viewBox="0 0 100 100" className="w-32 h-32 drop-shadow-xl">
    <path d="M10 50 Q 50 10 90 50" fill="#facc15" stroke="#eab308" strokeWidth="2" />
    <line x1="50" y1="10" x2="50" y2="90" stroke="#fef08a" strokeWidth="3" />
    <path d="M50 90 Q 60 100 70 90" fill="none" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// --- ASSETS ---
const WoodTable = ({ isDark }) => (
  <div className={`absolute inset-0 z-0 pointer-events-none transition-all duration-1000 ${isDark ? 'opacity-80' : 'opacity-100'}`}
    style={{
      // Switch textures based on mode
      backgroundImage: isDark 
        ? `url("https://www.transparenttextures.com/patterns/wood-pattern.png")` 
        : `url("https://www.transparenttextures.com/patterns/purty-wood.png")`, 
      backgroundColor: isDark ? '#2c1e12' : '#d4b483', // Dark Walnut vs Light Oak
      backgroundSize: '300px'
    }}
  />
);

const Coaster = ({ icon, link, label, delay, color }) => (
    <motion.a 
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group w-24 h-24 md:w-32 md:h-32 rounded-full flex flex-col items-center justify-center shadow-xl border-4 border-[#d4b483] bg-[#f4e4bc] cursor-pointer"
        initial={{ scale: 0, rotate: 180 }}
        whileInView={{ scale: 1, rotate: Math.random() * 20 - 10 }}
        whileHover={{ scale: 1.1, rotate: 0, zIndex: 50 }}
        transition={{ delay, type: 'spring' }}
        style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/aged-paper.png")` }}
    >
        <div className="absolute inset-2 border-2 border-dashed border-[#8b4513] rounded-full opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10 rounded-full pointer-events-none"></div>
        <div className={`relative z-10 ${color}`}>
            {icon}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest mt-1 text-[#5d4037]">{label}</span>
    </motion.a>
);

const PlaybookForm = ({ isDark }) => {
    // Form State
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleExecutePlay = (e) => {
        e.preventDefault();
        // Mailto Logic: Opens default email client
        const subject = `The Playbook: New Scheme from ${formData.name}`;
        const body = `Codename: ${formData.name}\nFrequency: ${formData.email}\n\nThe Scheme:\n${formData.message}`;
        
        // REPLACE 'saumyashah0510@gmail.com' WITH YOUR ACTUAL EMAIL
        window.location.href = `mailto:saumyashah0510@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <motion.div 
            className="relative w-full max-w-md bg-[#8b0000] p-1 rounded-lg shadow-2xl rotate-1"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/leather.png")` }}></div>
            
            <div className="bg-[#1a1a1a] border-4 border-[#d4b483] p-8 relative overflow-hidden">
                <h2 className="text-3xl font-serif font-bold text-[#d4b483] text-center uppercase tracking-[0.2em] mb-6 border-b border-[#d4b483] pb-4">
                    The Playbook
                </h2>

                <form onSubmit={handleExecutePlay} className="space-y-4 relative z-10">
                    <div>
                        <label className="block text-[#d4b483] text-xs uppercase font-bold mb-1">Codename (Name)</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full bg-transparent border-b border-[#d4b483] text-white focus:outline-none focus:border-yellow-500 transition-colors py-1 font-typewriter" 
                            placeholder="Ted Mosby" 
                        />
                    </div>
                    <div>
                        <label className="block text-[#d4b483] text-xs uppercase font-bold mb-1">Frequency (Email)</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-transparent border-b border-[#d4b483] text-white focus:outline-none focus:border-yellow-500 transition-colors py-1 font-typewriter" 
                            placeholder="architect@gnb.com" 
                        />
                    </div>
                    <div>
                        <label className="block text-[#d4b483] text-xs uppercase font-bold mb-1">The Scheme (Message)</label>
                        <textarea 
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full bg-transparent border-b border-[#d4b483] text-white focus:outline-none focus:border-yellow-500 transition-colors py-1 h-20 font-typewriter resize-none" 
                            placeholder="Suit up!" 
                        />
                    </div>

                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full mt-4 bg-[#d4b483] text-black font-bold uppercase py-3 tracking-widest hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <Send size={18} /> Execute Play
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
};

const ContactHIMYM = () => {
  const { isDarkMode } = useThemeStore();

  return (
    <section id="contact" className={`h-full w-full relative flex flex-col md:flex-row items-center justify-center overflow-hidden transition-colors duration-1000
      ${isDarkMode ? 'bg-[#1a0f0a]' : 'bg-[#5d4037]'}
    `}>
      
      {/* Background Table (Changes texture based on mode) */}
      <WoodTable isDark={isDarkMode} />
      
      {/* Vignette */}
      <div className={`absolute inset-0 pointer-events-none z-10 transition-opacity duration-1000 ${isDarkMode ? 'bg-[radial-gradient(transparent_0%,#000000_90%)]' : 'bg-[radial-gradient(transparent_0%,#3e2723_60%)] opacity-40'}`}></div>

      {/* Floating Decor */}
      <motion.div 
        className="absolute top-10 right-10 z-20 opacity-80"
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {isDarkMode ? <BlueFrenchHorn /> : <YellowUmbrella />}
      </motion.div>

      {/* CONTENT LAYOUT */}
      <div className="relative z-30 container mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
        
        {/* LEFT: SOCIAL COASTERS */}
        <div className="flex flex-col items-center">
            <motion.div 
                className="mb-8 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
            >
                <h1 className={`text-4xl md:text-5xl font-serif font-bold drop-shadow-md uppercase ${isDarkMode ? 'text-[#f4e4bc]' : 'text-[#3e2723]'}`}>
                    Have You Met <br/><span className="text-yellow-500">Saumya?</span>
                </h1>
                <p className={`text-sm mt-2 italic ${isDarkMode ? 'text-[#d4b483]' : 'text-[#3e2723]'}`}>"It's going to be legendary."</p>
            </motion.div>

            <div className="grid grid-cols-2 gap-6">
                <Coaster icon={<Linkedin size={32} />} link="https://linkedin.com/in/saumya-shah-5bb8602b4/" label="Connect" delay={0.2} color="text-blue-700" />
                <Coaster icon={<Github size={32} />} link="https://github.com/saumyashah0510" label="Code" delay={0.4} color="text-gray-900" />
                <Coaster icon={<Instagram size={32} />} link="https://www.instagram.com/saumyashah05/" label="Social" delay={0.6} color="text-pink-600" />
                <Coaster icon={<Mail size={32} />} link="mailto:saumyashah0510@gmail.com" label="Email" delay={0.8} color="text-red-600" />
            </div>
        </div>

        {/* RIGHT: THE CONTACT FORM */}
        <PlaybookForm isDark={isDarkMode} />

      </div>
    </section>
  );
};

export default ContactHIMYM;