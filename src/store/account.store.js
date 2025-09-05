import { create } from "zustand";

export const useAccountStore = create((set) => ({
    accountId: null,
    setAccountId: (accountId) => set({ accountId }),
    clearAccountId: () => set({ accountId: null }),
}))