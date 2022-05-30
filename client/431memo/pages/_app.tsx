import '@styles/global.scss';
import GlobalStyle from '@styles/global';
import type { AppProps } from 'next/app'
import { ThemeProvider } from "styled-components"
import { theme } from '@styles/theme'

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <ThemeProvider theme={theme.dark}>
      <GlobalStyle/>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
