import React, { useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { trpc } from "../../utils/trpc";
import { nanoid } from "nanoid";
import { Box } from "@mui/material";

// Подключение к БД для загрузки изображений
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

const AddItemForm = (): JSX.Element => {
  // Локальный стейт (Ссылка на изображение и ошибка если форма не прошла валидацию)
  const [imagesArray, setImagesArray] = useState<string[]>([]);
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Слушатели для полей ввода данных
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  // Автоматическая загрузка изображения как только в инпут вставлен файл
  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    let file;

    setIsImageUploading(true);

    // Если файл выбран, то он передаётся в переменную

    if (e.target.files) {
      for (const singleFile of e.target.files) {
        file = singleFile;

        // Создание имени файла, так как БД не работает с кириллицей
        let extension = file?.type.split("/")[1];
        let filename = `${nanoid()}.${extension}`;

        // Загрузка в БД
        const { data, error } = await supabase.storage
          .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET!)
          .upload(`public/${filename}`, file as File);

        // Создание ссылки для дальнейшего использования
        let link = `${process.env
          .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${data?.Key}`;

        setImagesArray((prevState) => [...prevState, link]);

        if (data) {
          console.log(data);
        } else if (error) {
          console.log(error);
        }
      }
    }
    setIsImageUploading(false);
  };

  // Магия tRPC и React Query
  const mutation = trpc.addItem.useMutation();

  // Обработчик отправки формы
  const onAddItemHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Валидация формы
    if (!nameRef.current?.value) {
      setError("Please input a name of an item");
      return;
    }
    if (!descriptionRef.current?.value) {
      setError("Please input a description for an item");
      return;
    }
    if (!priceRef.current?.value) {
      setError("Please input a price for an item");
      return;
    }
    if (imagesArray.length === 0) {
      setError("Upload an image for the item");
      return;
    }

    // Создание записи в БД
    mutation.mutate({
      name: nameRef.current?.value,
      description: descriptionRef.current?.value,
      price: Number(priceRef.current?.value),
      mainImage: imagesArray![0],
      images: imagesArray,
    });

    // Сброс формы
    nameRef.current.value =
      descriptionRef.current!.value =
      priceRef.current!.value =
        "";

    setImagesArray([]);
  };

  return (
    <Box className="admin__form_container ">
      <form onSubmit={onAddItemHandler} className="admin__form">
        <label htmlFor="image">Upload photo</label>
        <input
          aria-describedby="user_avatar_help"
          id="image"
          type="file"
          accept="image/"
          multiple
          onChange={(e): void => {
            handleUpload(e);
          }}
        />

        <Box className="admin__form_images">
          {imagesArray?.map((i) => (
            <img key={Math.random()} src={i} />
          ))}
        </Box>

        <Box>
          <label htmlFor="name">Name of an Item</label>
          <input
            placeholder="Item's name"
            type="text"
            ref={nameRef}
            id="name"
          />
        </Box>

        <div>
          <label htmlFor="price">Price of an Item</label>
          <input type="number" placeholder="Price" ref={priceRef} id="price" />
        </div>

        <label htmlFor="description">Item description</label>
        <textarea
          id="description"
          ref={descriptionRef}
          rows={4}
          placeholder="Leave a description..."
        ></textarea>

        {
          <button type="submit" disabled={isImageUploading}>
            Отправить
          </button>
        }
        {error && <p>{error}</p>}
        {mutation.error && (
          <p>Something went wrong! {mutation.error.message}</p>
        )}
      </form>
    </Box>
  );
};

export default AddItemForm;
