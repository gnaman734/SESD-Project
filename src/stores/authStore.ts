import { create } from "zustand";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../supabase/client";
import { User, UserRole } from "../types/domain";

export type AuthState = {
  session: Session | null;
  user: User | null;
  role: UserRole | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
};

export const useAuthStore = create<AuthState>(
  (set: (partial: Partial<AuthState>) => void) => ({
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
    if (data.session) {
      set({ session: data.session });
      const profile = data.session.user.user_metadata as Partial<User>;
      set({
        user: {
          id: data.session.user.id,
          email: data.session.user.email ?? email,
          full_name: profile.full_name ?? "",
          role: (profile.role as UserRole) ?? UserRole.INSTRUCTOR,
          instructor_id: profile.instructor_id ?? null,
          created_at: data.session.user.created_at,
        },
        role: (profile.role as UserRole) ?? UserRole.INSTRUCTOR,
      });
    }
  },
  logout: async () => {
    await supabase.auth.signOut();
    set({ session: null, user: null, role: null });
  },
  setSession: (session: Session | null) => set({ session }),
  setUser: (user: User | null) => set({ user, role: user?.role ?? null }),
  })
);
