import { useCartStore } from "../store/cartStore"
import { useHasMounted } from "../Hooks/hasMounted"
import { CartItem } from "../components/cart/CartItem"
import shallow from 'zustand/shallow';


const Cart = () => {

  const { cart, getCartItem, getFullSum } = useCartStore(state => ({ cart: state.cart, getCartItem: state.getCartItem, getFullSum: state.getFullSum }), shallow)
  // const getCartItem = useCartStore(state => state.getCartItem)
  // const getFullSum = useCartStore(state => state.getFullSum)
  const hasMounted = useHasMounted()

  return (
    <div className="flex flex-col gap-2 mt-2 mb-2 h-fit">
      {hasMounted && cart.length !== 0 ? (
        cart.map((item) => {
          const product = getCartItem(item.id)

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
        <p className="">{hasMounted && getFullSum()}₾</p>
      </div>
    </div>
  )
}

export default Cart
