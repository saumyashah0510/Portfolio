import { create } from 'zustand';

export const useThemeStore = create((set) => ({
  isDarkMode: false, // <--- Change this from 'true' to 'false'
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));