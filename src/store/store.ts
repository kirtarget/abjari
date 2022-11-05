import create from "zustand";
import { persist } from "zustand/middleware";
import { Item } from "../lib/types/apiTypes";
import { IProduct } from "../lib/types/productType";

interface BearStore {
  items: IProduct[];
  loggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
  setItems: (array: IProduct[]) => void;
}

export const useBearStore = create(
  persist<BearStore>(
    (set, get) => ({
      items: [],
      loggedIn: false,
      logIn: () =>
        set((state) => ({
          loggedIn: true,
        })),
      logOut: () =>
        set((state) => ({
          loggedIn: false,
        })),
      setItems: (array): void =>
        set((state) => ({
          ...state,
          items: array,
        })),
    }),
    {
      name: "statestorage",
    }
  )
);
