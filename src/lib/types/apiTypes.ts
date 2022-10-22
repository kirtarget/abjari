export interface Item {
  id?: any
  name: string
  price: number
  mainImage: string
  images: string[]
  description: string
}

export interface OrderItem {
  data: {
    amount: string
    currency: string
    lang: string
    info: {
      description: string
      image: string
      name: string
    }
  }
}
