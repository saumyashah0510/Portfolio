import CustomCursor from './components/CustomCursor';
import ThemeToggle from './components/ThemeToggle';
import HeroSpiderVerse from './components/HeroSpiderVerse';
import AboutTheOffice from './components/AboutTheOffice';
import SkillsGOT from './components/SkillsGOT'; // Import Skills
import ProjectsSuits from './components/ProjectsSuits';   // Import Projects
import TvStatic from './components/TvStatic';
import { useThemeStore } from './store';
import SoundManager from './components/SoundManager';

function App() {
  const { isDarkMode } = useThemeStore();

  return (
    <>
      <CustomCursor />
      <ThemeToggle />
      <SoundManager />
      
      <main className={`h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth transition-colors duration-700 ${isDarkMode ? 'bg-[#100a1a]' : 'bg-white'}`}>
        
        {/* PAGE 1: HERO (Spider-Verse) */}
        <section className="snap-start w-full h-full relative overflow-hidden">
          <HeroSpiderVerse />
        </section>
        
        <div className="fixed inset-0 z-50 pointer-events-none"><TvStatic /></div>

        {/* PAGE 2: ABOUT (The Office) */}
        <section className="snap-start w-full h-full relative overflow-hidden">
          <AboutTheOffice />
        </section>

        {/* PAGE 3: SKILLS (One Piece) */}
        <section className="snap-start w-full h-full relative overflow-hidden">
          <SkillsGOT />
        </section>

        {/* PAGE 4: PROJECTS (Suits) */}
        <section className="snap-start w-full h-full relative overflow-hidden">
          <ProjectsSuits />
        </section>

      </main>
    </>
  );
}

export default App;