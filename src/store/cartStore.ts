import create from "zustand"
import { persist } from "zustand/middleware"
import { Item } from "../lib/types/apiTypes"
import { useBearStore } from "./store"

interface Storage {
  getItem: (name: string) => string | null | Promise<string | null>
  setItem: (name: string, value: string) => void | Promise<void>
  removeItem: (name: string) => void | Promise<void>
}

const dummyStorageApi: Storage = {
  getItem: (name: string) => null,
  setItem: (name: string, value: string) => {},
  removeItem: (name: string) => {},
}

interface CartStore {
  cart: CartItem[]
  cartCount: number
  getFullSum: () => number
  getUniqSum: (id: number) => number
  getCartItem: (id: number) => Item
  getItemQuantity: (id: number) => number
  increaseItemQuantity: (id: number) => void
  decreaseItemQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  getItemsCount: () => void
}

type CartItem = {
  id: number
  quantity: number
}

function getCartItem(items: Item[], id: number): Item {
  return items.find((item) => item.id === id)!
}

function removeFromCart(cart: CartItem[], id: number) {
  return cart.filter((item) => item.id !== id)
}

function getItemQuantity(cart: CartItem[], id: number) {
  return cart.find((item) => item.id === id)?.quantity || 0
}

const increaseItemQuantity = (cart: CartItem[], id: number): CartItem[] => {
  if (!cart.find((item) => item.id === id)) {
    return [...cart, { id, quantity: 1 }]
  } else {
    return cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 }
      } else {
        return item
      }
    })
  }
}
const decreaseItemQuantity = (cart: CartItem[], id: number): CartItem[] => {
  if (cart.find((item) => item.id === id)?.quantity === 1) {
    return cart.filter((item) => item.id !== id)
  } else {
    return cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity - 1 }
      } else {
        return item
      }
    })
  }
}

 const getItemsCount = (cart: CartItem[]):number => {
  return cart.reduce((acc:number, cur:CartItem) => cur.quantity + acc, 0)

}

export const useCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      cart: [],
      cartCount: 0,
      getFullSum: () =>
        get().cart.reduce((cur, prev) => {
          return cur + get().getCartItem(prev.id).price * prev.quantity
        }, 0),
      getUniqSum: (id) =>
        get().cart.reduce((cur, prev) => {
          if (prev.id === id) {
            return cur + get().getCartItem(prev.id).price * prev.quantity
          } else {
            return cur
          }
        }, 0),
      getCartItem: (id: number) => {
        const items = useBearStore.getState().items
        return getCartItem(items, id)
      },

      getItemQuantity: (id) =>
        get().cart.find((item) => item.id === id)?.quantity || 0,

      increaseItemQuantity: (id) =>
        set((state) => ({
          ...state,
          cart: increaseItemQuantity(state.cart, id),
          cartCount:state.cartCount + 1

        })),
      decreaseItemQuantity: (id) =>
        set((state) => ({
          ...state,
          cart: decreaseItemQuantity(state.cart, id),
          cartCount: state.cartCount -1

        })),

      removeFromCart: (id: number) =>
        set((state) => {
          const item = state.cart.find(item => id === item.id)
          
          return {
          ...state,
          cart: removeFromCart(state.cart, id),
          cartCount: state.cartCount - item?.quantity!

        }}),
      getItemsCount: () => set(state => ({
        ...state,
        cartCount: getItemsCount(state.cart)
      }))
       

    }),
    {
      name: "cartstorage",
    }
  )
)
