import { useContext } from 'react'
import { useUserAddress } from 'eth-hooks'

// import Address from './Address'
// import Balance from './Balance'
// import Wallet from './Wallet'
import Button from 'components/base/button'
import { BlockchainContext } from 'hooks/provider/blockchainProvider'

export default function Account() {
  const {
    address,
    price,
    web3Modal,
    injectedProvider,
    setInjectedProvider,
    loadWeb3Modal,
    logoutOfWeb3Modal
  } = useContext(BlockchainContext)
  const modalButtons = []
  if (web3Modal) {
    if (web3Modal.cachedProvider) {
      modalButtons.push(
        <Button key='logoutbutton' onClick={logoutOfWeb3Modal}>
          logout
        </Button>
      )
    } else {
      modalButtons.push(
        <Button
          key='loginbutton'
          /* type={minimized ? "default" : "primary"}     too many people just defaulting to MM and having a bad time */
          onClick={loadWeb3Modal}
        >
          connect
        </Button>
      )
    }
  }

  const display = (
    <span>
      {address ? (
        <>
          {/* <Address address={address} ensProvider={mainnetProvider} blockExplorer={blockExplorer} /> */}
          connected {address}
        </>
      ) : (
        'Connecting...'
      )}
      {/* <Balance address={address} provider={localProvider} price={price} />
      <Wallet address={address} provider={userProvider} ensProvider={mainnetProvider} price={price} /> */}
      <div>Balance: {price}</div>
    </span>
  )

  return (
    <div>
      {display}
      {modalButtons}
    </div>
  )
}
