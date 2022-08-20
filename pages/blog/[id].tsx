import { GetServerSideProps, GetStaticProps } from "next/types"
import Layout from "../../components/Layout"

export async function getStaticProps(context: any): GetStaticProps {
  console.log(context)

  const { id } = context.params
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }
  // Pass data to the page via props
  return { props: { post: data } }
}

export const getStaticPaths = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
  const data = await res.json()

  const paths = data.map(({ id }) => ({ params: { id: id.toString() } }))

  return {
    paths,
    fallback: false,
  }
}

const BlogPage = (props: any) => {
  console.log(props)
  return (
    <>
      <Layout title={`${props.post.title}`} description={`${props.post.body}`}>
        <h1 className=" font-bold text-xl text-center">{props.post.title}</h1>
        <p>{props.post.body}</p>
      </Layout>
    </>
  )
}

export default BlogPage
