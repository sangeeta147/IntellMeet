
import { create } from "zustand";

type AuthState = {
  user: null;
  isAuthenticated: boolean;
  setUser: (user: null) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) => {
    set({ user, isAuthenticated: user !== null });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
