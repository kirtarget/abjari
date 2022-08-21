import MainCardCTA from "./MainCardCTA"

const ItemShowCase = () => {
  return (
    <>
      <div className="big-card-layout ">
        <div className="big-card first-card  ">
          <MainCardCTA
            title={"BEYOND THE LIMITS"}
            description={
              "a unique product that empowers athletes with the courage and confidence"
            }
            id={1}
          />
        </div>
        <div className="big-card second-card ">
          <MainCardCTA
            title={"FOR TRUE WARRIORS"}
            description={"Abjari gear is an armor of our time"}
            id={2}
          />
        </div>
        <div className="big-card third-card ">
          <MainCardCTA
            title={"THE CHOICE OF CHAMPIONS"}
            description={
              "Abjari is a brand that wears a Judo champion of Europe - Luka Maisuradze"
            }
            id={3}
          />
        </div>
      </div>
    </>
  )
}

export default ItemShowCase
