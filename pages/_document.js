import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { GA_TRACKING_ID } from '../helpers/analytics'

export default class MyDocument extends Document {

    render() {
        return (
          <Html lang="en">
            <Head>
              {/* Global Site Tag (gtag.js) - Google Analytics */}
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
                }}
              />

              {/* google font */}
              <link
                rel="preload"
                href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700&display=swap"
                as="font"
                crossOrigin=""
              />

              {/* added google sign up */}
              <script src="https://apis.google.com/js/api:client.js"></script>
              <script src="https://accounts.google.com/gsi/client"></script>

              {/* meta data */}
                <title>Save, Collect and Share Your Favourite Websites | webshare.me</title>
                <meta property="og:title" content="Save, Collect and Share Your Favourite Websites" />
                <meta property="og:description" content="Collect all your online links in one place and share with your friends" />
                <meta property="og:image" content="http://www.webshare.me/webshare-share.png" />
                <meta property="og:url" content="http://www.webshare.me/" />
            </Head>
            <body>
              <Main />
              <NextScript />
            </body>
          </Html>
        );
      }

  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }



}