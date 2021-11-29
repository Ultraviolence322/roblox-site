import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import Head from 'next/head'

import Layout from '../components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </>
  )
}

export default MyApp
