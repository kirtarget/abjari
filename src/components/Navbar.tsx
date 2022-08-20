interface INavbarProps {
  activeSearch: boolean
  onActivate: () => void
}

const Navbar = (props: INavbarProps) => {
  const burgerMenu = () => (
    <div className={`flex sm:hidden absolute right-5`}>
      <div className="space-y-2">
        <span className="block w-8 h-0.5 bg-gray-900"></span>
        <span className="block w-8 h-0.5 bg-gray-900"></span>
        <span className="block w-8 h-0.5 bg-gray-900"></span>
      </div>
    </div>
  )
  return (
    <nav className="flex items-center">
      <ul className="sm:flex hidden gap-8 w-2xl p-4 justify-between absolute right-5">
        <li>
          {props.activeSearch ? (
            <input
              autoFocus
              onBlur={props.onActivate}
              className="px-2 focus:w-42 focus:border-1 focus:border-gray-300 h-6 rounded-2xl transition  duration-1000"
            />
          ) : (
            <img
              onClick={props.onActivate}
              src="/search.svg"
              className=" translate-y-1.5 h-4"
            />
          )}
        </li>
        <li>
          <img src="/cart.svg" className=" translate-y-1.5 h-4" />
        </li>
        <li>contacts</li>
      </ul>
      {/* Mobile menu */}
      {burgerMenu()}
    </nav>
  )
}

export default Navbar
