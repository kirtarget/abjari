import Button from "./UI/Button"

const MainCardCTA = () => {
  return (
    <div className="absolute bottom-10 left-8 flex flex-col justify-start w-72">
      <span className="font-black text-white text-3xl">BEYOND THE LIMITS</span>
      <span className="text-white">
        a unique product that empowers athletes with the courage and confidence
      </span>
      <Button>
        <span className=" opacity-100">SHOP NOW</span>
      </Button>
    </div>
  )
}

export default MainCardCTA
