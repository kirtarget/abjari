import { BsSearch, BsMinecart } from "react-icons/bs"
import { AiOutlineMenu } from "react-icons/ai"

interface INavbarProps {
  activeSearch: boolean
  onActivate: () => void
}

const Navbar = (props: INavbarProps) => {
  return (
    <>
      <nav className="flex items-center">
        <ul className="sm:flex hidden gap-8 w-2xl p-4 justify-between right-5">
          <li>
            {props.activeSearch ? (
              <input
                autoFocus
                onBlur={props.onActivate}
                className="px-2 focus:w-42 focus:border-1 focus:border-gray-300 h-6 rounded-2xl transition  duration-1000 ease-in"
              />
            ) : (
              <BsSearch onClick={props.onActivate} size={25} />
            )}
          </li>
          <li>
            <BsMinecart size={25} />
          </li>
          <li>contacts</li>
        </ul>
        {/* Mobile menu */}

        <AiOutlineMenu size={25} className="sm:hidden  right-5" />
      </nav>
      {/* <div className="fixed top-0 left-0 bg-black/70 w-full h-full z-50">
        <div className="fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] g-screen bg-slate-100 p-10 ease-in duration"></div>
      </div> */}
    </>
  )
}

export default Navbar
