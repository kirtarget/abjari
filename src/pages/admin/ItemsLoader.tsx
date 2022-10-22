import React, { useEffect, useState } from "react"
import { trpc } from "../../utils/trpc"
import { Item } from "../../lib/types/apiTypes"
import { useBearStore } from "../../store/store"
import { useHasMounted } from "../../Hooks/hasMounted"
import { Typography } from "@mui/material"

export default function ItemsLoader(): JSX.Element {
  const [isEditing, setIsEditing] = useState<boolean | null>(null)

  const hasMounted = useHasMounted()

  const { data } = trpc.items.useQuery({ id: "all" })

  useEffect(() => {
    useBearStore.setState({ items: data?.items })
  }, [data])

  let items = useBearStore((state) => state.items)


  const mutation = trpc.editItem.useMutation()

  const onEditHandler = (e: React.PointerEvent) => {
    setIsEditing(true)
    // mutation.mutate({})
  }

  if (!data) {
    return <div>Loading...</div>
  }
  return (
    <div className="mx-auto">
      {hasMounted && items?.length > 0 ?
        items.map((item: Item) => {
          if (!item.mainImage.startsWith("http")) {
            item.mainImage = "https://trpc.io/img/logo.svg"
          }
          return (
            <div key={item.id} className="flex my-1 p-2">
              <a
                href="#"
                className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 w-full"
              >
                <img
                  className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                  src={item.mainImage}
                  alt=""
                />
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {item.name}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </a>
            </div>
          )
        }) : <Typography variant='h5'>Loading...</Typography>}
    </div>
  )
}
