import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useBearStore } from "../../store/store"
import { useSession } from "next-auth/react"
import { Item } from "../../lib/types/apiTypes"
import { useCartStore } from "../../store/cartStore"
import { useHasMounted } from "../../Hooks/hasMounted"
import { CartItem } from "../cart/CartItem"
import { Avatar, Dropdown, Navbar } from "flowbite-react"

function OrderForm() {
  const cart = useCartStore((state) => state.cart)
  const getCartItem = useCartStore((state) => state.getCartItem)

  const hasMounted = useHasMounted()

  return (
    <div
      id="drawer-left-example"
      className="hidden fixed right-0 z-40 h-screen p-4 overflow-y-auto bg-slate-200 w-[40%] dark:bg-gray-800"
      aria-labelledby="drawer-left-label"
    >
      <div className="flex flex-col gap-2 mt-2 mb-2 h-fit">
        {hasMounted && cart.length !== 0 ? (
          cart.map((item) => {
            const product = getCartItem(item.id)

            return (
              <CartItem
                key={product.id}
                name={product.name}
                id={product.id}
                description={product.description}
                price={product.price}
                mainImage={product.mainImage}
                images={product.images}
              />
            )
          })
        ) : (
          <p>The cart is empty</p>
        )}
      </div>
    </div>
  )
}

const Header = () => {
  const hasMounted = useHasMounted()

  const [activeMenu, setActiveMenu] = useState<boolean | null>(false)

  const itemsCount = useCartStore((state) => state.cartCount)
  const loggedIn = useBearStore(state => state.loggedIn)
  const logIn = useBearStore(state => state.logIn)


  const { data: session } = useSession()

  useEffect(() => {
    if (session && !loggedIn) {
      logIn()
    }
  }, [loggedIn])

  const toggleMenuHandler = (): void => {
    setActiveMenu(!activeMenu)
  }

  return (
    <>
      <Head>
        <title>Abjari</title>

        <meta name="description" content="Number one sport gear in Georgia" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <OrderForm />





      <div className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 rounded-b-3xl shadow-xl shadow-gray-200 mb-3">
        <Navbar
          fluid={true}
          rounded={true}

        >
          <Navbar.Brand href="https://flowbite.com/">
            <img
              src="/logo.png"
              className="mr-3 h-4 sm:h-5"
              alt="Abjari Logo"
            />

          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Navbar.Link
              href="/"
              active={true}
            >
              Home
            </Navbar.Link>
            <Navbar.Link href="/cart">
              Cart

              <span className="rounded-full bg-blue-500 p-1 px-2 text-white">
                {hasMounted && itemsCount}
              </span>
            </Navbar.Link>
            <Navbar.Link href="/catalog">
              Catalog
            </Navbar.Link>
            <Navbar.Link href="/admin">
              Admin
            </Navbar.Link>
            {hasMounted && loggedIn ? (
              <li className="flex items-end md:items-start">
                <Link href="/login">
                  <a>
                    <img
                      className="rounded-full w-8"
                      src={
                        "https://res.cloudinary.com/demo/image/fetch/" +
                        session?.user?.image
                      }
                    />
                  </a>
                </Link>
              </li>
            ) : (
              <li>
                <Link href={"/login"}>
                  <a>Login</a>
                </Link>
              </li>
            )}

          </Navbar.Collapse>
        </Navbar>
      </div>






      {/* <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 rounded-b-3xl shadow-xl shadow-gray-200 mb-3">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link href="/">
            <a>
              <Image height="17px" width="100px" src="/logo.png" />
            </a>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            onClick={toggleMenuHandler}
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div
            className={`${activeMenu ? "" : "hidden"
              } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link href="/">
                  <a
                    className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    aria-current="page"
                  >
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href={"cart"}>
                  <a className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    Cart
                    <span className="rounded-full bg-blue-500 p-1 px-2 text-white">
                      {hasMounted && itemsCount}
                    </span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href={"catalog"}>
                  <a className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    Catalog
                  </a>
                </Link>
              </li>

              <li>
                <Link href="/admin">
                  <a className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    Admin
                  </a>
                </Link>
              </li>
              {hasMounted && loggedIn ? (
                <li className="flex items-end md:items-start">
                  <Link href="/login">
                    <a>
                      <img
                        className="rounded-full w-8"
                        src={
                          "https://res.cloudinary.com/demo/image/fetch/" +
                          session?.user?.image
                        }
                      />
                    </a>
                  </Link>
                </li>
              ) : (
                <li>
                  <Link href={"/login"}>
                    <a>Login</a>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav> */}
    </ >
  )
}

export default Header
