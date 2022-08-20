import type { NextPage } from "next"
import { GetServerSideProps } from "next"
import axios from "axios"
import Heading from "../components/Heading"
import Layout from "../components/Layout"
import { NextConfig } from "next"
import BlogItem from "../components/BlogItem"

type PostsResponse = {
  userId: number
  id: number
  title: string
  body: string
}

type GetPostsResponse = {
  posts: PostsResponse[]
}

const Home: NextPage = (props) => {
  return (
    <Layout
      title="Главная"
      description="Блог о программировании, маркетинге и всяком таком"
    >
      <Heading>Интересные статьи</Heading>

      <div>
        {props.data.map((post) => (
          <BlogItem
            key={post.id}
            title={post.title}
            description={post.body}
            id={post.id}
          />
        ))}
      </div>
    </Layout>
  )
}

// This gets called on every request
export async function getServerSideProps(): GetServerSideProps {
  // Fetch data from external API
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

export default Home
