import Document, { Html, Head, Main, NextScript } from 'next/document'
import { config, dom } from '@fortawesome/fontawesome-svg-core'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=3.0, minimum-scale=1"
          />
          <style>{dom.css()}</style>
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
