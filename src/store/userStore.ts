import create from "zustand";
import { persist } from "zustand/middleware";
import { Item } from "../lib/types/apiTypes";
import { useBearStore } from "./store";

interface Storage {
  getItem: (name: string) => string | null | Promise<string | null>;
  setItem: (name: string, value: string) => void | Promise<void>;
  removeItem: (name: string) => void | Promise<void>;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserStore {
  id: string;
  name: string;
  email: string;
  avatar: string;
  setUser: (user: User) => void;
  cart?: { id: number; quantity: number }[];
}

export const useUserStore = create(
  persist<UserStore>(
    (set, get) => ({
      id: "",
      name: "",
      email: "",
      avatar: "",
      setUser: (user: User) =>
        set((state) => ({
          ...state,
          ...user,
        })),
    }),

    {
      name: "userstorage",
    }
  )
);
