import { IBigCardProps } from "../../lib/types/MainPage";
import MainCardCTA from "./MainCardCTA";
import { Box, Container } from "@mui/material";

const ItemShowCase = () => {
  const items: IBigCardProps[] = [
    {
      id: 1,
      img: "/assets/IMG_0259.jpeg",
      title: "BEYOND THE LIMITS",
      description:
        "a unique product that empowers athletes with the courage and confidence",
    },
    {
      id: 2,
      img: "/assets/IMG_0257.jpeg",
      title: "FOR TRUE WARRIORS",
      description: "Abjari gear is an armor of our time",
    },
    {
      id: 3,
      img: "/assets/IMG_0215.jpg",
      title: "THE CHOICE OF CHAMPIONS",
      description:
        "Abjari is a brand that wears a Judo champion of Europe - Luka Maisuradze",
    },
  ];
  return (
    <Container className="main__hero">
      <Box className="main__hero_card">
        <MainCardCTA
          title={items[0].title}
          description={items[0].description}
          id={1}
        />
      </Box>
      <Box className="main__hero_card">
        <MainCardCTA
          title={items[1].title}
          description={items[1].description}
          id={1}
        />
      </Box>
      <Box className="main__hero_card">
        <MainCardCTA
          title={items[2].title}
          description={items[2].description}
          id={1}
        />
      </Box>
    </Container>
  );
};

export default ItemShowCase;
