import { create } from "zustand";

interface CommonState {
  isFooterBannerOpen: boolean;

  actions: {
    // eslint-disable-next-line no-unused-vars
    setIsFooterBannerOpen: (isFooterBannerOpen: boolean) => void;
  };
}
/**
 * This store is a common store that is used to store common state that is used accross the app.
 * Only add the state here if it has nothing to do with the domain.
 */
export const commonStore = create<CommonState>((set) => ({
  isFooterBannerOpen: false,
  actions: {
    setIsFooterBannerOpen: (isFooterBannerOpen: boolean) =>
      set(() => ({ isFooterBannerOpen })),
  },
}));

export const useIsFooterBannerOpen = () =>
  commonStore((state) => state.isFooterBannerOpen);

export const useSetIsFooterBannerOpen = () =>
  commonStore((state) => state.actions.setIsFooterBannerOpen);
