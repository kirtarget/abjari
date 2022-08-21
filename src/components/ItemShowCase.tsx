import MainCardCTA from "./MainCardCTA"

const ItemShowCase = () => {
  return (
    <>
      <div className="big-card-layout ">
        <div className="big-card first-card  ">
          <MainCardCTA />
        </div>
        <div className="big-card second-card ">
          <MainCardCTA />
        </div>
        <div className="big-card third-card ">
          <MainCardCTA />
        </div>
      </div>
    </>
  )
}

export default ItemShowCase
