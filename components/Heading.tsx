import { FC, ReactNode } from "react"

type HeadingProps = {
  children: ReactNode
}

const Heading: FC<HeadingProps> = ({ children }) => {
  return (
    <h1 className=" text-center font-black text-2xl text-gray-900">
      {children}
    </h1>
  )
}

export default Heading
