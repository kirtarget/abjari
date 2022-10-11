import React from "react"
import { trpc } from "../../utils/trpc"
import { Item } from "../../lib/types/apiTypes"
import Image from "next/image"

export default function ItemsLoader(): JSX.Element {
  const data = trpc.items.useQuery({ text: "client" })
  if (!data.data) {
    return <div>Loading...</div>
  }
  let { items } = data.data

  return (
    <>
      {items.map((item: Item) => {
        if (!item.mainImage.startsWith("http")) {
          item.mainImage = "https://trpc.io/img/logo.svg"
        }
        return (
          <div key={item.id}>
            <Image
              src={item.mainImage}
              height={"100px"}
              width={"100px"}
            ></Image>
            <p>{item.name}</p>
            <p>{item.price}$</p>
            <p>{item.description}</p>
          </div>
        )
      })}
    </>
  )
}
