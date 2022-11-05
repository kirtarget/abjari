import '../styles/styles.scss'
import type { AppProps } from 'next/app'
import PropTypes from 'prop-types'
import { ThemeProvider } from '@mui/material/styles'
import { SessionProvider } from 'next-auth/react'
import { trpc } from '../utils/trpc'
import { Session } from 'next-auth'
import Layout from '../components/layout/Layout'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import theme from '../theme/theme'
import createEmotionCache from '../theme/createEmotionCache'
import { NextPage } from 'next'

const clientSideEmotionCache = createEmotionCache()

function MyApp({ Component, pageProps }: AppProps) {
    const {
        emotionCache = clientSideEmotionCache,

        session,
    } = pageProps
    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
                <SessionProvider session={session}>
                    <CssBaseline />
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </SessionProvider>
            </ThemeProvider>
        </CacheProvider>
    )
}
interface MyAppProps {
    Component: PropTypes.Requireable<PropTypes.ReactComponentLike>
    emotionCache: PropTypes.Requireable<object>
    pageProps: PropTypes.Validator<object>
    session: Session
}

export default trpc.withTRPC(MyApp)
