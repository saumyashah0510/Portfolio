import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

const SoundManager = () => {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(new Audio());
  const [currentTrack, setCurrentTrack] = useState(null);

  // Define tracks
  const tracks = {
    0: '/spiderman.mp3', 
    1: '/office.mp3',   
    2: '/got.mp3',       
    3: '/suits.mp3'      
  };

  const fadeAudio = (targetUrl) => {
    const audio = audioRef.current;
    
    // Quick fade out
    const fadeOut = setInterval(() => {
        if (audio.volume > 0.1) {
            audio.volume -= 0.1;
        } else {
            clearInterval(fadeOut);
            audio.pause();
            
            if (targetUrl) {
                audio.src = targetUrl;
                audio.load();
                audio.play().catch(e => console.log("Audio play blocked", e));
                
                // Quick fade in
                const fadeIn = setInterval(() => {
                    if (audio.volume < 0.9) {
                        audio.volume += 0.1;
                    } else {
                        clearInterval(fadeIn);
                    }
                }, 50);
            }
        }
    }, 50);
  };

  useEffect(() => {
    // THE FIX: Select the <main> tag, not window
    const mainContainer = document.querySelector('main');

    const handleScroll = () => {
      if (isMuted || !mainContainer) return;

      // Use scrollTop of the container, not window.scrollY
      const scrollPosition = mainContainer.scrollTop;
      const windowHeight = window.innerHeight;
      
      // Calculate which page we are on
      const activeSectionIndex = Math.round(scrollPosition / windowHeight);

      const newTrack = tracks[activeSectionIndex];

      if (newTrack !== currentTrack) {
        setCurrentTrack(newTrack);
        fadeAudio(newTrack);
      }
    };

    if (mainContainer) {
        mainContainer.addEventListener('scroll', handleScroll);
    }
    
    return () => {
        if (mainContainer) mainContainer.removeEventListener('scroll', handleScroll);
    };
  }, [currentTrack, isMuted]);

  const toggleMute = () => {
    const audio = audioRef.current;
    audio.loop = true;
    
    if (isMuted) {
      setIsMuted(false);
      
      // Immediately calculate current position to play right track
      const mainContainer = document.querySelector('main');
      const scrollPosition = mainContainer ? mainContainer.scrollTop : 0;
      const windowHeight = window.innerHeight;
      const activeSectionIndex = Math.round(scrollPosition / windowHeight);
      
      const track = tracks[activeSectionIndex];
      setCurrentTrack(track);
      
      audio.src = track;
      audio.volume = 0;
      audio.play();
      
      const fadeIn = setInterval(() => {
          if (audio.volume < 0.9) audio.volume += 0.1;
          else clearInterval(fadeIn);
      }, 50);

    } else {
      setIsMuted(true);
      audio.pause();
      setCurrentTrack(null);
    }
  };

  return (
    <motion.button
      onClick={toggleMute}
      className="fixed bottom-6 right-6 z-[100] p-3 rounded-full bg-white text-black border-2 border-black shadow-xl hover:scale-110 transition-transform"
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
    </motion.button>
  );
};

export default SoundManager;