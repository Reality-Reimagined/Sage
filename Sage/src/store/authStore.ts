import { create } from 'zustand';
import type { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: any;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
}

// Temporary mock user for development
const mockUser = {
  id: '1',
  email: 'admin@example.com',
  user_metadata: {
    name: 'Admin User'
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: false,
  signIn: async (email, password) => {
    set({ loading: true });
    try {
      // Temporary auth logic
      if (email === 'admin@example.com' && password === 'admin123') {
        set({ user: mockUser as any, session: { user: mockUser }, loading: false });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
  signUp: async (email, password) => {
    set({ loading: true });
    try {
      // Temporary signup logic
      set({ user: mockUser as any, session: { user: mockUser }, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
  signOut: async () => {
    set({ user: null, session: null, loading: false });
  },
  setUser: (user) => set({ user, loading: false }),
}));