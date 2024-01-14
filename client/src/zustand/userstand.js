import { create } from 'zustand'

import { createJSONStorage, persist } from "zustand/middleware";

export const useStore = create(persist((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}), {
  name: "user-auth-storage",
  getStorage: () => createJSONStorage(() => localStorage)
}))



