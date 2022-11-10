import { Box, Container, Typography } from '@mui/material'
import type { GetServerSideProps, NextPage } from 'next'
import { HorizontalScroll } from '../components/mainPage/HorizontalScroll'
import ItemShowCase from '../components/mainPage/ItemShowCase'
import ScrollListItem from '../components/mainPage/ScrollListItem'
import WearUs from '../components/mainPage/WearUs'
import { sanClient } from '../lib/sanityClient'
import { IWearUs } from '../lib/types/apiTypes'
import { IScrollItemProps } from '../lib/types/MainPage'

const Home: NextPage<{ data: IWearUs[] }> = ({ data }) => {
    return (
        <>
            {/* <CheckoutForm /> */}

            <ItemShowCase />

            <HorizontalScroll />

            <Box
                sx={{
                    width: '100%',
                    backgroundColor: '#ccc',
                    borderRadius: '1rem',
                    height: '15rem',
                }}
            >
                Баннер
            </Box>

            <Typography
                variant="h4"
                fontWeight={700}
                color="#333"
                sx={{ textAlign: 'left', mt: 5, textTransform: 'uppercase' }}
            >
                Great people who wears our gear:
            </Typography>
            <Container className="wear-us__container">
                {data?.map((i) => (
                    <WearUs data={i} />
                ))}
            </Container>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const query = '*[_type == "wearus"]'

    const data = await sanClient.fetch(query)

    return {
        props: { data },
    }
}

export default Home
