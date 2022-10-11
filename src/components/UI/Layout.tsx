import Footer from "./Footer"
import Header from "./Header"
import { ReactNode } from "react"

const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <div className=" flex flex-col justify-center align-middle ">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
