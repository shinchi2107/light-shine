import { create } from "zustand";

export const useAuthStore = create((set) => ({
    accessToken: null,
    refreshToken: null,
    setAccessToken: (accessToken) => set({ accessToken }),
    setRefreshToken: (refreshToken) => set({ refreshToken }),
    clearAuth: () => set({ accessToken: null, refreshToken: null }),
}))