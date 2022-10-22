import { Item } from "../../lib/types/apiTypes"
import { useCartStore } from "../../store/cartStore"
import { Box, Grid } from '@mui/material';
import { Typography } from '@mui/material';

export const CartItem = ({
  name,
  id,
  description,
  mainImage,
  images,
  price,
}: Item) => {

  const getItemQuantity = useCartStore(state => state.getItemQuantity)
  const decreaseItemQuantity = useCartStore(state => state.decreaseItemQuantity)
  const increaseItemQuantity = useCartStore(state => state.increaseItemQuantity)
  const getUniqSum = useCartStore(state => state.getUniqSum)

  return (
    <Grid container sx={{
      borderRadius: '0.5rem',
      width: '100%',
      px: '0,5rem',
      alignItems: 'center',
      justifyContent: 'center'

    }} className="shadow-md">
      <Grid item xs={4}>
        <img className="" src={mainImage} alt={name} />
      </Grid>
      <Grid item xs={8} sx={{
        px: 1
      }}>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="h6">{price}₾</Typography>
        <p className="font-bold text-slate-700 text-center">
          <button className="px-2" onClick={() => decreaseItemQuantity(id)}>
            -
          </button>
          {getItemQuantity(id)}
          <button className="px-2" onClick={() => increaseItemQuantity(id)}>
            +
          </button>
        </p>
        <Box sx={{
          display: "flex",
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Typography variant="h6">
            Sum
          </Typography>
          <Typography variant="h6">
            {getUniqSum(id)}₾
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}
