import Head from "next/head"
import Image from "next/image"

const Header = () => {
  return (
    <>
      <Head>
        <title>Abjari</title>
        <meta name="description" content="Number one sport gear in Georgia" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className=" opacity-95 flex w-full border-1 items-center h-20 px-8 min-w-fit rounded-b-3xl shadow-xl shadow-gray-200 relative">
        <Image height={"17px"} width="100px" src="/logo.png" />
        <ul className="flex gap-8 w-2xl p-4 justify-between absolute right-5">
          <li>search</li>
          <li>cart</li>
          <li>menu</li>
        </ul>
      </header>
    </>
  )
}

export default Header
