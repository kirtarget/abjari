import { useEffect, useState } from "react"
import { Navigation, Pagination, Lazy, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useCartStore } from "../../store/cartStore"

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from "next/link";
import { Button, Box, Grid } from "@mui/material";


interface CatalogItemProps {
  id: string
  mainImage: string
  name: string
  price: number
  images: string[]
  description: string
}

const CatalogItem = ({
  id,
  mainImage,
  name,
  price,
  images,
  description,
}: CatalogItemProps): JSX.Element => {

  const [addedToCart, setAddedToCart] = useState<boolean | null>(null)
  const [quantity, setQuantity] = useState<number | null>(null)
  const increaseItemQuantity = useCartStore(state => state.increaseItemQuantity)
  const getItemQuantity = useCartStore(state => state.getItemQuantity)


  useEffect(() => {
    setQuantity(getItemQuantity(+id))
  }, [])


  const addToCartHandler = () => {
    setAddedToCart(true)
    increaseItemQuantity(+id)
    setQuantity(getItemQuantity(+id))
  }


  return (
    <Grid container sx={{
      width: '100%',
      overflow: 'hidden',
      my: 1,
      boxShadow: 2,
      borderRadius: '1rem',
      display: 'flex',
      justifyContent: 'center'

    }}  >

      {/* <div className="relative mx-auto w-[80%] md:w-[30%] mr-8 overflow-hidden h-full"> */}
      <Grid item xs={10} md={4}>
        <Swiper
          style={{
            "--swiper-navigation-color": "#ffffff40",
            "--swiper-pagination-color": "#fff",
          } as any}
          modules={[Navigation, Lazy]}
          spaceBetween={10}
          lazy={true}
          slidesPerView={1}
          loop={true}
          centeredSlides={true}
          navigation={true}
        >
          {images.map(image => (<SwiperSlide key={Math.random()} className="h-full"><img

            className=" object-fill h-[110%]"
            src={image}
            alt=""
          /></SwiperSlide>))}
        </Swiper>
      </Grid>
      {/* </div> */}

      <Grid item xs={12} md={8} sx={{
        width: '100%',
        px: '0.5rem',
        display: 'flex',
        flexDirection: 'column'

      }} >
        <div className="font-bold text-md pt-5 ">{name}</div>
        <div className="font-bold text-md pt-5 ">{price}₾</div>
        <div className="text-sm pt-5 ">{description}</div>

        <Button sx={{
          mt: 2,

          borderRadius: 6,
          mx: 'auto'
        }} onClick={addToCartHandler} fullWidth={true} variant="outlined">Add to Cart</Button>


        <Link href={"/cart"}>
          <a>
            <Button sx={{
              mt: 2,
              mb: 2,
              borderRadius: 6,
              mx: 'auto'
            }} fullWidth={true} variant="outlined" className={`${addedToCart ? '' : 'hidden'}`}>Make an order </Button>

          </a>
        </Link>

      </Grid>

    </Grid >
  )
}

export default CatalogItem
