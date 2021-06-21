import { useCallback, createContext, ReactNode, useState, useEffect } from 'react'
import Web3Modal from 'web3modal'
import { useUserAddress } from 'eth-hooks'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { StaticJsonRpcProvider, Web3Provider } from '@ethersproject/providers'

import useUserProvider from 'hooks/blockchain/useUserProvider'
import useExchangePrice from 'hooks/blockchain/useExchangePrice'
import { INFURA_ID, NETWORKS } from 'constants/blockchain'

// 😬 Sorry for all the console logging
const DEBUG = true

const scaffoldEthProvider = new StaticJsonRpcProvider('https://rpc.scaffoldeth.io:48544')
const mainnetInfura = new StaticJsonRpcProvider('https://mainnet.infura.io/v3/' + INFURA_ID)

/// 📡 What chain are your contracts deployed to?
const targetNetwork = NETWORKS.localhost // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)
// 🏠 Your local provider is usually pointed at your local blockchain
const localProviderUrl = targetNetwork.rpcUrl
// as you deploy to other networks you can set REACT_APP_PROVIDER=https://dai.poa.network in packages/react-app/.env
const localProviderUrlFromEnv = process.env.REACT_APP_PROVIDER ? process.env.REACT_APP_PROVIDER : localProviderUrl
if (DEBUG) console.log('🏠 Connecting to provider:', localProviderUrlFromEnv)
const localProvider = new StaticJsonRpcProvider(localProviderUrlFromEnv)

export interface BlockchainContextProps {}

export const BlockchainContext = createContext<BlockchainContextProps>({})

const web3Modal = new Web3Modal({
  // network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: INFURA_ID
      }
    }
  }
})

const useSetupWalletConnection = () => {
  // const mainnetProvider = scaffoldEthProvider && scaffoldEthProvider._network ? scaffoldEthProvider : mainnetInfura
  const mainnetProvider = mainnetInfura
  const [injectedProvider, setInjectedProvider] = useState()

  const userProvider = useUserProvider(injectedProvider, localProvider)
  const address = useUserAddress(userProvider)

  /* 💵 This hook will get the price of ETH from 🦄 Uniswap: */
  const ethPrice = useExchangePrice(targetNetwork, mainnetProvider, 9777)

  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect()
    setInjectedProvider(new Web3Provider(provider))
  }, [setInjectedProvider])

  const logoutOfWeb3Modal = async () => {
    await web3Modal.clearCachedProvider()
    setTimeout(() => {
      window.location.reload()
    }, 1)
  }

  // initialize if web# is already connect.
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal()
    }
  }, [loadWeb3Modal])

  return {
    address,
    ethPrice,
    injectedProvider,
    setInjectedProvider,
    web3Modal,
    loadWeb3Modal,
    logoutOfWeb3Modal
  }
}

export default function BlockchainProvider({ children }: { children: ReactNode }) {
  const {
    address,
    ethPrice,
    injectedProvider,
    web3Modal,
    setInjectedProvider,
    loadWeb3Modal,
    logoutOfWeb3Modal
  } = useSetupWalletConnection()
  const context = {
    address,
    ethPrice,
    web3Modal,
    injectedProvider,
    setInjectedProvider,
    loadWeb3Modal,
    logoutOfWeb3Modal
  }
  return <BlockchainContext.Provider value={context}>{children}</BlockchainContext.Provider>
}
