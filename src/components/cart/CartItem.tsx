import { useCartStore } from '../../store/cartStore'
import { Box, Grid, MenuItem, Select } from '@mui/material'
import { Typography } from '@mui/material'
import { urlFor } from '../../lib/sanityClient'
import { PortableText } from '@portabletext/react'
import { IProduct } from '../../lib/types/productType'
import { useState } from 'react'

export const CartItem = ({
    name,
    _id,
    details,
    shortDescription,
    image,
    pricegel,
}: IProduct) => {
    const [size, setSize] = useState('M')
    const getItemQuantity = useCartStore((state) => state.getItemQuantity)
    const decreaseItemQuantity = useCartStore(
        (state) => state.decreaseItemQuantity
    )
    const increaseItemQuantity = useCartStore(
        (state) => state.increaseItemQuantity
    )
    const cart = useCartStore((state) => state.cart)
    const getUniqSum = useCartStore((state) => state.getUniqSum)
    const setItemSize = useCartStore((state) => state.setItemSize)

    const changeSizehandler = (e: any): void => {
        setItemSize(_id, e.target.value)
        setSize(e.target.value)
        console.table(cart)
    }

    return (
        <Grid
            container
            sx={{
                borderRadius: '0.5rem',
                width: '100%',
                px: '0,5rem',
            }}
            className="cart__item"
        >
            <Grid item xs={12} md={4}>
                <img
                    className=""
                    src={
                        urlFor(image?.[0])?.url() ??
                        'https://cdn.sstatic.net/Sites/apple/Img/logo.svg?v=7a390e34f55f'
                    }
                    alt={name}
                />
            </Grid>
            <Grid
                item
                xs={12}
                md={8}
                sx={{
                    px: 1,
                }}
                className="cart__description"
            >
                <Box>
                    <Typography variant="h6" paddingBottom={2}>
                        {name}
                    </Typography>
                    <Typography variant="h6">{pricegel}₾</Typography>
                </Box>
                <PortableText value={shortDescription} />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle1" px={3} paddingBottom={2}>
                        Choose your size:
                    </Typography>
                    <Select
                        label="Choose your size:"
                        onChange={(e) => changeSizehandler(e)}
                        value={size}
                    >
                        {details?.map((item) => (
                            <MenuItem key={item._key} value={item.size}>
                                {item.size}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
                <Box>
                    <p className="cart__buttons ">
                        <button
                            className="px-2"
                            onClick={() => decreaseItemQuantity(_id)}
                        >
                            -
                        </button>
                        {getItemQuantity(_id)}
                        <button
                            className="px-2"
                            onClick={() => increaseItemQuantity(_id)}
                        >
                            +
                        </button>
                    </p>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="h6">Sum</Typography>
                    <Typography variant="h6">{getUniqSum(_id)}₾</Typography>
                </Box>
            </Grid>
        </Grid>
    )
}
