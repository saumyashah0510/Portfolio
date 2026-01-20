import CustomCursor from './components/CustomCursor';
import ThemeToggle from './components/ThemeToggle'; // Import Toggle
import HeroSpiderVerse from './components/HeroSpiderVerse';
import AboutTheOffice from './components/AboutTheOffice';
import TvStatic from './components/TvStatic';
import { useThemeStore } from './store'; // Import store to get state

function App() {
  const { isDarkMode } = useThemeStore();

  return (
    <>
      <CustomCursor />
      <ThemeToggle /> {/* Floating Button */}
      
      {/* Dynamic Background for the whole app */}
      <main className={`h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth transition-colors duration-700 ${isDarkMode ? 'bg-[#100a1a]' : 'bg-white'}`}>
        
        <section className="snap-start w-full h-full relative overflow-hidden">
          <HeroSpiderVerse />
        </section>
        
        <div className="fixed inset-0 z-50 pointer-events-none">
            <TvStatic />
        </div>

        <section className="snap-start w-full h-full relative overflow-hidden">
          <AboutTheOffice />
        </section>

      </main>
    </>
  );
}

export default App;