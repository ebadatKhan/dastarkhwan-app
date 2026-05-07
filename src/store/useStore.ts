import { create } from "zustand";

interface AppState {
  isSplashComplete: boolean;
  setSplashComplete: (status: boolean) => void;
  guestCount: number;
  setGuestCount: (count: number) => void;
  selectedCaterer: any | null;
  setSelectedCaterer: (caterer: any) => void;
}

export const useStore = create<AppState>((set) => ({
  isSplashComplete: false,
  setSplashComplete: (status) => set({ isSplashComplete: status }),
  guestCount: 50,
  setGuestCount: (count) => set({ guestCount: count }),
  selectedCaterer: null,
  setSelectedCaterer: (caterer) => set({ selectedCaterer: caterer }),
}));
