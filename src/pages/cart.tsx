import Layout from "../components/UI/Layout"
import { useCartStore } from "../store/cartStore"
import { Item } from "../lib/types/apiTypes"
import { useHasMounted } from "../Hooks/hasMounted"

const CartItem = ({
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

const Cart = () => {
  const state = useCartStore()
  const hasMounted = useHasMounted()

  return (
    <div className="flex flex-col gap-2 mt-2 mb-2 h-fit">
      {hasMounted && state.cart.length !== 0 ? (
        state.cart.map((item) => {
          const product = state.getCartItem(item.id)

          return (
            <CartItem
              key={product.id}
              name={product.name}
              id={product.id}
              description={product.description}
              price={product.price}
              mainImage={product.mainImage}
              images={product.images}
            />
          )
        })
      ) : (
        <p>The cart is empty</p>
      )}

      <div className="flex justify-between pt-2">
        <p>Total:</p>
        <p>{hasMounted && state.getFullSum()}₾</p>
      </div>
    </div>
  )
}

export default Cart
