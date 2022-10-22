import { useCartStore } from "../store/cartStore"
import { useHasMounted } from "../Hooks/hasMounted"
import { CartItem } from "../components/cart/CartItem"
import shallow from 'zustand/shallow';
import { trpc } from '../utils/trpc';
import { useRouter } from 'next/router'
import { OrderItem } from "../lib/types/apiTypes";
import { useEffect } from 'react';
import { Button, Typography } from "@mui/material";
import Link from "next/link";


const Cart = () => {

  const { cart, getCartItem, getFullSum } = useCartStore(state => ({ cart: state.cart, getCartItem: state.getCartItem, getFullSum: state.getFullSum }), shallow)

  const hasMounted = useHasMounted()
  const router = useRouter()
  const mutation = trpc.pay.useMutation()



  useEffect(() => {


    const data = mutation.data
    if (data === undefined) return

    console.log(data)
    window.location.href = data

  }, [mutation])


  const orderHandler = async () => {
    await mutation.mutateAsync({
      data: {
        amount: getFullSum(),
        currency: 'GEL',
        lang: "EN",
        info: {
          name: 'Order from Abjari',
          description: "Sport's wear",
          image: 'https://payze.io/assets/images/logo_v2.svg'
        }
      }
    })


  }

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
        <Typography sx={{
          mt: 6
        }} variant='h6'>The cart is empty</Typography>
      )}

      <div className="flex justify-between py-8 mx-4 text-lg">
        <p>Total:</p>
        <p className="">{hasMounted && getFullSum()}₾</p>
      </div>
      <Button variant="outlined" fullWidth={true} onClick={orderHandler} disabled={hasMounted && cart.length === 0} >Order</Button>
      <Link href="/catalog"><a>
        <Button variant="outlined" fullWidth={true} color="secondary" >Go to catalog</Button>
      </a></Link>

    </div>
  )
}

export default Cart
