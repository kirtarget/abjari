import React, { useRef, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { trpc } from "../../utils/trpc"
import { nanoid } from "nanoid"
import { prisma } from "@prisma/client"

// Подключение к БД для загрузки изображений
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
)

const AddItemForm = (): JSX.Element => {
  // Локальный стейт (Ссылка на изображение и ошибка если форма не прошла валидацию)
  const [imagesArray, setImagesArray] = useState<string[]>([])
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Слушатели для полей ввода данных
  const nameRef = useRef<HTMLInputElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)

  // Автоматическая загрузка изображения как только в инпут вставлен файл
  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    let file

    setIsImageUploading(true)

    // Если файл выбран, то он передаётся в переменную

    if (e.target.files) {
      for (const singleFile of e.target.files) {
        file = singleFile

        // Создание имени файла, так как БД не работает с кириллицей
        let extension = file?.type.split("/")[1]
        let filename = `${nanoid()}.${extension}`

        // Загрузка в БД
        const { data, error } = await supabase.storage
          .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET!)
          .upload(`public/${filename}`, file as File)

        // Создание ссылки для дальнейшего использования
        let link = `${process.env
          .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${data?.Key}`

        setImagesArray((prevState) => [...prevState, link])

        if (data) {
          console.log(data)
        } else if (error) {
          console.log(error)
        }
      }
    }
    setIsImageUploading(false)
  }

  // Магия tRPC и React Query
  const mutation = trpc.addItem.useMutation()

  // Обработчик отправки формы
  const onAddItemHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Валидация формы
    if (!nameRef.current?.value) {
      setError("Please input a name of an item")
      return
    }
    if (!descriptionRef.current?.value) {
      setError("Please input a description for an item")
      return
    }
    if (!priceRef.current?.value) {
      setError("Please input a price for an item")
      return
    }
    if (imagesArray.length === 0) {
      setError("Upload an image for the item")
      return
    }

    // Создание записи в БД
    mutation.mutate({
      name: nameRef.current?.value,
      description: descriptionRef.current?.value,
      price: Number(priceRef.current?.value),
      mainImage: imagesArray![0],
      images: imagesArray,
    })

    // Сброс формы
    nameRef.current.value =
      descriptionRef.current!.value =
      priceRef.current!.value =
        ""
  }

  return (
    <div className="  mx-4 md:mx-[20%] md:px-9 items-center">
      <form
        onSubmit={onAddItemHandler}
        className="flex flex-col p-2 gap-2 w-full border-2"
      >
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          htmlFor="image"
        >
          Upload photo
        </label>
        <input
          className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="user_avatar_help"
          id="image"
          type="file"
          accept="image/"
          multiple
          onChange={(e): void => {
            handleUpload(e)
          }}
        />

        <div className="flex flex-wrap gap-2">
          {imagesArray?.map((i) => (
            <img key={Math.random()} className="w-36" src={i} />
          ))}
        </div>
        <div
          className="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id="user_avatar_help"
        >
          A profile picture is useful to confirm your are logged into your
          account
        </div>

        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Name of an Item
          </label>
          <input
            placeholder="Item's name"
            type="text"
            ref={nameRef}
            id="name"
            className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Price of an Item
          </label>
          <input
            type="number"
            placeholder="Price"
            ref={priceRef}
            id="price"
            className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Item description
        </label>
        <textarea
          id="description"
          ref={descriptionRef}
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Leave a description..."
        ></textarea>

        {
          <button
            className="border-2 border-gray-800 rounded 2xl"
            type="submit"
            disabled={!isImageUploading}
          >
            Отправить
          </button>
        }
        {error && <p>{error}</p>}
        {mutation.error && (
          <p>Something went wrong! {mutation.error.message}</p>
        )}
      </form>
    </div>
  )
}

export default AddItemForm
