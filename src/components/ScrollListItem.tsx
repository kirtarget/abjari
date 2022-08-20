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
      <div>
        <div className="w-60 h-96 bg-blue-300 rounded-2xl border-1 border-stone-700 shadow-2xl overflow-hidden">
          <Image src={img} width="240px" height="384px" />
        </div>
        <h1 className="font-bold capitalize">{title}</h1>
        <h1 className="font-regular capitalize">${price}</h1>
        <Button>shop now</Button>
      </div>
    </>
  )
}

export default ScrollListItem
