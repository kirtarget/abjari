import type { NextPage } from 'next'
import { HorizontalScroll } from '../components/mainPage/HorizontalScroll'
import ItemShowCase from '../components/mainPage/ItemShowCase'
import WearUs from '../components/mainPage/WearUs'

const Home: NextPage = () => {
    return (
        <>
            {/* <CheckoutForm /> */}

            <ItemShowCase />

            <HorizontalScroll />

            <WearUs />
        </>
    )
}

export default Home
