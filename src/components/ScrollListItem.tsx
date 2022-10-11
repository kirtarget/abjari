import Link from "next/link"
import { IScrollItemProps } from "../lib/types/MainPage"
import Button from "./UI/Button"

const ScrollListItem = ({
  title,
  img,
  description,
  price,
}: IScrollItemProps) => {
  return (
    <>
      <div className="m-6 lg:px-10 ">
        <div className="w-60 h-96  shadow-2xl hover:scale-105 transition duration-1000 my-2 rounded-2xl">
          <img src={img} className="rounded-2xl w-auto h-full" />
        </div>
        <h1 className="font-bold capitalize">{title}</h1>
        <h1 className="font-regular capitalize">${price}</h1>
        <Link href="/catalog">
          <a>
            <Button>Shop Now</Button>
          </a>
        </Link>
      </div>
    </>
  )
}

export default ScrollListItem
