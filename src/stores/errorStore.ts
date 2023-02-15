import { create } from "zustand";

export const useErrorStore = create()((set) => ({
  errors: {},
  actions: {
    setError: (newError: any) =>
      set((state: any) => ({ errors: { ...state.errors, ...newError } })),
  },
}));

export const useSetError = () =>
  useErrorStore((state: any) => state.actions.setError);
export const useErrors = () => useErrorStore((state: any) => state.errors);
