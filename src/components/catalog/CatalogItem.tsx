import { useEffect, useState } from "react"
import { Navigation, Pagination, Lazy, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useCartStore } from "../../store/cartStore"

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from "next/link";


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
    <div className="w-full overflow-hidden rounded-lg flex flex-col md:flex-row py-1 my-1 shadow-md" >

      <div className="relative mx-auto w-[80%] md:w-[30%] mr-8 overflow-hidden h-full">
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

      </div>

      <div className="w-full px-2 flex flex-col">
        <div className="font-bold text-md pt-5 ">{name}</div>
        <div className="font-bold text-md pt-5 ">{price}</div>
        <div className="text-sm pt-5 ">{description}</div>

        <button onClick={addToCartHandler} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mt-6">Add to Cart</button>

        {addedToCart && <Link href={"/cart"}>
          <a>
            <button onClick={() => console.log('Order placed:', name)} type="button" className={`${addedToCart ? 'hidden' : 'hidden'}text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mt-6`}>Make an order {quantity}</button>
          </a>
        </Link>}

      </div>

    </div >
  )
}

export default CatalogItem
