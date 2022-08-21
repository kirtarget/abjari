import Image from "next/image"
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
      <div className="m-6">
        <div className="w-60 h-96 rounded-2xl border-stone-700 shadow-2xl hover:scale-105 transition duration-1000 my-2">
          <Image
            src={img}
            width="240px"
            height="384px"
            className="rounded-2xl"
          />
        </div>
        <h1 className="font-bold capitalize">{title}</h1>
        <h1 className="font-regular capitalize">${price}</h1>
        <Button>shop now</Button>
      </div>
    </>
  )
}

export default ScrollListItem
