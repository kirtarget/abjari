const MainCardCTA = () => {
  return (
    <div className="absolute bottom-10 left-8 flex flex-col justify-start w-72">
      <span className="font-black text-white text-3xl">BEYOND THE LIMITS</span>
      <span className="text-white">
        a unique product that empowers athletes with the courage and confidence
      </span>
      <button className="mt-2 px-6 py-2 bg-slate-300 w-4/5 rounded-3xl opacity-60 text-slate-900 font-black backdrop-blur-3xl hover:bg-slate-900 hover:text-white hover:-translate-y-1 hover:scale-105 hover:opacity-100">
        <span className=" opacity-100">SHOP NOW</span>
      </button>
    </div>
  )
}

export default MainCardCTA
