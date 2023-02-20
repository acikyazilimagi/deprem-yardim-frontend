import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IUseLoading {
  loading: boolean;
  showLoading: (_state: boolean) => void;
}

export const useLoading = create<IUseLoading>()(
  devtools(
    (set) => ({
      loading: false,
      showLoading: (state: boolean) =>
        set(() => ({ loading: state }), undefined, { type: "showLoading" }),
    }),
    { name: "LoadingStore" }
  )
);
