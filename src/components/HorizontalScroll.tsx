import ScrollListItem from "./ScrollListItem"
import { IScrollItemProps } from "../lib/types/MainPage"

const HorizontalScroll = () => {
  // * ЗАМЕНИТЬ НА HTTP-Запрос
  const items: IScrollItemProps[] = [
    {
      id: 1,
      title: "Longsleeve rashguard",
      img: "/IMG_0215.jpg",
      description: "For every training",
      price: 114,
    },
    {
      id: 2,
      title: "shortsleeve rashguard",
      img: "/IMG_0259.jpeg",
      description: "For every training",
      price: 99,
    },
    {
      id: 3,
      title: "shorts",
      img: "/IMG_0257.jpeg",
      description: "For every training",
      price: 89,
    },
  ]
  return (
    <div className="px-4 pt-6  w-full lg:px-20">
      <h5 className=" font-medium">Strength and Durability</h5>
      <h1 className="font-black text-2xl pb-4">Armor for every warrior</h1>
      <div className="flex gap-6 overflow-scroll  no-scrollbar ">
        {items.map((item) => (
          <ScrollListItem
            key={item.id}
            id={item.id}
            title={item.title}
            img={item.img}
            description={item.description}
            price={item.price}
          />
        ))}
      </div>
    </div>
  )
}

export default HorizontalScroll
