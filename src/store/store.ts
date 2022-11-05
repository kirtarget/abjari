import create from 'zustand'
import { persist } from 'zustand/middleware'
import { IProduct } from '../lib/types/productType'

interface BearStore {
    items: IProduct[]
    loggedIn: boolean
    logIn: () => void
    logOut: () => void
    setItems: (array: IProduct[]) => void
}

export const useBearStore = create(
    persist<BearStore>(
        (set) => ({
            items: [],
            loggedIn: false,
            logIn: () =>
                set(() => ({
                    loggedIn: true,
                })),
            logOut: () =>
                set(() => ({
                    loggedIn: false,
                })),
            setItems: (array): void =>
                set((state) => ({
                    ...state,
                    items: array,
                })),
        }),
        {
            name: 'statestorage',
        }
    )
)
