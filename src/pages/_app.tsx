import '../styles/styles.scss'
import type { AppProps } from 'next/app'

import { ThemeProvider } from '@mui/material/styles'
import { SessionProvider } from 'next-auth/react'
import { trpc } from '../utils/trpc'

import Layout from '../components/layout/Layout'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import theme from '../theme/theme'
import createEmotionCache from '../theme/createEmotionCache'

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

export default trpc.withTRPC(MyApp)
