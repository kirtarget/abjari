import { IMainCardProps } from "../../lib/types/MainPage"
import Button from "../UI/Button"
import Link from "next/link"

const MainCardCTA = ({ description, title }: IMainCardProps) => {
  return (
    <div className=" m-8 flex flex-col justify-start w-72">
      <span className="font-black text-white text-3xl">{title}</span>
      <span className="text-white">{description}</span>
      <Link href="/catalog">
        <a className=" opacity-100">
          <Button className={""}>SHOP NOW</Button>
        </a>
      </Link>
    </div>
  )
}

export default MainCardCTA
