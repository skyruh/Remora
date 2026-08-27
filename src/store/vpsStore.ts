import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AuthMethod = 'password' | 'key' | 'agent';

export interface VpsProfile {
  id: string;
  name: string;
  host: string;
  port: number;
  user: string;
  authMethod: AuthMethod;
  privateKeyPath?: string;
  // Passwords / Passphrases shouldn't be stored in plaintext in local storage, 
  // but we can hold a reference or fetch from keyring.
}

interface VpsState {
  profiles: VpsProfile[];
  activeProfileId: string | null;
  addProfile: (profile: VpsProfile) => void;
  updateProfile: (id: string, updates: Partial<VpsProfile>) => void;
  removeProfile: (id: string) => void;
  setActiveProfile: (id: string | null) => void;
}

export const useVpsStore = create<VpsState>()(
  persist(
    (set) => ({
      profiles: [],
      activeProfileId: null,
      addProfile: (profile) =>
        set((state) => ({ profiles: [...state.profiles, profile] })),
      updateProfile: (id, updates) =>
        set((state) => ({
          profiles: state.profiles.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),
      removeProfile: (id) =>
        set((state) => ({
          profiles: state.profiles.filter((p) => p.id !== id),
          activeProfileId: state.activeProfileId === id ? null : state.activeProfileId,
        })),
      setActiveProfile: (id) => set({ activeProfileId: id }),
    }),
    {
      name: 'remora-vps-storage',
    }
  )
);
