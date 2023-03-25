import React from "react";

import { ethers } from "ethers";
import Web3Modal from "web3modal";

// import Address from "./Address";
// import Balance from "./Balance";
// import Wallet from "./Wallet";

/*
  ~ What it does? ~

  Displays an Address, Balance, and Wallet as one Account component,
  also allows users to log in to existing accounts and log out

  ~ How can I use? ~

  <Account
    address={address}
    localProvider={localProvider}
    userProvider={userProvider}
    mainnetProvider={mainnetProvider}
    price={price}
    web3Modal={web3Modal}
    loadWeb3Modal={loadWeb3Modal}
    logoutOfWeb3Modal={logoutOfWeb3Modal}
    blockExplorer={blockExplorer}
  />

  ~ Features ~

  - Provide address={address} and get balance corresponding to the given address
  - Provide localProvider={localProvider} to access balance on local network
  - Provide userProvider={userProvider} to display a wallet
  - Provide mainnetProvider={mainnetProvider} and your address will be replaced by ENS name
              (ex. "0xa870" => "user.eth")
  - Provide price={price} of ether and get your balance converted to dollars
  - Provide web3Modal={web3Modal}, loadWeb3Modal={loadWeb3Modal}, logoutOfWeb3Modal={logoutOfWeb3Modal}
              to be able to log in/log out to/from existing accounts
  - Provide blockExplorer={blockExplorer}, click on address and get the link
              (ex. by default "https://etherscan.io/" or for xdai "https://blockscout.com/poa/xdai/")
*/

interface AccountProps {
  address: string;
  userSigner: ethers.Signer | undefined;
  localProvider: ethers.providers.StaticJsonRpcProvider;
  mainnetProvider: ethers.providers.StaticJsonRpcProvider;
  price: number;
  minimized?: boolean;
  web3Modal?: Web3Modal;
  loadWeb3Modal: () => Promise<void>;
  logoutOfWeb3Modal: () => Promise<void>;
  blockExplorer: string;
}

const Account: React.FC<AccountProps> = ({
  address,
  userSigner,
  localProvider,
  mainnetProvider,
  price,
  minimized,
  web3Modal,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  blockExplorer,
}) => {
  // const display = minimized ? (
  //   ""
  // ) : (
  //   <span>
  //     {address ? (
  //       <Address address={address} ensProvider={mainnetProvider} blockExplorer={blockExplorer} />
  //     ) : (
  //       "Connecting..."
  //     )}
  //     <Balance address={address} provider={localProvider} price={price} />
  //     <Wallet
  //       address={address}
  //       provider={localProvider}
  //       signer={userSigner}
  //       ensProvider={mainnetProvider}
  //       price={price}
  //     />
  //   </span>
  // );

  return web3Modal?.cachedProvider ? (
    <button onClick={logoutOfWeb3Modal}>LOGOUT</button>
  ) : (
    <button onClick={loadWeb3Modal}>CONNECT</button>
  );
};

export default Account;
