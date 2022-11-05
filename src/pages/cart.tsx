import { useCartStore } from "../store/cartStore";
import { useHasMounted } from "../Hooks/hasMounted";
import { CartItem } from "../components/cart/CartItem";
import shallow from "zustand/shallow";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import { OrderItem } from "../lib/types/apiTypes";
import { useEffect } from "react";
import { Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import { NextPage } from "next";
import { sanClient } from "../lib/sanityClient";
import { IProduct } from "../lib/types/productType";
import { useBearStore } from "../store/store";

const Cart: NextPage<{ products: IProduct[] }> = ({ products }) => {
  const { cart, getCartItem, getFullSum } = useCartStore(
    (state) => ({
      cart: state.cart,
      getCartItem: state.getCartItem,
      getFullSum: state.getFullSum,
    }),
    shallow
  );

  const setItems = useBearStore((state) => state.setItems);

  const hasMounted = useHasMounted();
  const router = useRouter();
  const mutation = trpc.pay.useMutation();

  useEffect(() => {
    const data = mutation.data;
    if (data === undefined) return;

    console.log(data);
    window.location.href = data;
  }, [mutation]);

  if (products && hasMounted) setItems(products);

  const orderHandler = async () => {
    await mutation.mutateAsync({
      data: {
        amount: getFullSum(),
        currency: "GEL",
        lang: "EN",
        info: {
          name: "Order from Abjari",
          description: "Sport's wear",
          image: "https://payze.io/assets/images/logo_v2.svg",
        },
      },
    });
  };

  return (
    <Container className="cart-page flex flex-col gap-2 mt-2 mb-2 h-fit">
      {hasMounted && products ? (
        products?.map((item) => {
          const cartItem = getCartItem(item._id);
          const product = products.find(
            (product) => product._id === cartItem?._id
          );
          console.log("product", product);

          if (!product) return null;

          return (
            <CartItem
              key={product._id}
              name={product?.name}
              _id={product?._id}
              pricegel={product?.pricegel}
              image={product?.image}
              shortDescription={product?.shortDescription}
              slug={product?.slug}
              description={[]}
            />
          );
        })
      ) : (
        <Typography
          sx={{
            mt: 6,
          }}
          variant="h6"
        >
          The cart is empty
        </Typography>
      )}

      <div className="cart__total ">
        <p>Total:</p>
        <p className="">{hasMounted && getFullSum()}₾</p>
      </div>
      <Button
        variant="outlined"
        fullWidth={true}
        onClick={orderHandler}
        disabled={hasMounted && cart.length === 0}
      >
        Order
      </Button>
      <Link href="/catalog">
        <a>
          <Button variant="outlined" fullWidth={true} color="secondary">
            Go to catalog
          </Button>
        </a>
      </Link>
    </Container>
  );
};

export const getServerSideProps = async () => {
  const products = await sanClient.fetch(`*[_type == "product"]`);

  return {
    props: { products },
  };
};

export default Cart;
