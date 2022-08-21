import { IMainCardProps } from "../lib/types/MainPage"
import Button from "./UI/Button"

const MainCardCTA = ({ description, title }: IMainCardProps) => {
  return (
    <div className=" m-8 flex flex-col justify-start w-72">
      <span className="font-black text-white text-3xl">{title}</span>
      <span className="text-white">{description}</span>
      <Button>
        <span className=" opacity-100">SHOP NOW</span>
      </Button>
    </div>
  )
}

export default MainCardCTA
