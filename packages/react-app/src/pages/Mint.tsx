import React, { useCallback } from "react";
import { Account, Content, Footer, Header } from "../components";
import { getTargetNetwork } from "../constants";
import { useCurrentAddress, useLocalProvider, useMainnetProvider, useWeb3Modal } from "../hooks";
import { useUserProviderAndSigner } from "eth-hooks";
import { useExchangeEthPrice } from "eth-hooks/dapps/dex";
import { Button, Input } from "antd";

const Mint = () => {
  const targetNetwork = getTargetNetwork();

  const localProvider = useLocalProvider();
  const { web3Modal, injectedProvider, loadWeb3Modal, logoutOfWeb3Modal } = useWeb3Modal();

  // Use your injected provider from 🦊 Metamask or if you don't have it then instantly generate a 🔥 burner wallet.
  const userProviderAndSigner = useUserProviderAndSigner(injectedProvider, localProvider);
  const userSigner = userProviderAndSigner?.signer;

  const currentAddress = useCurrentAddress(userSigner);
  const mainnetProvider = useMainnetProvider();

  /* 💵 This hook will get the price of ETH from 🦄 Uniswap: */
  const price = useExchangeEthPrice(targetNetwork, mainnetProvider);
  const blockExplorer = targetNetwork.blockExplorer;
  const mint = useCallback(() => {}, []);
  return (
    <div className="page page-mint">
      <Content>
        <Header>
          <a href="/">Home</a>
          <a href="/wallet">My Wallet</a>
          <Account
            address={currentAddress}
            localProvider={localProvider}
            userSigner={userSigner}
            mainnetProvider={mainnetProvider}
            price={price}
            web3Modal={web3Modal}
            loadWeb3Modal={loadWeb3Modal}
            logoutOfWeb3Modal={logoutOfWeb3Modal}
            blockExplorer={blockExplorer}
          ></Account>
        </Header>
        <div className="header-offset">
          <div className="flex items-center justify-center mx-auto h-96">
            <Input
              id="0xAddress" // name it something other than address for auto fill doxxing
              name="0xAddress" // name it something other than address for auto fill doxxing
              autoComplete="off"
              className="px-4 mr-4 addr-input w-96"
              autoFocus
              placeholder="Please input amount"
              bordered={false}
            />
            <div className="flex-none ml-5 transfer-wrapper">
              <Button type="default" size="large" onClick={mint}>
                Mint
              </Button>
            </div>
          </div>
        </div>
      </Content>
      <Footer />
    </div>
  );
};

export default Mint;
