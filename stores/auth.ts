"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/data/interface";
import { users } from "@/data/mock";

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => User | null;
  signup: (name: string, email: string, phone: string, password: string) => User;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      login: (email, password) => {
        const found = users.find(
          (u) => u.email.toLowerCase() === email.trim().toLowerCase() && password.length > 0
        );
        if (found) {
          set({ user: found });
          return found;
        }
        return null;
      },
      signup: (name, email, phone, password) => {
        const newUser: User = {
          id: "u" + Date.now(),
          name,
          email,
          phone,
          role: "CUSTOMER",
          avatar: "https://i.pravatar.cc/150?img=15",
          greenPoints: 100,
          createdAt: new Date().toISOString().slice(0, 10),
        };
        set({ user: newUser });
        return newUser;
      },
      logout: () => set({ user: null }),
      updateProfile: (data) => {
        const u = get().user;
        if (u) set({ user: { ...u, ...data } });
      },
    }),
    {
      name: "fresroot-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }),
    }
  )
);
