import type { GetServerSideProps, NextPage } from "next";
import CheckoutForm from "../components/Forms/CheckoutForm";
import HorizontalScroll from "../components/mainPage/HorizontalScroll";
import ItemShowCase from "../components/mainPage/ItemShowCase";
import Layout from "../components/layout/Layout";
import { sanClient } from "../lib/sanityClient";
import { IProduct } from "../lib/types/productType";
import WearUs from "../components/mainPage/WearUs";

const Home: NextPage = () => {
  return (
    <>
      {/* <CheckoutForm /> */}

      <ItemShowCase />

      <HorizontalScroll />

      <WearUs />
    </>
  );
};

export default Home;
