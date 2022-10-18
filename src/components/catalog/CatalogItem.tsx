import { useEffect, ReactNode } from "react"
import { useBearStore } from "../../store/store"
import { Item } from "../../lib/types/apiTypes"
import { useCartStore } from "../../store/cartStore"

interface CatalogItemProps {
  id: string
  mainImage: string
  name: string
  price: number
  images: string[]
  description: string
}

const CatalogItem = ({
  id,
  mainImage,
  name,
  price,
  images,
  description,
}: CatalogItemProps): JSX.Element => {
  const product = {
    id,
    mainImage,
    name,
    price,
    images,
    description,
  }

  const state = useCartStore()

  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cart))
  // }, [cartItemsCount])

  return (
    <div className="flex  w-[300px] bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <img
        className="rounded-t-lg aspect-square overflow-clip w-full object-cover"
        src={mainImage}
        alt=""
      />

      <div className="p-5">
        <p className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
          {name}
        </p>

        {/* <h5 className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </h5> */}
        <button
          onClick={() => state.increaseItemQuantity(+product.id)}
          className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add to cart
          <img width={"20px"} src="/shopping-cart-30.png" />
        </button>
      </div>
    </div>
  )
}

export default CatalogItem
