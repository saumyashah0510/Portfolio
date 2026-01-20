import CustomCursor from './components/CustomCursor';
import ThemeToggle from './components/ThemeToggle';
import SoundManager from './components/SoundManager';
// Navbar import removed

// THE 5 PAGES
import HeroSpiderVerse from './components/HeroSpiderVerse';
import AboutTheOffice from './components/AboutTheOffice';
import SkillsGOT from './components/SkillsGOT';
import ProjectsSuits from './components/ProjectsSuits';
import ContactHIMYM from './components/ContactHIMYM';

import TvStatic from './components/TvStatic';
import { useThemeStore } from './store';

function App() {
  const { isDarkMode } = useThemeStore();

  return (
    <>
      <CustomCursor />
      <ThemeToggle />
      <SoundManager />
      {/* Navbar Removed */}
      
      <main className={`h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth transition-colors duration-700 ${isDarkMode ? 'bg-[#100a1a]' : 'bg-white'}`}>
        
        {/* PAGE 1: HERO (Spider-Verse) */}
        <section id="hero" className="snap-start w-full h-full relative overflow-hidden">
          <HeroSpiderVerse />
        </section>
        
        <div className="fixed inset-0 z-50 pointer-events-none"><TvStatic /></div>

        {/* PAGE 2: ABOUT (The Office) */}
        <section id="about" className="snap-start w-full h-full relative overflow-hidden">
          <AboutTheOffice />
        </section>

        {/* PAGE 3: SKILLS (Game of Thrones) */}
        <section id="skills" className="snap-start w-full h-full relative overflow-hidden">
          <SkillsGOT />
        </section>

        {/* PAGE 4: PROJECTS (Suits) */}
        <section id="projects" className="snap-start w-full h-full relative overflow-hidden">
          <ProjectsSuits />
        </section>

        {/* PAGE 5: CONTACT (HIMYM) */}
        <section id="contact" className="snap-start w-full h-full relative overflow-hidden">
          <ContactHIMYM />
        </section>

      </main>
    </>
  );
}

export default App;