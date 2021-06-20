import Head from 'next/head'
import Container from 'components/layout/container'
import Button from 'components/base/button'

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Button>ClickMe!!</Button>
    </Container>
  )
}
