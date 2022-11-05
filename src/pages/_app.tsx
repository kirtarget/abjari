import "../styles/styles.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { Session } from "next-auth";
import Layout from "../components/layout/Layout";
import CssBaseline from "@mui/material/CssBaseline";

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={pageProps.session}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default trpc.withTRPC(MyApp);
