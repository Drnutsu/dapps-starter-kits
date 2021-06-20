import Head from 'next/head'
import dynamic from 'next/dynamic'
import Page from 'components/layout/page'
import Button from 'components/base/button'

const Account = dynamic(() => import('components/dapps/account'), { ssr: false })

export default function Home() {
  return (
    <Page>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Account />
      <Button>ClickMe!!</Button>
    </Page>
  )
}
