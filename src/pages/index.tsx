import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import Header from "../components/Header"
import HorizontalScroll from "../components/HorizontalScroll"
import ItemShowCase from "../components/ItemShowCase"

const Home: NextPage = () => {
  return (
    <div className=" flex flex-col justify-center ">
      <Header />
      <ItemShowCase />
      <HorizontalScroll />
    </div>
  )
}

export default Home
