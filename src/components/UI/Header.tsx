import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useBearStore } from "../../store/store"
import { useSession } from "next-auth/react"
import { useCartStore } from "../../store/cartStore"
import { useHasMounted } from "../../Hooks/hasMounted"
import { Badge, Box, Button, Typography } from "@mui/material"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { trpc } from '../../utils/trpc';



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
  const mutation = trpc.sendParcel.useMutation()

  return (
    <Box>
      <Head>
        <title>Abjari</title>

        <meta name="description" content="Number one sport gear in Georgia" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Box className="header" id="header">
        <Button variant="contained" onClick={() => {
          mutation.mutate({
            "ParcelTypeId": 55,
            "ReceiverCityId": 5877,
            "ReceiverAddressNote": "ul Karla Marksa, 47-5",
            "ZIP": "127001",
            "IsExpress": false,
            "deliveryMethod": 227,
            "Weight": 1.1,
            "X": 10,
            "Y": 10,
            "Z": 10,
            "Quantity": 1,
            "Insurance": {
              "IsInsured": false,
              "InsuranceAmount": 2.1,
              "InsuranceCurrencyID": 3.0
            },
            "ReceiverPerson": {
              "PersonTypeId": 2.0,
              "FirstName": "Kirill",
              "LastName": "Kartashyov",
              "OrganizationName": "null",
              "Phone": "+375444862986",
              "Email": "sheldongriffiths1@gmail.com"
            },
            "PaymentMethod": 230,
            "isHand2Hand": false,
            "customerParcelCode": "dkdc13Kscm",
            "declarationItems": [
              {
                "declarationItemID": 336342,
                "comment": "Test order for testing postal API",
                "currencyId": 1.0,
                "itemCount": 1.0,
                "itemPrice": 1.0,
                "itemWeigth": 1.1
              }

            ],
            "needExportDeclaration": false
          })
        }}>Send Parcel</Button>
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
