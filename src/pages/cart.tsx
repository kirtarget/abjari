import Layout from "../components/UI/Layout"
import { useCartStore } from "../store/cartStore"
import { Item } from "../lib/types/apiTypes"
import { useHasMounted } from "../Hooks/hasMounted"
import { CartItem } from "../components/cart/CartItem"

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

      <div className="flex justify-between pt-2 mx-4">
        <p>Total:</p>
        <p className="">{hasMounted && state.getFullSum()}₾</p>
      </div>
    </div>
  )
}

export default Cart
