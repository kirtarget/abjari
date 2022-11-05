import ScrollListItem from "./ScrollListItem";
import { IScrollItemProps } from "../../lib/types/MainPage";
import { Box, Container, Typography } from "@mui/material";

const HorizontalScroll = (): JSX.Element => {
  // * ЗАМЕНИТЬ НА HTTP-Запрос
  const items: IScrollItemProps[] = [
    {
      id: 1,
      title: "Longsleeve rashguard",
      img: "/assets/IMG_0215.jpg",
      description: "For every training",
      price: 114,
    },
    {
      id: 2,
      title: "shortsleeve rashguard",
      img: "/assets/IMG_0259.jpeg",
      description: "For every training",
      price: 99,
    },
    {
      id: 3,
      title: "shorts",
      img: "/assets/IMG_0257.jpeg",
      description: "For every training",
      price: 89,
    },
  ];
  return (
    <Box className="main__scroll">
      <Typography variant="h4">Choose your new armor:</Typography>

      <Container className="main__scroll_items  gap-6 overflow-scroll  no-scrollbar justify-between">
        {items.map((item) => (
          <ScrollListItem
            key={item.id}
            id={item.id}
            title={item.title}
            img={item.img}
            description={item.description}
            price={item.price}
          />
        ))}
      </Container>
    </Box>
  );
};

export default HorizontalScroll;
