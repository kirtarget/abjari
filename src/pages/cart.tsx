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
    <div className="border-2 rounded-md w-full grid grid-cols-5 items-center justify-between">
      <img className="h-24" src={mainImage} alt="" />
      <p className="px-2">{name}</p>
      <p className="font-bold">
        {price}, {state.getUniqSum(id)}
      </p>
      <p className="font-bold text-slate-700">x{state.getItemQuantity(id)}</p>
      <div className="flex flex-col gap-2">
        <button
          className="bg-red-400 w-24 rounded-md"
          onClick={() => state.removeFromCart(id)}
        >
          Remove
        </button>
        <button
          className="bg-green-400 w-24 rounded-md"
          onClick={() => state.increaseItemQuantity(id)}
        >
          Add
        </button>
        <button
          className="bg-blue-400 w-24 rounded-md"
          onClick={() => state.decreaseItemQuantity(id)}
        >
          Decrease
        </button>
      </div>
    </div>
  )
}

const cart = () => {
  const state = useCartStore()
  const hasMounted = useHasMounted()

  return (
    <Layout>
      <div className="flex flex-col gap-2">
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

        {hasMounted && state.getFullSum()}
      </div>
    </Layout>
  )
}

export default cart
