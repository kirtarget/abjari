import { IMainCardProps } from "../../lib/types/MainPage";
import Button from "../UI/Button";
import Link from "next/link";
import { Typography, Box } from "@mui/material";

const MainCardCTA = ({ description, title }: IMainCardProps) => {
  return (
    <Box className="main__hero_cta">
      <Typography className="title">{title}</Typography>
      <Typography className="description ">{description}</Typography>
      <Link href="/catalog">
        <a className=" opacity-100">
          <Button>SHOP NOW</Button>
        </a>
      </Link>
    </Box>
  );
};

export default MainCardCTA;
