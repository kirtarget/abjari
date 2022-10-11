import React, { useRef, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { trpc } from "../../utils/trpc"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
)

const AddItemForm = (): JSX.Element => {
  const [image, setImage] = useState<string>("")
  const nameRef = useRef<HTMLInputElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)
  const [isImageUploading, setIsImageUploading] = useState<boolean | null>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file
    setIsImageUploading(true)
    if (e.target.files) {
      file = e.target.files[0]
    }
    const { data, error } = await supabase.storage
      .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET!)
      .upload("public/" + file?.name, file as File)

    setImage(
      `${process.env
        .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${process.env
        .NEXT_PUBLIC_SUPABASE_BUCKET!}/public/${file?.name}`
    )

    if (data) {
      console.log(data)
      setIsImageUploading(false)
    } else if (error) {
      console.log(error)
      setIsImageUploading(false)
    }
  }

  const mutation = trpc.addItem.useMutation()

  const onAddItemHandler = () => {
    mutation.mutate({
      name: nameRef.current?.value!,
      description: descriptionRef.current?.value!,
      price: Number(priceRef.current?.value),
      mainImage: image,
      images: [""],
    })
  }

  return (
    <div className="  mx-4 md:mx-[20%] md:px-9 items-center">
      <form
        onSubmit={onAddItemHandler}
        className="flex flex-col p-2 gap-2 w-full border-2"
      >
        <label htmlFor="name">Загрузка фото</label>
        <input
          id="image"
          type="file"
          accept="image/"
          onChange={(e) => {
            handleUpload(e)
          }}
        />

        <label htmlFor="name">Название модели</label>
        <input id="name" type="text" ref={nameRef} />

        <label htmlFor="price">Цена</label>
        <input ref={priceRef} id="price" placeholder="price" />

        <label htmlFor="description">Описание</label>
        <input
          ref={descriptionRef}
          id="description"
          placeholder="description"
        />
        {!isImageUploading && (
          <button
            className="border-2 border-gray-800 rounded 2xl"
            type="submit"
          >
            Отправить
          </button>
        )}
        {mutation.error && (
          <p>Something went wrong! {mutation.error.message}</p>
        )}
      </form>
    </div>
  )
}

export default AddItemForm
