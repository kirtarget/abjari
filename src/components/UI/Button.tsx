import React from "react"
import { IChildren } from "../../lib/types/MainPage"

const Button = ({ children }: IChildren) => {
  return (
    <button className="mt-2 px-6 py-2 bg-slate-300 w-4/5 rounded-3xl opacity-60 text-slate-900 font-black backdrop-blur-3xl hover:bg-slate-900 hover:text-white hover:scale-105 hover:opacity-100">
      {children}
    </button>
  )
}

export default Button
