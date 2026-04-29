import { create } from "zustand";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../supabase/client";
import { AuthService } from "../services/authService";
import { User, UserRole } from "../types/domain";

export type AuthState = {
  isReady: boolean;
  session: Session | null;
  user: User | null;
  role: UserRole | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  setReady: (ready: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isReady: false,
  session: null,
  user: null,
  role: null,
  login: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error;
    }
    if (!data.session) {
      throw new Error("Login succeeded, but no active session was returned.");
    }

    const user = await AuthService.resolveUser(data.session);
    set({
      isReady: true,
      session: data.session,
      user,
      role: user.role,
    });
  },
  logout: async () => {
    await supabase.auth.signOut();
    set({ isReady: true, session: null, user: null, role: null });
  },
  setSession: (session: Session | null) => set({ session }),
  setUser: (user: User | null) => set({ user, role: user?.role ?? null }),
  setReady: (isReady: boolean) => set({ isReady }),
}));
