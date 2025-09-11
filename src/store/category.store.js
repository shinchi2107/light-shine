import { create } from "zustand";

export const useCategoryStore = create((set) => ({
    categoryId: null,
    setCategoryId: (categoryId) => set({ categoryId }),
    clearCategoryId: () => set({ categoryId: null }),
}))