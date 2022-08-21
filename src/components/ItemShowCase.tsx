import MainCardCTA from "./MainCardCTA"
import { IBigCardProps } from "../lib/types/MainPage"
import BigCard from "./BigCard"

const ItemShowCase = () => {
  const items: IBigCardProps[] = [
    {
      id: 1,
      img: "/IMG_0259.jpeg",
      title: "BEYOND THE LIMITS",
      description:
        "a unique product that empowers athletes with the courage and confidence",
    },
    {
      id: 2,
      img: "/IMG_0257.jpeg",
      title: "FOR TRUE WARRIORS",
      description: "Abjari gear is an armor of our time",
    },
    {
      id: 3,
      img: "/IMG_0215.jpg",
      title: "THE CHOICE OF CHAMPIONS",
      description:
        "Abjari is a brand that wears a Judo champion of Europe - Luka Maisuradze",
    },
  ]
  return (
    <>
      <div className="big-card-layout ">
        {items.map((item) => (
          <BigCard
            key={item.id}
            id={item.id}
            img={item.img}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </>
  )
}

export default ItemShowCase
