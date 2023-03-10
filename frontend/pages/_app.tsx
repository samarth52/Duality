import { AppProps } from 'next/app'
import { globalStyles } from '../stitches.config'
import { AuthProvider } from '@/components/Firebase/Auth'

import "@/cmdk.css";
import "@fontsource/outfit/variable.css"
import "@/new.css"

export default function MyApp({ Component, pageProps }: AppProps) {
    globalStyles()
    return <AuthProvider><Component {...pageProps} /></AuthProvider>
}