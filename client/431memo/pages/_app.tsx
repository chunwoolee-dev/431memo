import '@styles/global.scss';
import GlobalStyle from '@styles/global';
import type { AppProps } from 'next/app'
import { ThemeProvider } from "styled-components"
import { theme } from '@styles/theme'
import axios from 'axios';

axios.defaults.baseURL = process.env.SERVER
axios.defaults.withCredentials = true

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme.light}>
      <GlobalStyle/>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
