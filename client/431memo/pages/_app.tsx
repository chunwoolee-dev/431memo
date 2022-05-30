import '@styles/global.scss';
import GlobalStyle from '@styles/global';
import type { AppProps } from 'next/app'
import { ThemeProvider } from "styled-components"
import { theme } from '@styles/theme'
import axios from 'axios';
import SessionProvider from '@components/Session';

axios.defaults.baseURL = process.env.SERVER
axios.defaults.withCredentials = true
// axios.defaults.headers.common.Cookie = document.cookie

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <ThemeProvider theme={theme.light}>
        <GlobalStyle/>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}



export default MyApp
