import MainCardCTA from "./MainCardCTA"

const ItemShowCase = () => {
  return (
    <>
      <div className="big-card-layout">
        <div className="big-card first-card  sm:h-full">
          <MainCardCTA />
        </div>
        <div className="big-card second-card sm:h-full">
          <MainCardCTA />
        </div>
        <div className="big-card third-card sm:h-full">
          <MainCardCTA />
        </div>
      </div>
    </>
  )
}

export default ItemShowCase
