export interface IProduct {
    _createdAt?: string
    _id: string
    _rev?: string
    _type?: string
    _updatedAt?: string
    details?: { _key: string; size: string; weight: string }[]
    image: Image[]
    name: string
    description: { _type: string }[]
    shortDescription: { _type: string }[]
    pricegel: number
    priceusd?: number
    priceeur?: number
    slug: Slug
}

interface Image {
    _key: string
    _type: string
    asset: Asset
}

interface Asset {
    _ref: string
    _type: string
}

interface Slug {
    _type: string
    current: string
}
