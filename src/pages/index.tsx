import type { NextPage } from "next"
import Footer from "../components/UI/Footer"
import Header from "../components/UI/Header"
import HorizontalScroll from "../components/HorizontalScroll"
import ItemShowCase from "../components/ItemShowCase"
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

// export default function IndexPage() {
//   const hello = trpc.hello.useQuery({ text: "client" })
//   if (!hello.data) {
//     return <div>Loading...</div>
//   }
//   return (
//     <div>
//       <p>{hello.data.greeting}</p>
//     </div>
//   )
// }
