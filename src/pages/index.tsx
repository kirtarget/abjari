import type { NextPage } from "next"
import HorizontalScroll from "../components/MainPage/HorizontalScroll"
import ItemShowCase from "../components/MainPage/ItemShowCase"
import Layout from "../components/UI/Layout"

const Home: NextPage = () => {
  return (
    <Layout>
      <ItemShowCase />
      <HorizontalScroll />
    </Layout>
  )
}

export default Home
