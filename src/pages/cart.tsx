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

      <div className="flex justify-between py-8 mx-4 text-lg">
        <p>Total:</p>
        <p className="">{hasMounted && getFullSum()}₾</p>
      </div>
      <button type="button" className="text-white mx-auto w-[80%] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Order</button>
    </div>
  )
}

export default Cart
