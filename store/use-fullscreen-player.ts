import { create } from "zustand";

type State = {
  isOpen: boolean;
  isExpanded: boolean;
  setIsOpen: (val: boolean) => void;
  setIsExpanded: (val: boolean) => void;
};

export const useFullScreenPlayer = create<State>((set) => ({
  isOpen: false,
  isExpanded: true,
  setIsOpen: (val) => {
    set({ isOpen: val });
  },
  setIsExpanded: (val) => {
    set({ isExpanded: val });
  },
}));
