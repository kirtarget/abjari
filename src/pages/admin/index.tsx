import React, { useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";
import { Box, Typography } from "@mui/material";
import AddItemForm from "../../components/Forms/AddItemForm";
import { Container } from "@mui/material";
import { useHasMounted } from "../../Hooks/hasMounted";
import { useBearStore } from "../../store/store";
import { trpcClient } from "../../server/client";
import { GetServerSideProps } from "next";

interface Item {
  id?: any;
  name: string;
  price: number;
  mainImage: string;
  images: string[];
  description: string;
}

export default function AdminPage({
  data,
}: {
  data: { items: Item[] };
}): JSX.Element {
  const [isEditing, setIsEditing] = useState<boolean | null>(null);

  const hasMounted = useHasMounted();

  useEffect(() => {
    useBearStore.setState({ items: data?.items });
  }, [data]);

  let items = useBearStore((state) => state.items);

  const mutation = trpcClient.editItem.mutate;

  const onEditHandler = (e: React.PointerEvent) => {
    setIsEditing(true);
    // mutation.mutate({})
  };

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      <h1>Админ-панель</h1>

      <h2>Добавление товара:</h2>
      <AddItemForm />

      <h2>Список товаров:</h2>
      <Box>
        {hasMounted && items?.length > 0 ? (
          items.map((item: Item) => {
            if (!item.mainImage.startsWith("http")) {
              item.mainImage = "https://trpc.io/img/logo.svg";
            }
            return (
              <Box key={item.id} className="admin__item ">
                <img
                  className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                  src={item.mainImage}
                  alt=""
                />
                <Box className="admin__item_description">
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body1">{item.description}</Typography>
                </Box>
              </Box>
            );
          })
        ) : (
          <Typography variant="h5">Loading...</Typography>
        )}
      </Box>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await trpcClient.items.query({ id: "all" });
  return {
    props: { data },
  };
};
