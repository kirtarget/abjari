import Footer from "./Footer"
import Header from "./Header"
import { ReactNode } from "react"

const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
