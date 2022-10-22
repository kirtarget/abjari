import { ReactNode, useEffect } from "react"
import { useBearStore } from "../../store/store"
import { trpc } from "../../utils/trpc"
import CatalogItem from "../../components/catalog/CatalogItem"
import { Skeleton } from "@mui/material"


const Catalog = () => {
  let { data, isLoading } = trpc.items.useQuery({ id: "all" })


  const setItems = useBearStore((state) => state.setItems)

  useEffect(() => {
    setItems(data?.items || [])
  }, [data])

  return (
    <div className="justify-center items-center mx-auto flex gap-2  flex-wrap w-[90%]">
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
      ) : (<div className="flex gap-8 flex-wrap w-full">

        <Skeleton variant="rounded" width={"100%"} height={"40vh"} />
        <Skeleton variant="rounded" width={"100%"} height={"40vh"} />
        <Skeleton variant="rounded" width={"100%"} height={"40vh"} />
      </div>
      )}
    </div>
  )
}

export default Catalog
