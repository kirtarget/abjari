import Head from "next/head";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useBearStore } from "../../store/store";
import { useSession } from "next-auth/react";
import { useCartStore } from "../../store/cartStore";
import { useHasMounted } from "../../Hooks/hasMounted";
import { trpc } from "../../utils/trpc";
import MenuLinks from "./MenuLinks";
import { sanClient } from "../../lib/sanityClient";
import { Item } from "../../lib/types/apiTypes";

const Header = () => {
  // Hooks
  const hasMounted = useHasMounted();
  const [activeMenu, setActiveMenu] = useState<boolean | null>(false);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean | null>(null);
  const { data: session, status } = useSession();

  // State

  const itemsCount = useCartStore((state) => state.cartCount);

  // Actions
  const toggleMenuHandler = (): void => {
    setActiveMenu(!activeMenu);
  };

  return (
    <Box>
      <Head>
        <title>Abjari</title>

        <meta name="description" content="Number one sport gear in Georgia" />
        <link rel="icon" href="/assets/favicon.png" />
      </Head>

      <Box className="header" id="header">
        <nav className="header__navbar">
          <Link href="/">
            <a className="header__brand">
              <img src="/assets/logo.png" alt="Abjari Logo" />
            </a>
          </Link>

          <Box
            className={`header__burger ${isMenuVisible ? "is-active" : ""}`}
            onClick={() => setIsMenuVisible(!isMenuVisible)}
            id="burger"
          >
            <Typography className="header__burger-line"></Typography>
            <Typography className="header__burger-line"></Typography>
            <Typography className="header__burger-line"></Typography>
          </Box>

          <Box
            className={`menu ${isMenuVisible ? "is-active" : ""}`}
            onClick={() => setIsMenuVisible(!isMenuVisible)}
            id="menu"
          >
            <MenuLinks
              itemsCount={itemsCount}
              hasMounted={hasMounted}
              session={session}
              status={status}
            />
          </Box>
        </nav>
      </Box>
    </Box>
  );
};

export default Header;
