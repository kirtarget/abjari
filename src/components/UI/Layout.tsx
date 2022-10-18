import Footer from "./Footer"
import Header from "./Header"
import { ReactNode } from "react"

const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <div className=" flex flex-col justify-between h-screen align-middle ">
      <Header />
      <div className="flex flex-col w-full">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
