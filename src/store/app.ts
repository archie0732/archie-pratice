import { useTheme } from 'next-themes';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppData {
  mode: 'dark' | 'light';
  changeMode(): void;
}

export const useAppStore = create(persist<AppData>((set) => ({
  mode: 'dark',
  changeMode() {
    const { setTheme } = useTheme();
    set((p) => ({ mode: p.mode == 'dark' ? 'light' : 'dark' }));
    setTheme(this.mode);
  },
}), {
  name: 'app-store',
}));
