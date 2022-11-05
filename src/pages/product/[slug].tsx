import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { sanClient, urlFor } from "../../lib/sanityClient";
import { PortableText } from "@portabletext/react";
import { Box, Container } from "@mui/system";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Lazy } from "swiper";
import { Button, Link } from "@mui/material";
import { useState } from "react";
import { useCartStore } from "../../store/cartStore";

interface IParams extends ParsedUrlQuery {
  slug: string;
}
interface Product {
  _id: string;
  name: string;
  pricegel: number;
  image: {
    _key: string;
    _type: string;
    asset: { _ref: string; _type: string };
  }[];
  description: { _type: string }[];
  shortDescription?: { _type: string }[];
}

interface ProductProps {
  product: Product;
  products: Product[];
}

const ProductInfo: NextPage<ProductProps> = ({ product, products }) => {
  const { name, pricegel, image, description, shortDescription, _id } =
    product ?? {};

  const [addedToCart, setAddedToCart] = useState<boolean | null>(null);
  const increaseItemQuantity = useCartStore(
    (state) => state.increaseItemQuantity
  );
  const [quantity, setQuantity] = useState<number | null>(null);
  const getItemQuantity = useCartStore((state) => state.getItemQuantity);
  const addToCartHandler = () => {
    setAddedToCart(true);
    increaseItemQuantity(_id);
    setQuantity(getItemQuantity(_id));
  };

  return (
    <Container className="single-product">
      <Box className="single-product__image">
        <img src={image && urlFor(image?.[0])?.url()} />
      </Box>
      <Box className="single-product__details">
        <h1>{name}</h1>
        <h2>{pricegel}₾</h2>
        <PortableText value={description} />
      </Box>
      <Box>
        <Button
          sx={{
            borderRadius: "1rem",
            mb: 2,
            mx: "auto",
          }}
          onClick={addToCartHandler}
          fullWidth={true}
          variant="outlined"
        >
          Add to Cart
        </Button>
        <Link href={"/cart"}>
          <Button
            sx={{
              mb: 2,
              borderRadius: "1rem",
              mx: "auto",
            }}
            fullWidth={true}
            variant="outlined"
            className={`${addedToCart ? "" : "hidden"}`}
          >
            Make an order
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await sanClient.fetch(query);
  const paths = products.map(
    (product: { name: string; slug: { current: string } }) => ({
      params: { slug: product.slug.current },
    })
  );
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;

  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;

  const productsQuery = '*[_type == "product"]';

  const product = await sanClient.fetch(query);
  const products = await sanClient.fetch(productsQuery);

  return {
    props: { products, product },
  };
};

export default ProductInfo;
