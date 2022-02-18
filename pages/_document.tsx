import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Manrope&display=optional"
            rel="stylesheet"
          />
        </Head>
        <body className="theme-default">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
