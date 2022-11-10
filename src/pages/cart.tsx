import { useCartStore } from '../store/cartStore'
import { useHasMounted } from '../Hooks/hasMounted'
import { CartItem } from '../components/cart/CartItem'
import shallow from 'zustand/shallow'
import { trpc } from '../utils/trpc'
import { useEffect, useState } from 'react'
import { Button, Container, Typography } from '@mui/material'
import Link from 'next/link'
import { NextPage } from 'next'
import { sanClient } from '../lib/sanityClient'
import { IProduct } from '../lib/types/productType'
import { CountryType, useBearStore } from '../store/store'
import CheckoutForm from '../components/Forms/CheckoutForm'
import axios from 'axios'

const Cart: NextPage<{ products: IProduct[]; countries: CountryType[] }> = ({
    products,
    countries,
}) => {
    const { cart, getCartItem, getFullSum } = useCartStore(
        (state) => ({
            cart: state.cart,
            getCartItem: state.getCartItem,
            getFullSum: state.getFullSum,
        }),
        shallow
    )
    const setCountries = useBearStore((state) => state.setCountries)
    const [formIsVisible, setFormIsVisible] = useState<boolean>(false)
    const setItems = useBearStore((state) => state.setItems)

    setCountries(countries)

    const hasMounted = useHasMounted()
    if (products && hasMounted) setItems(products)

    const mutation = trpc.pay.useMutation()
    useEffect(() => {
        const data = mutation.data
        if (data === undefined) return

        console.log(data)
        window.location.href = data
    }, [mutation])

    return (
        <Container className="cart-page flex flex-col gap-2 mt-2 mb-2 h-fit">
            <CheckoutForm
                onCloseForm={() => setFormIsVisible(!formIsVisible)}
                isVisible={formIsVisible}
                products={products}
                countries={countries}
            />

            {hasMounted && products ? (
                products?.map((item) => {
                    const cartItem = getCartItem(item._id)
                    const product = products.find(
                        (product) => product._id === cartItem?._id
                    )

                    if (!product) return null

                    return (
                        <CartItem
                            key={product._id}
                            name={product?.name}
                            details={product?.details}
                            _id={product?._id}
                            pricegel={product?.pricegel}
                            image={product?.image}
                            shortDescription={product?.shortDescription}
                            slug={product?.slug}
                            description={[]}
                        />
                    )
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
                onClick={() => setFormIsVisible(!formIsVisible)}
                disabled={hasMounted && cart.length === 0}
            >
                Order
            </Button>
            <Link href="/catalog">
                <a>
                    <Button
                        variant="outlined"
                        fullWidth={true}
                        color="secondary"
                    >
                        Go to catalog
                    </Button>
                </a>
            </Link>
        </Container>
    )
}

export const getServerSideProps = async () => {
    const products = await sanClient.fetch(`*[_type == "product"]`)
    let countries

    const fetchCountries = async () => {
        const data = JSON.stringify({})

        const config = {
            method: 'get',
            url: 'https://istore.gpost.ge/api/countries',
            headers: {
                Authorization: process.env.NEXT_PUBLIC_GEORGIAN_POST_AUTH,
                'Content-Type': 'application/json',
            },
            data: data,
        }

        const countriesData = await axios(config)
        countries = countriesData.data.Countries
    }
    await fetchCountries()

    return {
        props: { products, countries },
    }
}

export default Cart
