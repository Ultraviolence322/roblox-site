import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import { Html, Head, Main, NextScript } from 'next/document'
import { useEffect } from 'react'
import Script from 'next/script'
import * as gtag from '../lib/gtag'

const Document:NextPage =  () => {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  
  return (
    <Html lang="en-us">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document