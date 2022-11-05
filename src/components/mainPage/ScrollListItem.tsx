import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import { IScrollItemProps } from '../../lib/types/MainPage'
import Button from '../UI/Button'

const ScrollListItem = ({ title, img, price }: IScrollItemProps) => {
    return (
        <>
            <Box className="scroll-item">
                <Box className="scroll-item_img">
                    <img src={img} />
                </Box>
                <Typography component="h3">{title}</Typography>
                <Typography component="h4">${price}</Typography>
                <Link href="/catalog">
                    <a>
                        <Button>Shop Now</Button>
                    </a>
                </Link>
            </Box>
        </>
    )
}

export default ScrollListItem
