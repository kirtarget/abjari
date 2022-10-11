import Footer from "../../components/UI/Footer"
import Header from "../../components/UI/Header"
import { ReactNode } from "react"
import Layout from "../../components/UI/Layout"

const catalog = () => {
  const items = [
    {
      id: 1,
      img: "/IMG_0259.jpeg",
      title: "BEYOND THE LIMITS",
      price: 22.14,
      description:
        "a unique product that empowers athletes with the courage and confidence",
    },
    {
      id: 2,
      img: "/IMG_0257.jpeg",
      title: "FOR TRUE WARRIORS",
      price: 22.14,
      description: "Abjari gear is an armor of our time",
    },
    {
      id: 3,
      img: "/IMG_0215.jpg",
      title: "THE CHOICE OF CHAMPIONS",
      price: 22.14,
      description:
        "Abjari is a brand that wears a Judo champion of Europe - Luka Maisuradze",
    },
  ]
  return (
    <div className=" flex flex-col justify-center align-middle ">
      <Layout>
        <div className="flex gap-3 mt-2">
          {items.map((item): ReactNode => {
            return (
              <div key={item.id} className="">
                <img src={item.img} className="w-full" />
                <h3>{item.title}</h3>
                <h3>{item.price}$</h3>
                <p>{item.description}</p>
              </div>
            )
          })}
        </div>
      </Layout>
    </div>
  )
}

export default catalog
