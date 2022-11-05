import { Session } from "next-auth";
import Link from "next/link";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge, Typography } from "@mui/material";
import Avatar from "./Avatar";

interface PropsType {
  itemsCount: number;
  hasMounted: boolean;

  session: Session | null;
  status: "unauthenticated" | "authenticated" | "loading";
}

const MenuLinks = ({
  hasMounted,
  itemsCount,
  session,

  status,
}: PropsType): JSX.Element => {
  return (
    <ul className="menu__inner">
      <li className="menu__item">
        <Link href="/">
          <Typography variant="body1" className="menu__link">
            Home
          </Typography>
        </Link>
      </li>

      <li className="menu__item">
        <Link href="/catalog">
          <Typography className="menu__link" variant="body1">
            Catalog
          </Typography>
        </Link>
      </li>

      <li className="menu__item"></li>

      {hasMounted && status === "authenticated" ? (
        <Avatar itemsCount={itemsCount} session={session} />
      ) : (
        <li>
          <Link href="/cart">
            <a>
              <Badge
                sx={{ mr: 2 }}
                badgeContent={(hasMounted && itemsCount) || 0}
                color="primary"
              >
                <ShoppingCartOutlinedIcon color="action" />
              </Badge>
            </a>
          </Link>
          <Link href={"/login"}>
            <a className="menu__link">Login</a>
          </Link>
        </li>
      )}
    </ul>
  );
};

export default MenuLinks;
