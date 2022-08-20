import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import Header from "../components/Header"
import ItemShowCase from "../components/ItemShowCase"

const Home: NextPage = () => {
  return (
    <div className=" flex flex-col justify-center ">
      <Header />
      <ItemShowCase />
    </div>
  )
}

export default Home
