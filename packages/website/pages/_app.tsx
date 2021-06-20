import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
// import 'antd/dist/antd.css'
import '../styles/globals.css'

const BlockchainProvider = dynamic(
  () => import('hooks/provider/blockchainProvider'),
  { ssr: false }
)

function MyApp({ Component, pageProps }: AppProps) {
  return (<div data-theme="cupcake" className="min-h-screen">
    <BlockchainProvider>
    <Component {...pageProps} />
    </BlockchainProvider></div>)
}
export default MyApp
