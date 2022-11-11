import Footer from './Footer'
import Header from './Header'
import { ReactNode } from 'react'
import { Container } from '@mui/material'

const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
    return (
        <Container>
            <Header />
            <Container className="container">{children}</Container>

            <Footer />
        </Container>
    )
}

export default Layout
