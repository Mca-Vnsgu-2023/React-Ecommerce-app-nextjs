import { Html, Head, Main, NextScript } from 'next/document'
import { ToastContainer } from 'react-toastify';

export default function Document() {
  return (
    <Html lang="en">
       <Head> <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" /> </Head>
      <body>
        <Main />
        <ToastContainer />
        <NextScript />
      </body>
    </Html>
  )
}
