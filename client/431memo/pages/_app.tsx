import '@styles/global.scss';
import GlobalStyle from '@styles/global';
import type { AppProps } from 'next/app'
import {SessionProvider} from 'next-auth/react';
import { ThemeProvider } from "styled-components"
import { theme } from '@styles/theme'

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme.dark}>
        <GlobalStyle/>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp
