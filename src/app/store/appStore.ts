import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Location {
  city: string;
  area: string;
  lat: number;
  lng: number;
}

interface AppState {
  location: Location | null;
  savedMerchants: string[];
  darkMode: boolean;
  setLocation: (location: Location) => void;
  toggleSavedMerchant: (merchantId: string) => void;
  toggleDarkMode: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      location: null,
      savedMerchants: [],
      darkMode: false,
      setLocation: (location) => set({ location }),
      toggleSavedMerchant: (merchantId) =>
        set((state) => ({
          savedMerchants: state.savedMerchants.includes(merchantId)
            ? state.savedMerchants.filter((id) => id !== merchantId)
            : [...state.savedMerchants, merchantId],
        })),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: 'app-storage',
    }
  )
);
