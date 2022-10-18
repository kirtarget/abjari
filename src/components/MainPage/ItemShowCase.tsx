import { IBigCardProps } from "../../lib/types/MainPage"

import MainCardCTA from "./MainCardCTA"

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
    <div className="flex items-center justify-center ">
      <div className="big-card-layout ">
        <div
          className={`rounded-3xl  transition duration-1000 flex  items-end hover:scale-[101%] h-screen md:h-full mb-1 md:row-span-2`}
          style={{
            backgroundImage: `url(${items[0].img})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <MainCardCTA
            title={items[0].title}
            description={items[0].description}
            id={1}
          />
        </div>
        <div
          className={`rounded-3xl  transition duration-1000 flex  items-end hover:scale-[101%] h-screen md:h-full mb-1 `}
          style={{
            backgroundImage: `url(${items[1].img})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <MainCardCTA
            title={items[1].title}
            description={items[1].description}
            id={1}
          />
        </div>
        <div
          className={
            "rounded-3xl row-span-1 transition duration-1000 flex  items-end hover:scale-[101%] h-screen md:h-full mb-1"
          }
          style={{
            backgroundImage: `url(${items[2].img})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <MainCardCTA
            title={items[2].title}
            description={items[2].description}
            id={1}
          />
        </div>
      </div>
    </div>
  )
}

export default ItemShowCase
