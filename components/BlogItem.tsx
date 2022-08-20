import Link from "next/link"
import Head from "next/head"
import { FC } from "react"

type BlogItemProps = {
  title: string
  description: string
  id: number
}

const BlogItem: FC<BlogItemProps> = ({ title, description, id }) => {
  return (
    <div className="blog-item py-3 bg-white my-3 px-2 rounded-md">
      <h5 className=" font-bold py-2 text-lg">{title}</h5>
      <p className="mb-3">{description}</p>
      <div className="flex justify-end">
        <Link href="/blog/[id]" as={`/blog/${id}`}>
          <a className=" text-end bg-purple-600 p-2 px-3 rounded-2xl inline-block text-white  shadow-slate-600 text-sm hover:bg-purple-800  ">
            Прочитать
          </a>
        </Link>
      </div>
    </div>
  )
}

export default BlogItem
