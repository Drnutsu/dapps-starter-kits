import Head from 'next/head'
import Page from 'components/layout/page'
import Button from 'components/base/button'

export default function Home() {
  return (
    <Page>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Button>ClickMe!!</Button>
    </Page>
  )
}
