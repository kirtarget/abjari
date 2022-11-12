import { useEffect, useState } from 'react'
import { Navigation, Lazy } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useCartStore } from '../../store/cartStore'
import { urlFor } from '../../lib/sanityClient'
import { PortableText } from '@portabletext/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Link from 'next/link'
import { Button, Box, Grid, Typography } from '@mui/material'
import { useHasMounted } from '../../Hooks/hasMounted'
import Image from 'next/image'

interface CatalogItemProps {
    id: string
    name: string
    pricegel: number
    images: {
        _key: string
        _type: string
        asset: {
            _ref: string
            _type: string
        }
    }[]
    description: { _type: string }[]
    shortDescription?: { _type: string }[]
    slug?: string
}

const CatalogItem = ({
    id,
    name,
    pricegel,
    images,
    slug,

    shortDescription,
}: CatalogItemProps): JSX.Element => {
    const [addedToCart, setAddedToCart] = useState<boolean | null>(null)
    const [quantity, setQuantity] = useState<number | null>(null)
    const increaseItemQuantity = useCartStore(
        (state) => state.increaseItemQuantity
    )
    const getItemQuantity = useCartStore((state) => state.getItemQuantity)
    const hasMounted = useHasMounted()

    useEffect(() => {
        setQuantity(getItemQuantity(id))
    }, [])

    const addToCartHandler = () => {
        setAddedToCart(true)
        increaseItemQuantity(id)
        setQuantity(getItemQuantity(id))
    }

    ///////////////////////////

    return (
        <Grid
            container
            sx={{
                width: '100%',
                overflow: 'hidden',
                my: 1,
                boxShadow: 2,
                // maxHeight: "22rem",
                borderRadius: '1rem',
                display: 'flex',
            }}
        >
            <Grid item xs={12} md={4}>
                <Swiper
                    style={
                        {
                            '--swiper-navigation-color': '#ffffff90',
                            '--swiper-pagination-color': '#fff',
                        } as object
                    }
                    className="swiper"
                    modules={[Navigation, Lazy]}
                    lazy={true}
                    slidesPerView={1}
                    loop={true}
                    centeredSlides={true}
                    navigation={true}
                >
                    {images.map((image) => (
                        <SwiperSlide key={Math.random()}>
                            <Image
                                className="swiper__image"
                                src={urlFor(image).url()}
                                alt=""
                                width={6144}
                                height={8192}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Grid>
            {/* </div> */}

            <Grid
                item
                xs={12}
                md={8}
                sx={{
                    width: '100%',
                    px: 1.5,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <Box>
                    <Typography
                        variant="h5"
                        paddingTop={2.5}
                        fontWeight="bold"
                        component="h1"
                    >
                        {name}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold" paddingTop={2.5}>
                        {pricegel}₾
                    </Typography>

                    {hasMounted && (
                        <PortableText
                            value={shortDescription ?? [{ _type: '' }]}
                        />
                    )}
                </Box>
                <Box>
                    <Button
                        sx={{
                            borderRadius: '1rem',
                            mb: 2,
                            mx: 'auto',
                        }}
                        onClick={addToCartHandler}
                        fullWidth={true}
                        variant="contained"
                    >
                        Add to Cart
                    </Button>
                    <Link href={`/product/${slug}`}>
                        <Button
                            sx={{
                                borderRadius: '1rem',
                                mb: 2,
                                mx: 'auto',
                            }}
                            fullWidth={true}
                            variant="outlined"
                        >
                            More info
                        </Button>
                    </Link>
                    <Link href={'/cart'}>
                        <Button
                            sx={{
                                mb: 2,
                                borderRadius: '1rem',
                                mx: 'auto',
                            }}
                            fullWidth={true}
                            variant="outlined"
                            className={`${addedToCart ? '' : 'hidden'}`}
                        >
                            Make an order
                        </Button>
                    </Link>
                </Box>
            </Grid>
        </Grid>
    )
}

export default CatalogItem
