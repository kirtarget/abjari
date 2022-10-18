import { ReactNode, useEffect, useState } from "react"
import Layout from "../../components/UI/Layout"
import { useBearStore } from "../../store/store"
import { trpc } from "../../utils/trpc"
import CatalogItem from "../../components/catalog/CatalogItem"
import { useCartStore } from "../../store/cartStore"

const Catalog = () => {
  let { data, isLoading } = trpc.items.useQuery({ id: "all" })

  const state = useBearStore((state) => state.items)
  const setItems = useBearStore((state) => state.setItems)

  useEffect(() => {
    setItems(data?.items || [])
  }, [data])

  return (
    <Layout>
      <div className="justify-center flex gap-2 mx-4 flex-wrap w-[90%]">
        {!isLoading ? (
          data?.items.map(
            (item): ReactNode => (
              <CatalogItem
                key={item.id}
                id={item.id}
                mainImage={item.mainImage}
                name={item.name}
                price={item.price}
                images={item.images}
                description={item.description}
              />
            )
          )
        ) : (
          <div role="status" className="max-w-ld animate-pulse">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[860px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[830px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[800px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[860px]"></div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Catalog
