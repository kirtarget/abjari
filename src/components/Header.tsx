import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import Navbar from "./Navbar"

const Header = () => {
  const [activeSearch, setActiveSearch] = useState(false)

  const activateSearchHandler = () => {
    setActiveSearch((prevState) => !prevState)
  }
  return (
    <>
      <Head>
        <title>Abjari</title>
        <meta name="description" content="Number one sport gear in Georgia" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <header className="mx-auto opacity-95 flex w-full border-1 items-center h-20 px-8 min-w-fit rounded-b-3xl shadow-xl shadow-gray-200 justify-between">
        {/* Logo */}
        <Link href="/">
          <Image height={"17px"} width="100px" src="/logo.png" />
        </Link>

        <Navbar
          activeSearch={activeSearch}
          onActivate={activateSearchHandler}
        />
      </header>
    </>
  )
}

export default Header
