import type { AppProps } from 'next/app'
// import 'antd/dist/antd.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <div data-theme="cupcake" className="min-h-screen"><Component {...pageProps} /></div>
}
export default MyApp
