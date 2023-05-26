import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { Store } from '../Store/Store'
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {

useEffect(()=>{
  require("bootstrap/dist/js/bootstrap.bundle.min.js");
},[])

  return (
    <Provider store={Store}>
      <Component {...pageProps} />
    </Provider>

  )
}
