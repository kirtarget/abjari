import create from 'zustand'
import { persist } from 'zustand/middleware'
import { IProduct } from '../lib/types/productType'
import { useBearStore } from './store'

interface CartStore {
    cart: CartItem[]
    cartCount: number
    setItemSize: (id: string, size: string) => void

    getFullSum: () => number
    getUniqSum: (_id: string) => number
    getCartItem: (_id: string) => CartItem | undefined
    getItemQuantity: (_id: string) => number
    increaseItemQuantity: (_id: string) => void
    decreaseItemQuantity: (_id: string) => void
    removeFromCart: (_id: string) => void
    getItemsCount: () => void
}

export type CartItem = {
    _id: string
    quantity: number
    size: string
}

function getCartItem(items: IProduct[], _id: string): IProduct {
    return items.find((item) => item._id === _id)!
}

function removeFromCart(cart: CartItem[], _id: string) {
    return cart.filter((item) => item._id !== _id)
}

function changeItemSize(cart: CartItem[], _id: string, size: string) {
    return cart.map((item: CartItem) => {
        if (item._id === _id) {
            return { ...item, size }
        } else {
            return item
        }
    })
}

const increaseItemQuantity = (cart: CartItem[], _id: string): CartItem[] => {
    if (!cart.find((item) => item._id === _id)) {
        return [...cart, { _id, quantity: 1, size: 'M' }]
    } else {
        return cart.map((item) => {
            if (item._id === _id) {
                return { ...item, quantity: item.quantity + 1 }
            } else {
                return item
            }
        })
    }
}

const decreaseItemQuantity = (cart: CartItem[], _id: string): CartItem[] => {
    if (cart.find((item) => item._id === _id)?.quantity === 1) {
        return cart.filter((item) => item._id !== _id)
    } else {
        return cart.map((item) => {
            if (item._id === _id) {
                return { ...item, quantity: item.quantity - 1 }
            } else {
                return item
            }
        })
    }
}

const getItemsCount = (cart: CartItem[]): number => {
    return cart.reduce((acc: number, cur: CartItem) => cur.quantity + acc, 0)
}

export const useCartStore = create(
    persist<CartStore>(
        (set, get) => ({
            cart: [],
            cartCount: 0,
            setItemSize: (id: string, size: string) =>
                set((state) => ({
                    cart: changeItemSize(state.cart, id, size),
                })),
            getFullSum: () =>
                get().cart.reduce((acc, i) => {
                    const item = getCartItem(
                        useBearStore.getState().items,
                        i._id
                    )
                    return acc + item.pricegel * i.quantity
                }, 0),
            getUniqSum: (_id) =>
                get().cart.reduce((cur, prev) => {
                    if (prev._id === _id) {
                        const item = useBearStore
                            .getState()
                            .items.find((i) => i._id === _id)
                        const cartItem = get().cart.find((i) => i._id === _id)
                        return cur + item!.pricegel * cartItem!.quantity
                    } else {
                        return cur
                    }
                }, 0),
            getCartItem: (_id: string) =>
                get().cart.find((item) => item._id === _id),

            getItemQuantity: (_id) =>
                get().cart.find((item) => item._id === _id)?.quantity || 0,

            increaseItemQuantity: (_id) =>
                set((state) => ({
                    ...state,
                    cart: increaseItemQuantity(state.cart, _id),
                    cartCount: state.cartCount + 1,
                })),
            decreaseItemQuantity: (_id) =>
                set((state) => ({
                    ...state,
                    cart: decreaseItemQuantity(state.cart, _id),
                    cartCount: state.cartCount - 1,
                })),

            removeFromCart: (_id: string) =>
                set((state) => {
                    const item = state.cart.find((item) => _id === item._id)

                    return {
                        ...state,
                        cart: removeFromCart(state.cart, _id),
                        cartCount: state.cartCount - item?.quantity!,
                    }
                }),
            getItemsCount: () =>
                set((state) => ({
                    ...state,
                    cartCount: getItemsCount(state.cart),
                })),
        }),

        {
            name: 'cartstorage',
        }
    )
)
