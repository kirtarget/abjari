import { Item } from "../../lib/types/apiTypes"
import { useCartStore } from "../../store/cartStore"

export const CartItem = ({
  name,
  id,
  description,
  mainImage,
  images,
  price,
}: Item) => {
  const state = useCartStore()
  return (
    <div className="border-2 rounded-md w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 grid-rows-2  md:grid-rows-1 items-center  px-2">
      <img className="h-24" src={mainImage} alt="" />
      <p className="px-2">{name}</p>
      <p className="md:text-center sm:text-right">{price}₾</p>
      <p className="font-bold text-slate-700">
        <button className="px-2" onClick={() => state.decreaseItemQuantity(id)}>
          -
        </button>
        {state.getItemQuantity(id)}
        <button className="px-2" onClick={() => state.increaseItemQuantity(id)}>
          +
        </button>
      </p>
      <div className="flex font-bold flex-col gap-2 items-end justify-center sm:col-span-1  py-3 col-span-2 md:px-1">
        {state.getUniqSum(id)}₾
      </div>
    </div>
  )
}