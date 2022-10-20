import { ReactNode, useEffect } from "react"
import { useBearStore } from "../../store/store"
import { trpc } from "../../utils/trpc"
import CatalogItem from "../../components/catalog/CatalogItem"


const Catalog = () => {
  let { data, isLoading } = trpc.items.useQuery({ id: "all" })


  const setItems = useBearStore((state) => state.setItems)

  useEffect(() => {
    setItems(data?.items || [])
  }, [data])

  return (
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
  )
}

export default Catalog
