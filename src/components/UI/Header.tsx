import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useBearStore } from "../../store/store"
import { useSession } from "next-auth/react"
import { useCartStore } from "../../store/cartStore"
import { useHasMounted } from "../../Hooks/hasMounted"
import { Badge, Box, Typography } from "@mui/material"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';



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

  const [isMenuVisible, setIsMenuVisible] = useState<boolean | null>(null)

  return (
    <Box>
      <Head>
        <title>Abjari</title>

        <meta name="description" content="Number one sport gear in Georgia" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Box className="header" id="header">
        <nav className="navbar container">
          <Link href="/" >
            <a className="brand">
              <img
                src="/logo.png"
                className="mr-3 h-4 sm:h-5"
                alt="Abjari Logo"
              />
            </a>
          </Link>
          <Box className={`burger ${isMenuVisible ? 'is-active' : ''}`} onClick={() => setIsMenuVisible(!isMenuVisible)} id="burger">
            <Typography className="burger-line"></Typography>
            <Typography className="burger-line"></Typography>
            <Typography className="burger-line"></Typography>
          </Box>
          <Box className={`menu ${isMenuVisible ? 'is-active' : ''}`} onClick={() => setIsMenuVisible(!isMenuVisible)} id="menu">
            <ul className="menu-inner">
              <li className="menu-item"><Link href="/" ><a className="menu-link">Home</a></Link></li>
              <li className="menu-item">
                <Link href="/catalog"><a className="menu-link">
                  <Typography variant="body1">

                    Catalog
                  </Typography>
                </a>
                </Link>
              </li>
              <li className="menu-item"><a href="#" className="menu-link">Products</a></li>
              <li className="menu-item"><Link href="/admin"><a className="menu-link"><Typography variant="body1">
                Admin
              </Typography></a></Link> </li>
              <li className="menu-item"></li>
              {hasMounted && loggedIn ? (
                <li className="flex items-end md:items-start">

                  <Box sx={{
                    display: 'flex',
                    gap: 2,
                    alignItems: 'center'
                  }}>
                    <Link href="/cart">
                      <a>
                        <Badge sx={
                          { mr: 2 }
                        } badgeContent={hasMounted && itemsCount || 0} color="primary">
                          <ShoppingCartOutlinedIcon color="action" />
                        </Badge>
                      </a>
                    </Link>
                    <Link href="/login">
                      <a className="menu-link">
                        <img
                          className="rounded-full w-8"
                          src={
                            "https://res.cloudinary.com/demo/image/fetch/" +
                            session?.user?.image
                          }
                        />
                      </a>
                    </Link>
                  </Box>

                </li>
              ) : (
                <li>
                  <Link href="/cart">
                    <a>
                      <Badge sx={
                        { mr: 2 }
                      } badgeContent={hasMounted && itemsCount || 0} color="primary">
                        <ShoppingCartOutlinedIcon color="action" />
                      </Badge>
                    </a>
                  </Link>
                  <Link href={"/login"}>
                    <a className="menu-link">Login</a>
                  </Link>
                </li>
              )}
            </ul>
          </Box>
        </nav>
      </Box>
    </ Box>
  )
}

export default Header
