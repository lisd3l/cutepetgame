import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./routes";
import { IconSprite } from "./components";

import "./App.css";
import "./style/less/index.less";
import {
  EthContext,
  useAnimalAmount,
  useContracts,
  useLocalProvider,
  useMainnetProvider,
  useTransferEvent,
  useWeb3Modal,
} from "./hooks";
import { useUserProviderAndSigner } from "eth-hooks";

export default function App() {
  const localProvider = useLocalProvider();
  const { web3Modal, injectedProvider, loadWeb3Modal, logoutOfWeb3Modal } = useWeb3Modal();

  // Use your injected provider from 🦊 Metamask or if you don't have it then instantly generate a 🔥 burner wallet.
  const userProviderAndSigner = useUserProviderAndSigner(injectedProvider, localProvider);
  const userSigner = userProviderAndSigner?.signer;

  // You can warn the user if you would like them to be on a specific network
  const localChainId = localProvider?._network?.chainId;
  // const selectedChainId = ((userSigner?.provider as any)?._network as ethers.providers.Network)?.chainId;

  const mainnetProvider = useMainnetProvider();
  const { readContracts, writeContracts, mainnetContracts } = useContracts(mainnetProvider, userSigner, localChainId);

  const transferEventCount = useTransferEvent(readContracts);
  const animalAmount = useAnimalAmount(transferEventCount, readContracts);
  return (
    <BrowserRouter forceRefresh={false}>
      <IconSprite />
      <EthContext.Provider
        value={{
          web3Modal,
          injectedProvider,
          loadWeb3Modal,
          logoutOfWeb3Modal,
          userSigner,
          mainnetProvider,
          readContracts,
          writeContracts,
          mainnetContracts,
          transferEventCount,
          animalAmount,
        }}
      >
        <Routes />
      </EthContext.Provider>
    </BrowserRouter>
  );
}
