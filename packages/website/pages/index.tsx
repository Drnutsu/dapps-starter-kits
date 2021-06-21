import Head from 'next/head'
import dynamic from 'next/dynamic'
import Page from 'components/layout/page'

// dynamic for prevent serverside render for wallet connect component.
const Account = dynamic(() => import('components/dapps/account'), { ssr: false })

export default function Home() {
  return (
    <Page>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Account />
    </Page>
  )
}
