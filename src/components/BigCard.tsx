import { IBigCardProps } from "../lib/types/MainPage"
import MainCardCTA from "./MainCardCTA"

const BigCard = ({ id, img, title, description }: IBigCardProps) => {
  return (
    <div
      className={`big-card ${id === 1 ? "first-card" : "second-card"}`}
      style={{
        backgroundImage: `url(${img})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <MainCardCTA title={title} description={description} id={1} />
    </div>
  )
}

export default BigCard
