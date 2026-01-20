import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../store';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <motion.button
      className={`fixed top-6 right-6 z-[100] p-3 rounded-full border-2 shadow-xl transition-colors duration-500
        ${isDarkMode ? 'bg-black border-cyan-400 text-cyan-400' : 'bg-white border-black text-black'}
      `}
      onClick={toggleTheme}
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      {isDarkMode ? <Moon size={24} /> : <Sun size={24} />}
    </motion.button>
  );
};

export default ThemeToggle;