import { Badge } from '@mui/material'
import Link from 'next/link'
import { useHasMounted } from '../../Hooks/hasMounted'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { Session } from 'next-auth'

interface PropsType {
    itemsCount: number
    session: Session | null
}

const Avatar = ({ itemsCount, session }: PropsType): JSX.Element => {
    const hasMounted = useHasMounted()
    return (
        <li className="user">
            <Link href="/cart">
                <a>
                    <Badge
                        className="user__cart"
                        badgeContent={(hasMounted && itemsCount) || 0}
                        color="primary"
                    >
                        <ShoppingCartOutlinedIcon color="action" />
                    </Badge>
                </a>
            </Link>

            <Link href="/login">
                <a className="menu__link">
                    <img
                        className="user__avatar"
                        src={session?.user?.image ?? ''}
                    />
                </a>
            </Link>
        </li>
    )
}

export default Avatar
