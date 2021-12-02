import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useEffect } from 'react'

import Layout from '../components/Layout'
import { useRouter } from 'next/dist/client/router'
import * as gtag from "../lib/gtag";
const isProduction = process.env.NODE_ENV === "production";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      /* invoke analytics function only for production */
      if (isProduction) gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
