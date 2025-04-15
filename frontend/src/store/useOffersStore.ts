import { create } from "zustand";

type OffersState = {
  isUpdating: boolean;
  isDeleting: boolean;
  setUpdating: (status: boolean) => void;
  setDeleting: (status: boolean) => void;
};

export const useOffersStore = create<OffersState>((set) => ({
  isUpdating: false,
  isDeleting: false,
  setUpdating: (status: boolean) => set({ isUpdating: status }),
  setDeleting: (status: boolean) => set({ isDeleting: status }),
}));
