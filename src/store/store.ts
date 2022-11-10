import create from 'zustand'
import { persist } from 'zustand/middleware'
import { IProduct } from '../lib/types/productType'

interface BearStore {
    items: IProduct[]
    loggedIn: boolean
    countries: CountryType[]
    setCountries: (countries: CountryType[]) => void
    logIn: () => void
    logOut: () => void
    setItems: (array: IProduct[]) => void
}
export interface CountryType {
    CountryId: number
    CountryNameEn: string
    CountryNameRu: string
    CountryNameGe: string
}
export interface CityType {
    CityId: number
    CityNameGe: string
    CityNameEn: string
    CityNameRu: string
}

export const useBearStore = create(
    persist<BearStore>(
        (set) => ({
            items: [],
            countries: [
                {
                    CountryId: 63.0,
                    CountryNameGe: 'საქართველო',
                    CountryNameEn: 'Loading...',
                    CountryNameRu: 'Грузия',
                },
            ],
            loggedIn: false,
            setCountries: (countries) => set({ countries }),
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
