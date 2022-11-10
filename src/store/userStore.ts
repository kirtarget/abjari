import create from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
    id: string
    name: string
    email: string
}

interface UserStore {
    id: string
    name: string
    email: string
    avatar: string
    size: string
    setSize: (size: string) => void
    setUser: (user: User) => void
    cart?: { id: number; quantity: number }[]
}

export const useUserStore = create(
    persist<UserStore>(
        (set) => ({
            id: '',
            name: '',
            email: '',
            avatar: '',
            size: '',
            setSize: (size: string) => set({ size }),
            setUser: (user: User) =>
                set((state) => ({
                    ...state,
                    ...user,
                })),
        }),

        {
            name: 'userstorage',
        }
    )
)
