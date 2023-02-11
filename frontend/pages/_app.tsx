import { AppProps } from 'next/app'
import { globalStyles } from '../stitches.config'

import "@fontsource/outfit/variable.css"

export default function MyApp({ Component, pageProps }: AppProps) {
    globalStyles()
    return <Component {...pageProps} />
}