import '@styles/global.scss';
import type { AppProps } from 'next/app'
import axios from 'axios';
import SessionProvider from '@components/Session';
import ModeProvider, { useMode } from '@components/Mode';
import { ThemeProvider } from 'styled-components';
import { theme } from '@styles/theme';
import GlobalStyle from '@styles/global';
import { useEffect, useState } from 'react';

axios.defaults.baseURL = process.env.SERVER
axios.defaults.withCredentials = true
// axios.defaults.headers.common.Cookie = document.cookie

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <ModeProvider>
        <GlobalStyle/>
        <Component {...pageProps} />
      </ModeProvider>
    </SessionProvider>
  )
}



export default MyApp
