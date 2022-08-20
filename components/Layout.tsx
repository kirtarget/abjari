import React, { FC, ReactNode } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

type LayoutProps = {
  title: string
  description: string
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ title, description = "", children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={description || "Личный блог Карташёва Кирилла"}
        />
        <meta
          property="og:description"
          content={description || "Личный блог Карташёва Кирилла"}
        />
        <link
          href="https://assets.vercel.com/image/upload/front/favicon/vercel/favicon.ico"
          rel="icon shortcut"
          type="image/x-icon"
        />
      </Head>

      <header
        className="flex justify-between items-center
      bg-green-200 px-4 py-3 shadow-slate-900 shadow"
      >
        <Link href="/">
          <a className=" ">Главная</a>
        </Link>
        <Image className="mt-y" height="50px" width="50px" src="/man.png" />
      </header>
      <div className="w-11/12 mx-auto">{children}</div>
      <footer className=" bg-slate-900 text-slate-100 flex items-center justify-center p-2 fixed w-full bottom-0 left-0">
        2022 ® Карташёв Кирилл
      </footer>
    </>
  )
}

export default Layout
